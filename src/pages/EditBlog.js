import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  // Fetch the blog to edit
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

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle update blog
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    if (file) {
      formData.append("image", file); // Append image file
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/blogs"); // Redirect to blogs page after updating
      } else {
        setError(data.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("An error occurred while updating the blog.");
    }
  };

  return (
    <div>
      <div className="edit-blog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
        />
        <textarea
          name="description"
          value={blog.description}
          onChange={handleChange}
          placeholder="Blog Description"
          required
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Update Blog</button>
      </form>
      {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default EditBlog;
