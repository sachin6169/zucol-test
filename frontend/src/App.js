import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogForm from "./component/BlogForm";
import BlogList from "./component/BlogList";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "./common/common";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);

  
  useEffect(() => {
    fetch(`${BASE_URL}/api/blog/`)
      .then((response) => response.json())
      .then((json) => {
        if (json.body) {
          setBlogs(json.body)
        } else {
          return toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_LEFT,
          });
          setBlogs([])
        }
      });
  }, [isUpdate]);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route
            path="/add-blog"
            element={<BlogForm setIsUpdate={setIsUpdate} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
