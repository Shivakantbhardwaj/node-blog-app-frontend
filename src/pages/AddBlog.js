import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddBlog.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/blogs"); // Navigate back to blogs page after successful submission
      } else {
        setError(data.message || "Failed to create blog");
      }
    } catch (err) {
      setError("An error occurred while creating the blog.");
    }
  };

  return (
    <div className="create-blog-container">
      <h2 className="create-blog-heading">Create Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Blog Description"
          required
        />
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Create Blog</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreateBlog;
