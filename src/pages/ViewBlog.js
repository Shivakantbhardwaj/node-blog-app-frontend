import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ViewBlog.css";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [currentUser] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleReplyChange = (commentId, text) => {
    setReplyText((prev) =>
      text === undefined ? { ...prev, [commentId]: undefined } : { ...prev, [commentId]: text }
    );
  };

  const handleAddReply = async (commentId) => {
    if (!replyText[commentId]) {
      alert("Reply cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: replyText[commentId],
            userId: currentUser,
          }),
        }
      );

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog(updatedBlog);
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      } else {
        console.error("Failed to add reply");
      }
    } catch (err) {
      console.error("Error adding reply", err);
    }
  };

  return (
    <div className="view-blog-container">
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          {blog.image && (
            <img src={`http://localhost:5000/uploads/${blog.image}`} alt={blog.title} />
          )}
          <button className="back-btn" onClick={() => navigate("/blogs")}>
            Back to Blogs
          </button>

          {blog.comments && blog.comments.length > 0 && (
            <div className="comments-list">
              <h4>Comments:</h4>
              {blog.comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <p>
                    <strong>{comment.user?.username || "Anonymous"}:</strong> {comment.text}
                  </p>
                  {comment.user?._id !== currentUser && (
                    <button
                      onClick={() =>
                        setReplyText((prev) => ({
                          ...prev,
                          [comment._id]: prev[comment._id] === undefined ? "" : undefined,
                        }))
                      }
                    >
                      Reply
                    </button>
                  )}

                  {replyText[comment._id] !== undefined && (
                    <div>
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText[comment._id] || ""}
                        onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                      />
                      <button onClick={() => handleAddReply(comment._id)}>Submit Reply</button>
                    </div>
                  )}

                  {comment.replies && comment.replies.length > 0 && (
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewBlog;