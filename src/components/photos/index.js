import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useNavigate } from "react-router-dom";
import Search from "../search";

const BASE_URL = "http://localhost:5000";

const Photos = () => {
  let navigate = useNavigate();
  const [posts, setPost] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const posts = await axios.get(`${BASE_URL}/posts/`);
    setPost(posts.data);
  };

  const goInside = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="photosContener">
      {/* <Search/> */}
      {posts ? (
        <ImageList variant="masonry" cols={5} gap={10}>
          {posts.map((item) => (
            <ImageListItem key={item.img}>
              <img
                onClick={() => {
                  goInside(item._id);
                }}
                className="photo"
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};

export default Photos;
