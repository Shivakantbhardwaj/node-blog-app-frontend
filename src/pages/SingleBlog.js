import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/blogs/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data));
    }, [id]);

    if (!blog) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>{blog.title}</h2>
            {blog.image && <img src={`${process.env.REACT_APP_API_URL}/uploads/${blog.image}`} alt={blog.title} width="300" />}
            <p>{blog.description}</p>
            <CommentSection blogId={id} />
        </div>
    );
};

export default SingleBlog;
