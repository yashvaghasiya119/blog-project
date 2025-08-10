# BlogApp - BCA Project

A full-stack blog website built with React.js, Node.js, Express, MongoDB, and Redux Toolkit for authentication.

## 🚀 Features

### Backend Features
- **User Authentication**: Signup, login, logout with JWT tokens
- **Password Management**: Forgot password with OTP via email, reset password
- **Blog Management**: Create, read, update, delete blogs with hashtags
- **Comment System**: Add, edit, delete comments on blogs
- **Search Functionality**: Search blogs by hashtags
- **Trending Blogs**: Get trending blogs based on hashtag count
- **Image Support**: Cloudinary integration for blog images
- **Email Integration**: Nodemailer for password reset OTP

### Frontend Features
- **Modern UI**: Beautiful, responsive design with animations
- **Authentication**: Complete user authentication flow
- **Blog Management**: Create, edit, delete, and view blogs
- **Comment System**: Add comments to blog posts
- **Search & Filter**: Search blogs by hashtags
- **Responsive Design**: Mobile-friendly interface
- **Animations**: AOS (Animate On Scroll) library integration
- **Toast Notifications**: React-toastify for user feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **nodemailer** - Email functionality
- **cloudinary** - Image hosting
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **cookie-parser** - Cookie parsing

### Frontend
- **React.js** - Frontend framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **AOS** - Animate On Scroll library
- **React-toastify** - Toast notifications
- **CSS3** - Styling with modern CSS features

## 📁 Project Structure

```
blogapp/
├── backend/
│   ├── config.env          # Environment variables
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── blogController.js
│   │   └── commentController.js
│   └── routes/
│       ├── userRoutes.js
│       ├── blogRoutes.js
│       └── commentRoutes.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── ForgotPassword.js
│   │   │   ├── ResetPassword.js
│   │   │   ├── AllBlogs.js
│   │   │   ├── SingleBlog.js
│   │   │   ├── MyBlogs.js
│   │   │   ├── CreateBlog.js
│   │   │   └── EditBlog.js
│   │   ├── store/
│   │   │   ├── index.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── blogSlice.js
│   │   │       └── commentSlice.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogapp
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blogapp
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the application**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both backend (port 5000) and frontend (port 3000) servers.

## 📝 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `POST /api/user/forgot-password` - Send OTP for password reset
- `POST /api/user/reset-password` - Reset password with OTP
- `GET /api/user/me` - Get current user

### Blogs
- `GET /api/blog` - Get all blogs
- `GET /api/blog/:id` - Get single blog
- `POST /api/blog` - Create new blog (authenticated)
- `PUT /api/blog/:id` - Update blog (authenticated)
- `DELETE /api/blog/:id` - Delete blog (authenticated)
- `GET /api/blog/my-blogs` - Get user's blogs (authenticated)
- `GET /api/blog/search/hashtags` - Search blogs by hashtags
- `GET /api/blog/trending` - Get trending blogs

### Comments
- `GET /api/comment/:postId` - Get comments for a blog
- `POST /api/comment` - Create comment (authenticated)
- `PUT /api/comment/:id` - Update comment (authenticated)
- `DELETE /api/comment/:id` - Delete comment (authenticated)
- `GET /api/comment/user/my-comments` - Get user's comments (authenticated)

## 🔐 Authentication

The application uses JWT tokens stored in HTTP-only cookies for secure authentication. Users must be authenticated to:
- Create, edit, and delete blogs
- Add, edit, and delete comments
- Access private routes

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: AOS library for scroll-triggered animations
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Spinner animations during API calls

## 📱 Pages

### Public Pages
- **Home**: Landing page with hero section, features, and trending blogs
- **About**: Company information, team, and statistics
- **Contact**: Contact form and FAQ section
- **Login**: User authentication
- **Signup**: User registration
- **Forgot Password**: Password reset request
- **Reset Password**: Password reset with OTP
- **All Blogs**: Browse all blog posts with search functionality
- **Single Blog**: View individual blog with comments

### Private Pages (Authenticated Users)
- **My Blogs**: Manage user's own blog posts
- **Create Blog**: Create new blog post
- **Edit Blog**: Edit existing blog post

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Configure MongoDB connection (local or MongoDB Atlas)

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for BCA academic purposes.

## 👨‍💻 Author

BCA Student Project

---

**Note**: This is a complete full-stack blog application with all the features specified in the requirements. The application includes user authentication, blog management, commenting system, search functionality, and a modern responsive UI with animations.
