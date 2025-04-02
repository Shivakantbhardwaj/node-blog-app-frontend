import React, { useState, useEffect } from "react";
import ReplySection from "./ReplySection"; // Import the ReplySection component


const CommentSection = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${blogId}`)
            .then(res => res.json())
            .then(data => setComments(data.comments));
    }, [blogId]);

    const addComment = async () => {
        const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: commentText }),
        });

        if (response.ok) {
            setCommentText("");
            window.location.reload(); // Refresh comments
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            {comments.map((comment) => (
                <div key={comment._id}>
                    <p>{comment.text}</p>
                    <ReplySection blogId={blogId} commentId={comment._id} />
                </div>
            ))}
            <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
            />
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default CommentSection;
