// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSingleBlog } from '../store/slices/blogSlice';
// import { fetchCommentsByPost, createComment } from '../store/slices/commentSlice';
// import { toast } from 'react-toastify';
// import './SingleBlog.css';

// const SingleBlog = () => {
//   const { id } = useParams();
//   const [commentContent, setCommentContent] = useState('');
  
//   const dispatch = useDispatch();
//   const { singleBlog, loading } = useSelector((state) => state.blog);
//   const { comments, loading: commentsLoading } = useSelector((state) => state.comment);
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchSingleBlog(id));
//     dispatch(fetchCommentsByPost(id));
//   }, [dispatch, id]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!commentContent.trim()) {
//       toast.error('Please enter a comment');
//       return;
//     }

//     await dispatch(createComment({
//       content: commentContent,
//       postId: id
//     }));
    
//     setCommentContent('');
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading blog...</p>
//       </div>
//     );
//   }

//   if (!singleBlog) {
//     return (
//       <div className="error-container">
//         <h2>Blog not found</h2>
//         <p>The blog you're looking for doesn't exist.</p>
//         <Link to="/blogs" className="btn btn-primary">Back to Blogs</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="single-blog">
//       <div className="container">
//         {/* Blog Header */}
//         <div className="blog-header" data-aos="fade-up">
//           <div className="blog-meta">
//             <span className="blog-author">
//               By {singleBlog.author?.firstname} {singleBlog.author?.lastname}
//             </span>
//             <span className="blog-date">
//               {formatDate(singleBlog.createdAt)}
//             </span>
//           </div>
//           <h1 className="blog-title">{singleBlog.title}</h1>
//           {singleBlog.hashtags && singleBlog.hashtags.length > 0 && (
//             <div className="blog-hashtags">
//               {singleBlog.hashtags.map((tag, index) => (
//                 <span key={index} className="hashtag">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Blog Image */}
//         {singleBlog.image && (
//           <div className="blog-image-container" data-aos="fade-up">
//             <img src={singleBlog.image} alt={singleBlog.title} className="blog-image" />
//           </div>
//         )}

//         {/* Blog Content */}
//         <div className="blog-content" data-aos="fade-up">
//           <div className="blog-body">
//             {singleBlog.body.split('\n').map((paragraph, index) => (
//               <p key={index}>{paragraph}</p>
//             ))}
//           </div>
//         </div>

//         {/* Comments Section */}
//         <div className="comments-section" data-aos="fade-up">
//           <h2>Comments ({comments.length})</h2>
          
//           {/* Add Comment Form */}
//           {isAuthenticated ? (
//             <form onSubmit={handleCommentSubmit} className="comment-form">
//               <div className="form-group">
//                 <textarea
//                   value={commentContent}
//                   onChange={(e) => setCommentContent(e.target.value)}
//                   placeholder="Write a comment..."
//                   className="form-control"
//                   rows="4"
//                   required
//                 ></textarea>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Post Comment
//               </button>
//             </form>
//           ) : (
//             <div className="login-prompt">
//               <p>Please <Link to="/login">login</Link> to leave a comment.</p>
//             </div>
//           )}

//           {/* Comments List */}
//           <div className="comments-list">
//             {commentsLoading ? (
//               <div className="loading-container">
//                 <div className="spinner"></div>
//                 <p>Loading comments...</p>
//               </div>
//             ) : comments.length === 0 ? (
//               <div className="no-comments">
//                 <p>No comments yet. Be the first to comment!</p>
//               </div>
//             ) : (
//               comments.map((comment) => (
//                 <div key={comment._id} className="comment-card">
//                   <div className="comment-header">
//                     <span className="comment-author">
//                       {comment.userId?.firstname} {comment.userId?.lastname}
//                     </span>
//                     <span className="comment-date">
//                       {formatDate(comment.createdAt)}
//                     </span>
//                   </div>
//                   <div className="comment-content">
//                     {comment.content}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Back to Blogs */}
//         <div className="back-to-blogs" data-aos="fade-up">
//           <Link to="/blogs" className="btn btn-secondary">
//             ← Back to All Blogs
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleBlog;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBlog } from '../store/slices/blogSlice';
import { fetchCommentsByPost, createComment } from '../store/slices/commentSlice';
import { toast } from 'react-toastify';
import './SingleBlog.css';

const SingleBlog = () => {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [zoomed, setZoomed] = useState(false);

  
  const dispatch = useDispatch();
  const { singleBlog, loading } = useSelector((state) => state.blog);
  const { comments, loading: commentsLoading } = useSelector((state) => state.comment);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleImageClick = () => {
    setZoomed(true);
  };
  
  const handleCloseZoom = () => {
    setZoomed(false);
  };
  

  useEffect(() => {
    dispatch(fetchSingleBlog(id));
    dispatch(fetchCommentsByPost(id));
  }, [dispatch, id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    await dispatch(createComment({
      content: commentContent,
      postId: id
    }));
    
    setCommentContent('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!singleBlog) {
    return (
      <div className="error-container">
        <h2>Blog not found</h2>
        <p>The blog you're looking for doesn't exist.</p>
        <Link to="/blogs" className="btn btn-primary">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="single-blog">
      <div className="container">
        {/* Blog Header */}
        <div className="blog-header" data-aos="fade-up">
          <div className="blog-meta">
            <span className="blog-author">
              By {singleBlog.author?.firstname} {singleBlog.author?.lastname}
            </span>
            <span className="blog-date">
              {formatDate(singleBlog.createdAt)}
            </span>
          </div>
          <h1 className="blog-title">{singleBlog.title}</h1>
          {singleBlog.hashtags && singleBlog.hashtags.length > 0 && (
            <div className="blog-hashtags">
              {singleBlog.hashtags.map((tag, index) => (
                <span key={index} className="hashtag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Blog Image */}
        {singleBlog.image && (
  <>
    <div className="blog-image-container" data-aos="fade-up">
      <img
        src={singleBlog.image}
        alt={singleBlog.title}
        className="blog-image"
        onClick={handleImageClick}
        style={{ cursor: 'zoom-in' }}
      />
    </div>

    {zoomed && (
      <div className="image-zoom-overlay" onClick={handleCloseZoom}>
        <img
          src={singleBlog.image}
          alt={singleBlog.title}
          className="zoomed-image"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking on image
        />
      </div>
    )}
  </>
)}


        {/* Blog Content */}
        <div className="blog-content" data-aos="fade-up">
          <div className="blog-body">
            {singleBlog.body.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section" data-aos="fade-up">
          <h2>Comments ({comments.length})</h2>
          
          {/* Add Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="form-group">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write a comment..."
                  className="form-control"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Please <Link to="/login">login</Link> to leave a comment.</p>
            </div>
          )}

          {/* Comments List */}
          <div className="comments-list">
            {commentsLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="no-comments">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment-card">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.userId?.firstname} {comment.userId?.lastname}
                    </span>
                    <span className="comment-date">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="comment-content">
                    {comment.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Back to Blogs */}
        <div className="back-to-blogs" data-aos="fade-up">
          <Link to="/blogs" className="btn btn-secondary">
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
