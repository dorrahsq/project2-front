import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const Likes = () => {
  let navigate = useNavigate();

  const [userLikes, setUserLikes] = useState();

  useEffect(() => {
    getAllLikes();
  }, []);

  const getAllLikes = async () => {
    const likes = await axios.get(
      `${BASE_URL}/likes/userLikes?by=${JSON.parse(
        localStorage.getItem("userId")
      )}`
    );
    setUserLikes(likes.data);
  };

  const goInside = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div>
      {userLikes ? (
        <div className="likesContener">
          <ImageList variant="masonry" cols={3} gap={10}>
            {userLikes.map((item) => (
              <ImageListItem key={item.onPost.img}>
                <img
                  onClick={() => {
                    goInside(item.onPost._id);
                  }}
                  className="photo"
                  src={`${item.onPost.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.onPost.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};

export default Likes;
