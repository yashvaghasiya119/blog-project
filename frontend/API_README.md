# API Structure Documentation

This document describes the centralized API structure implemented in the blog application.

## Overview

The application now uses a centralized API configuration with separate service files for different API operations. This provides better organization, reusability, and easier maintenance.

## File Structure

```
frontend/src/api/
├── api.js              # Main axios instance with interceptors
├── userApi.js          # User-related API operations
├── blogApi.js          # Blog-related API operations
├── commentApi.js       # Comment-related API operations
└── index.js            # Exports all API services
```

## Main API Configuration (`api.js`)

The main API configuration file sets up:
- Base URL: `http://localhost:5000` (backend port)
- Timeout: 10 seconds
- Default headers
- Request interceptor for authentication tokens
- Response interceptor for error handling

### Features:
- **Automatic Token Management**: Automatically adds JWT tokens to requests
- **Error Handling**: Handles 401 unauthorized responses by redirecting to login
- **Centralized Configuration**: Easy to change base URL, timeout, etc.

## API Services

### User API (`userApi.js`)
- `signup(userData)` - User registration
- `login(credentials)` - User authentication
- `logout()` - User logout
- `forgotPassword(email)` - Password reset request
- `resetPassword(resetData)` - Password reset
- `getCurrentUser()` - Get current user info

### Blog API (`blogApi.js`)
- `getBlogs()` - Fetch all blogs
- `getBlogById(blogId)` - Fetch single blog
- `getMyBlogs()` - Fetch user's blogs
- `createBlogWithImage(blogData, imageFile)` - Create blog with optional image
- `updateBlogWithImage(blogId, blogData, imageFile)` - Update blog with optional image
- `deleteBlog(blogId)` - Delete blog
- `searchBlogsByHashtags(hashtags)` - Search blogs by hashtags
- `getTrendingBlogs()` - Fetch trending blogs

### Comment API (`commentApi.js`)
- `getCommentsByPost(postId)` - Fetch comments for a post
- `createComment(commentData)` - Create new comment
- `updateComment(commentId, content)` - Update comment
- `deleteComment(commentId)` - Delete comment
- `getMyComments()` - Fetch user's comments

## Image Handling

### Blog Creation/Update with Images

The blog API now supports both text-only and image upload scenarios:

```javascript
// Create blog without image
const result = await dispatch(createBlog({ 
  blogData: { title: 'My Blog', body: 'Content' }, 
  imageFile: null 
}));

// Create blog with image
const result = await dispatch(createBlog({ 
  blogData: { title: 'My Blog', body: 'Content' }, 
  imageFile: selectedFile 
}));
```

### Image Upload Features:
- **File Type Support**: JPG, PNG, GIF
- **Automatic FormData**: Automatically switches between JSON and FormData based on image presence
- **Preview**: Shows image preview before upload
- **Remove Option**: Users can remove selected images
- **Current Image Display**: EditBlog shows existing images

## Usage Examples

### In Redux Slices

```javascript
import { createBlog } from '../../api';

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
```

### In Components

```javascript
import { createBlog } from '../store/slices/blogSlice';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const blogData = {
    title: formData.title,
    body: formData.body,
    hashtags: formData.hashtags.split(',').map(tag => tag.trim())
  };

  const result = await dispatch(createBlog({ blogData, imageFile }));
  if (createBlog.fulfilled.match(result)) {
    navigate('/my-blogs');
  }
};
```

## Benefits

1. **Centralized Configuration**: Easy to change API endpoints, timeouts, etc.
2. **Automatic Authentication**: No need to manually add tokens to requests
3. **Error Handling**: Consistent error handling across the application
4. **Image Support**: Built-in support for file uploads with FormData
5. **Reusability**: API functions can be used in multiple components
6. **Maintainability**: Easy to update API logic in one place
7. **Type Safety**: Better organization makes it easier to add TypeScript later

## Backend Requirements

The backend should:
- Run on port 5000
- Accept both JSON and FormData requests
- Handle image uploads (e.g., using multer)
- Support the API endpoints defined in the services
- Return consistent response formats

## Migration Notes

- All existing axios calls have been replaced with API service calls
- Blog creation/update now supports both text and image data
- Components need to pass `imageFile` parameter when creating/updating blogs
- Error handling remains the same but is now centralized
