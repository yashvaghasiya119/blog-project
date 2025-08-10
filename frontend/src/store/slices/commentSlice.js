import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async thunks
export const fetchCommentsByPost = createAsyncThunk(
  'comment/fetchCommentsByPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/comment/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/comment', commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create comment');
    }
  }
);

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/comment/${commentId}`, { content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/comment/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

export const fetchMyComments = createAsyncThunk(
  'comment/fetchMyComments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/comment/user/my-comments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your comments');
    }
  }
);

const initialState = {
  comments: [],
  myComments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments By Post
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Create Comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload.comment);
        toast.success('Comment added successfully!');
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update Comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload.comment;
        
        // Update in comments array
        const commentIndex = state.comments.findIndex(comment => comment._id === updatedComment._id);
        if (commentIndex !== -1) {
          state.comments[commentIndex] = updatedComment;
        }
        
        // Update in myComments array
        const myCommentIndex = state.myComments.findIndex(comment => comment._id === updatedComment._id);
        if (myCommentIndex !== -1) {
          state.myComments[myCommentIndex] = updatedComment;
        }
        
        toast.success('Comment updated successfully!');
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Delete Comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const deletedCommentId = action.payload;
        
        // Remove from comments array
        state.comments = state.comments.filter(comment => comment._id !== deletedCommentId);
        
        // Remove from myComments array
        state.myComments = state.myComments.filter(comment => comment._id !== deletedCommentId);
        
        toast.success('Comment deleted successfully!');
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Fetch My Comments
      .addCase(fetchMyComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyComments.fulfilled, (state, action) => {
        state.loading = false;
        state.myComments = action.payload;
      })
      .addCase(fetchMyComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearError, clearComments } = commentSlice.actions;
export default commentSlice.reducer;
