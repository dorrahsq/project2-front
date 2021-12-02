import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const BASE_URL = "http://localhost:5000";

const OtherProfile = () => {
  let navigate = useNavigate();

  const id = useParams().id; //make sure should i put id or userId
  const [user, setuser] = useState([]);
  const [userPostss, setUserPostss] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const users = await axios.get(`${BASE_URL}/users/`);
    setuser(users.data.find((ele) => ele._id == id));

    const userPosts = await axios.get(
      `${BASE_URL}/posts/userPost?postedBy=${id}`
    );

    setUserPostss(userPosts.data);
  };
  const goInside = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <div>
        {user ? (
          <>
            <div className="contenerImg">
              <div className="borderImg">
                <img className="othersImg" src={user.img} />
              </div>
              <h3 className="name2"> {user.username} </h3>
              <p className="bio2">{user.Bio}</p>
            </div>
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>

      <div>
        {userPostss ? (
          <>
            {userPostss.length ? (
              <div className="allImg">
                <ImageList variant="masonry" cols={3} gap={11}>
                  {userPostss.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        onClick={() => {
                          goInside(item._id);
                        }}
                        className="photo"
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        // alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            ) : (
              <p>no posted yet </p>
            )}
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>
    </>
  );
};

export default OtherProfile;
