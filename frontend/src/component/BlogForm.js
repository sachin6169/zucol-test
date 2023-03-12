import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../common/common";
import "./Blog.css";

const BlogForm = (props) => {
  const [errorMsg, setErrorMsg] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    blog_image: null,
    content: "",
    author_name: "",
    author_description: "",
  });
  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData?.content?.length < 50 ||
      formData?.author_description?.length < 50
    ) {
      setErrorMsg(true);
    } else {
      try {
        const formData1 = new FormData();
        formData1.append('title', formData.title);
        formData1.append('cover_image', formData.blog_image);
        formData1.append('content', formData.content);
        formData1.append('author_name', formData.author_name);
        formData1.append('author_description', formData.author_description);
        const response = await axios.post(`${BASE_URL}/api/blog/create`, formData1, {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        });

        if (response.data.error) {
          return toast.error(response.data.msg, {
            position: toast.POSITION.TOP_LEFT,
          });
        } else {
          toast.success("Blog added successfully", {
            position: toast.POSITION.TOP_LEFT,
          });
          props.setIsUpdate((prev) => !prev);
          navigate("/");
          setErrorMsg(false);
        }
      } catch (err) {
        
        return toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    }
  };

  const onChangeHandler = (e) => {
    setErrorMsg(false);
    if (e.target.name === 'blog_image') {
      setFormData({ ...formData, blog_image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="blog-form">
      <Button onClick={goHomeHandler} variant="primary">
        Back to Home page
      </Button>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label className="input-head">Title</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>
          
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formFileDisabled" className="mb-3">
              <Form.Label className="input-head">Cover image</Form.Label>
              <Form.Control
                required
                type="file"
                name="blog_image"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label className="input-head">Author name</Form.Label>
              <Form.Control
                required
                type="text"
                name="author_name"
                placeholder="Enter author name"
                value={formData.author_name}
                onChange={onChangeHandler}
              />
            </Form.Group>{" "}
          </Col>
        </Row>

        <Form.Group controlId="formBasicBody">
          <Form.Label className="input-head">Content</Form.Label>
          <Form.Control
            required
            as="textarea"
            placeholder="Enter content"
            name="content"
            rows={3}
            value={formData.content}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBody">
          <Form.Label className="input-head">Author description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="author_description"
            placeholder="Enter author description"
            rows={3}
            value={formData.author_description}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <br />
        {errorMsg && (
          <div className="err-msg">
            {" "}
            Description and content must be at most 50 Words
          </div>
        )}
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
