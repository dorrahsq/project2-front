import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { saveAs } from "file-saver";
import { GrInstallOption } from "react-icons/gr";

const BASE_URL = "http://localhost:5000";

const Photo = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [likesCount, setLikesCount] = useState();
  const [photo, setPhoto] = useState("");
  const [text, setText] = useState("Add to Favorite");
  const [userid, setuserid] = useState();
  const [found, setFound] = useState();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const posts = await axios.get(`${BASE_URL}/posts/`);
    setPhoto(posts.data.find((ele) => ele._id == id));
    const onPostt = posts.data.find((ele) => ele._id == id);
    const onPost = onPostt._id;

    //likes count
    const likesCount = await axios.get(
      `${BASE_URL}/likes/count?onPost=${onPost}`
    );

    setLikesCount(likesCount.data);

    //check if the user like this post or not
    const likes = await axios.get(`${BASE_URL}/likes/allLikes`);

    let userId = JSON.parse(localStorage.getItem("userId"));
    setuserid(userId);

    const elm = likes.data.find(
      (ele) => ele.by == userId && ele.onPost == onPost
    );

    setFound(elm);
    if (elm) {
      setText(<IoHeartSharp />);
    } else {
      setText(<IoHeartOutline />);
    }
  };

  const Fav = (photoId) => {
    let obj = {
      by: userid,
      onPost: photoId,
    };

    if (found) {
      axios
        .delete(`${BASE_URL}/likes/unlike?by=${userid}&onPost=${photoId}`)
        .then(() => console.log(" removed secc.... "))
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("not found, then its time to add ");
      axios
        .post(`${BASE_URL}/likes/`, obj)
        .then(() => console.log(" added  "))
        .catch((err) => {
          console.error(err);
        });
    }
    getAllPosts();
  };

  const person = (userId) => {
    navigate(`/profile/${userId}`);
  };
  const deletePost = (idd) => {
    const _id = idd;
    const onPost = idd;
    console.log(idd);
    //delete post
    axios
      .delete(`${BASE_URL}/posts/delete?_id=${_id}`)
      .then(() => console.log(" removed secc.... "))
      .catch((err) => {
        console.error(err);
      });
    //delete all likes on this post
    axios
      .delete(`${BASE_URL}/likes/deleteLikes?onPost=${onPost}`)
      .then(() => console.log(" removed all likes.... "))
      .catch((err) => {
        console.error(err);
      });

    navigate(`/profile`);
  };

  const downloadImage = (url) => {
    saveAs(url, "image.jpg"); // Put your image url here.
  };

  return (
    <>
      {photo ? (
        <>
        
        <img className="imgg" src={photo.postedBy.img} />

          <div className="photoContener">
            <p className="postedBy">
              <span
                onClick={() => {
                  person(photo.postedBy._id);
                }}
              >
                {photo.postedBy.username}
              </span>
              <span className="hovver">
                <span
                  className="clickDown"
                  // onClick={() => {
                  //   downloadImage(photo.img);
                  // }}
                >
                  <a
                    href={photo.img}
                    target="_blank"
                    download
                    className="downloadIcno"
                  >
                    <GrInstallOption />
                  </a>
                </span>
              </span>
            </p>
            <img className="imggg" src={photo.img} alt="" />
            <p className="left">
              <button
                className="heartBtn"
                onClick={() => {
                  Fav(photo._id);
                }}
              >
                {text}
              </button>
              <span className="count"> {likesCount} </span>
              <span className="date"> {photo.date.slice(0, 10)}</span>
            </p>
            <p className="prgg">
              <span
                className="username"
                onClick={() => {
                  person(photo.postedBy._id);
                }}
              >
                {" "}
                {photo.postedBy.username}{" "}
              </span>

              {photo.describe}
              {photo.hashtags.length ? (
                <span className="hashh"> #{photo.hashtags} </span>
              ) : (
                console.log("g")
              )}
            </p>

            {userid == photo.postedBy._id ? (
              <div className="deleteBtnContener">
                <button
                  onClick={() => {
                    deletePost(photo._id);
                  }}
                  className="deleteBtn"
                >
                  Delete this post
                </button>
                {/* note: i shoud send delete all likes on this post ---------------------- */}
              </div>
            ) : (
              console.log("f")
            )}
          </div>
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </>
  );
};

export default Photo;
