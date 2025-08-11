import { commentApi } from "./api";

export const getCommentsByPost = async (postId) => {
  try {
    const response = await commentApi.get(`/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await commentApi.post("/", commentData);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const response = await commentApi.put(`/${commentId}`, { content });
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await commentApi.delete(`/${commentId}`);
    return commentId;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const getMyComments = async () => {
  try {
    const response = await commentApi.get("/user/my-comments");
    return response.data;
  } catch (error) {
    console.error("Error fetching my comments:", error);
    throw error;
  }
};
