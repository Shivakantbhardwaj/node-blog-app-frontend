import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import SingleBlog from "./pages/SingleBlog";
import ViewBlog from "./pages/ViewBlog";
import "./App.css"
import "../src/styles/Homepage.css";
import "../src/styles/Login.css";
import "../src/styles/Signup.css";
import "../src/styles/AddBlog.css";
import "../src/styles/EditBlog.css";
import "../src/styles/Blogs.css";
import "../src/styles/Header.css";
import "../src/styles/ViewBlog.css";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/add-blog" element={<AddBlog />} />
                <Route path="/edit-blog/:id" element={<EditBlog />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
                <Route path="/view-blog/:id" element={<ViewBlog />} />
            </Routes>
        </Router>
    );
}

export default App;
