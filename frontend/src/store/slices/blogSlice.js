import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBlogs, getBlogById, getMyBlogs, createBlogWithImage, updateBlogWithImage, deleteBlog as deleteBlogApi, searchBlogsByHashtags, getTrendingBlogs } from '../../api';
import { toast } from 'react-toastify';

// Async thunks
export const fetchAllBlogs = createAsyncThunk(
  'blog/fetchAllBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBlogs();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

export const fetchSingleBlog = createAsyncThunk(
  'blog/fetchSingleBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await getBlogById(blogId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog');
    }
  }
);

export const fetchMyBlogs = createAsyncThunk(
  'blog/fetchMyBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyBlogs();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your blogs');
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async ({ blogData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await createBlogWithImage(blogData, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create blog');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ blogId, blogData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await updateBlogWithImage(blogId, blogData, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update blog');
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      await deleteBlogApi(blogId);
      return blogId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
    }
  }
);

export const searchByHashtags = createAsyncThunk(
  'blog/searchByHashtags',
  async (hashtags, { rejectWithValue }) => {
    try {
      const response = await searchBlogsByHashtags(hashtags);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search blogs');
    }
  }
);

export const fetchTrendingBlogs = createAsyncThunk(
  'blog/fetchTrendingBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTrendingBlogs();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending blogs');
    }
  }
);

const initialState = {
  blogs: [],
  singleBlog: null,
  myBlogs: [],
  trendingBlogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSingleBlog: (state) => {
      state.singleBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Fetch Single Blog
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Fetch My Blogs
      .addCase(fetchMyBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.myBlogs = action.payload;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload.blog);
        state.myBlogs.unshift(action.payload.blog);
        toast.success('Blog created successfully!');
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBlog = action.payload.blog;
        
        // Update in blogs array
        const blogIndex = state.blogs.findIndex(blog => blog._id === updatedBlog._id);
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = updatedBlog;
        }
        
        // Update in myBlogs array
        const myBlogIndex = state.myBlogs.findIndex(blog => blog._id === updatedBlog._id);
        if (myBlogIndex !== -1) {
          state.myBlogs[myBlogIndex] = updatedBlog;
        }
        
        // Update single blog if it's the same
        if (state.singleBlog && state.singleBlog._id === updatedBlog._id) {
          state.singleBlog = updatedBlog;
        }
        
        toast.success('Blog updated successfully!');
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        const deletedBlogId = action.payload;
        
        // Remove from blogs array
        state.blogs = state.blogs.filter(blog => blog._id !== deletedBlogId);
        
        // Remove from myBlogs array
        state.myBlogs = state.myBlogs.filter(blog => blog._id !== deletedBlogId);
        
        // Clear single blog if it's the same
        if (state.singleBlog && state.singleBlog._id === deletedBlogId) {
          state.singleBlog = null;
        }
        
        toast.success('Blog deleted successfully!');
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Search By Hashtags
      .addCase(searchByHashtags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchByHashtags.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(searchByHashtags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Fetch Trending Blogs
      .addCase(fetchTrendingBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingBlogs = action.payload;
      })
      .addCase(fetchTrendingBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearError, clearSingleBlog } = blogSlice.actions;
export default blogSlice.reducer;
