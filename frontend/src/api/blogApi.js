import { blogApi } from "./api";

// Regular blog operations
export const getBlogs = async () => {
  try {
    const response = await blogApi.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogById = async (blogId) => {
  try {
    const response = await blogApi.get(`/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

export const getMyBlogs = async () => {
  try {
    const response = await blogApi.get("/my-blogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching my blogs:", error);
    throw error;
  }
};

export const searchBlogsByHashtags = async (hashtags) => {
  try {
    const response = await blogApi.get(`/search/hashtags?hashtags=${hashtags}`);
    return response.data;
  } catch (error) {
    console.error("Error searching blogs:", error);
    throw error;
  }
};

export const getTrendingBlogs = async () => {
  try {
    const response = await blogApi.get("/trending");
    return response.data;
  } catch (error) {
    console.error("Error fetching trending blogs:", error);
    throw error;
  }
};

export const deleteBlog = async (blogId) => {
  try {
    await blogApi.delete(`/${blogId}`);
    return blogId;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const updateBlog = async (blogId, blogData) => {
  try {
    const response = await blogApi.put(`/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Blog operations with image handling
export const createBlogWithImage = async (blogData, imageFile = null) => {
  try {
    let data;
    let headers = {};
    
    if (imageFile) {
      // If image is provided, use FormData
      data = new FormData();
      
      // Add text fields
      Object.keys(blogData).forEach(key => {
        if (blogData[key] !== null && blogData[key] !== undefined) {
          data.append(key, blogData[key]);
        }
      });
      
      // Add image file
      data.append('image', imageFile);
      
      // Remove Content-Type header to let browser set it with boundary for FormData
      headers = {};
    } else {
      // If no image, send as JSON
      data = blogData;
      headers = { "Content-Type": "application/json" };
    }
    
    const response = await blogApi.post("/", data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const updateBlogWithImage = async (blogId, blogData, imageFile = null) => {
  try {
    let data;
    let headers = {};
    
    if (imageFile) {
      // If image is provided, use FormData
      data = new FormData();
      
      // Add text fields
      Object.keys(blogData).forEach(key => {
        if (blogData[key] !== null && blogData[key] !== undefined) {
          data.append(key, blogData[key]);
        }
      });
      
      // Add image file
      data.append('image', imageFile);
      
      // Remove Content-Type header to let browser set it with boundary for FormData
      headers = {};
    } else {
      // If no image, send as JSON
      data = blogData;
      headers = { "Content-Type": "application/json" };
    }
    
    const response = await blogApi.put(`/${blogId}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};
