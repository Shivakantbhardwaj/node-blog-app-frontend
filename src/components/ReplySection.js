import React, { useState } from "react";

const ReplySection = ({ blogId, commentId }) => {
    const [replyText, setReplyText] = useState("");

    const addReply = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${blogId}/comment/${commentId}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: replyText }),
        });

        if (response.ok) {
            setReplyText("");
            window.location.reload();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
            />
            <button onClick={addReply}>Reply</button>
        </div>
    );
};

export default ReplySection;
