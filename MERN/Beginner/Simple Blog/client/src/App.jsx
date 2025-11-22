import React from "react";
import Header from "./components/ui/Header";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/BlogDetails";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  );
};

export default App;
