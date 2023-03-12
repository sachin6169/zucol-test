import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../common/common";

const BlogList = ({ blogs }) => {
  const [readMore, setReadMore] = useState('');
  const navigate = useNavigate();

  const readMoreHandler = (id) => {
    setReadMore(id)
    
  };

  const readLessHandler = (id) => {
    setReadMore('');
  };

  const addNewHandler = () => {
    navigate("/add-blog");
  };

  
 

  return (
    <div>
      <div className="add-new-btn">
        <Button onClick={addNewHandler} variant="primary">
          Add New Blog +
        </Button>
      </div>

      {blogs && blogs.map(( elem , i) => {
        return (<div className="blog-list" key={i}>
          
          <Card style={{ padding: "15px" }}>
            <h2 className="author_name"> {elem.author_name}</h2>
            <Card.Title>{elem.title}</Card.Title>
            <div>
              {readMore !== elem._id && (
                <Button
                  className="read-btn"
                  variant="secondary"
                  onClick={() => readMoreHandler(elem._id)}
                >
                  Read more
                </Button>
              )}
            </div>

            {readMore === elem._id && (
              <div>
                <Card.Img
                  src={`${BASE_URL}/${elem.cover_image}`}
                  // src="http://localhost:8000/images/1678610254410.jpeg"
                  alt="cover_image"
                />
                <Card.Body>
                  <Card.Title>slug</Card.Title>

                  <Card.Text>
                   {elem.content}
                  </Card.Text>
                  <br />
                  <Card.Text>
                    {elem.author_description}
                  </Card.Text>
                </Card.Body>
                <br />

                <Button
                  className="read-btn"
                  variant="secondary"
                  onClick={() => readLessHandler(elem._id)}
                >
                  Close Blog
                </Button>
              </div>
            )}
          </Card>
        </div>

        )
      })}


    </div>
  );
};

export default BlogList;
