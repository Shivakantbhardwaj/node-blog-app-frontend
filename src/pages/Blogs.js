import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [replyText, setReplyText] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("REACT_APP_BACKEND_URL");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      }
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  const handleEdit = (id) => navigate(`/edit-blog/${id}`);
  const handleView = (id) => navigate(`/view-blog/${id}`);

  const handleCommentChange = (blogId, text) => {
    setCommentText((prev) => ({ ...prev, [blogId]: text }));
  };

  const handleAddComment = async (blogId) => {
    if (!commentText[blogId]) return alert("Comment cannot be empty!");
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText[blogId], userId: "6609c0d31a2e9b1f3b3b1234" }),
      });
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prev) => prev.map((blog) => (blog._id === blogId ? updatedBlog : blog)));
        setCommentText((prev) => ({ ...prev, [blogId]: "" }));
      }
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  const handleReplyChange = (commentId, text) => {
    setReplyText((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleAddReply = async (blogId, commentId) => {
    if (!replyText[commentId]) return alert("Reply cannot be empty!");
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${blogId}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: replyText[commentId], userId: "6609c0d31a2e9b1f3b3b1234" }),
        }
      );
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prev) => prev.map((blog) => (blog._id === blogId ? updatedBlog : blog)));
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      }
    } catch (err) {
      console.error("Error adding reply", err);
    }
  };

  return (
    <div>
      <Header />
      <div className="blogs-container">
        <h2>Blogs</h2>
        <button className="create-blog-btn" onClick={() => navigate("/add-blog")}>Create Blog</button>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              {blog.image && <img src={`http://localhost:5000/uploads/${blog.image}`} alt={blog.title} />}
              <div className="button-group">
                <button className="view-btn" onClick={() => handleView(blog._id)}>View</button>
                <button className="edit-btn" onClick={() => handleEdit(blog._id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
              <div className="comment-section">
                <input type="text" placeholder="Add a comment..." value={commentText[blog._id] || ""} onChange={(e) => handleCommentChange(blog._id, e.target.value)} />
                <button onClick={() => handleAddComment(blog._id)}>Comment</button>
              </div>
              {blog.comments?.length > 0 && (
                <div className="comments-list">
                  <h4>Comments:</h4>
                  {blog.comments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                      <p><strong>{comment.user?.username || "Anonymous"}:</strong> {comment.text}</p>
                      <input type="text" placeholder="Reply..." value={replyText[comment._id] || ""} onChange={(e) => handleReplyChange(comment._id, e.target.value)} />
                      <button onClick={() => handleAddReply(blog._id, comment._id)}>Reply</button>
                      {comment.replies?.length > 0 && (
                        <div className="replies-list">
                          {comment.replies.map((reply) => (
                            <p key={reply._id} className="reply-item">
                              <strong>{reply.user?.username || "Anonymous"}:</strong> {reply.text}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
