import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import UseStorage from "../../hocks/useStorage";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { RiPencilFill } from "react-icons/ri";
import UseStorageProfile from "../../hocks/useStorageProfile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,

  p: 4,
};

const BASE_URL = "http://localhost:5000";

const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  let navigate = useNavigate();

  const [userLikes, setUserLikes] = useState();

  const [users, setusers] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [userPostss, setUserPostss] = useState([]);
  const [describe, setDescribe] = useState("");
  const [bioInpu, setBioInpu] = useState(false);
  const [tag, setTag] = useState("");
  const [img, setImg] = useState("");
  const [newBio, setNewBio] = useState("");

  const [profileImg, setProfileImg] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllUsers();
    getAllLikes();
  }, []);

  const getAllUsers = async () => {
    const allusers = await axios.get(`${BASE_URL}/users/`);
    setusers(allusers.data);
    let userid = JSON.parse(localStorage.getItem("userId"));
    setUserProfile(allusers.data.find((ele) => ele._id == userid));

    const userPosts = await axios.get(
      `${BASE_URL}/posts/userPost?postedBy=${userid}`
    );

    setUserPostss(userPosts.data);
  };
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
  const [alignment, setAlignment] = React.useState("posts");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
  };

  const goToPosts = () => {
    console.log("go post");
  };

  const goToLikes = () => {
    console.log("goo likes");
  };

  const changeBio = () => {
    console.log("change Bio");
    setBioInpu(true);
    //then down -- bioinput? <input>
  };

  const changeBioBack = () => {
    const obj = {
      _id: userProfile._id,
      Bio: newBio,
    };
    axios
      .put(`${BASE_URL}/users/updateBio`, obj)
      .then(() => console.log("done"))
      .catch((err) => {
        console.error(err);
      });
    console.log(userProfile._id);
    window.location.reload(false);
  };
  return (
    <>
      <div>
        {userProfile ? (
          <>
            <div className="contenerImg">
              <div className="borderImg">
                <img className="othersImg" src={userProfile.img} />
              </div>

              <label htmlFor="icon-button-filee">
                <Input
                  accept="image/*"
                  id="icon-button-filee"
                  type="file"
                  onChange={(e) => {
                    /////////
                    setProfileImg(e.target.files[0]);
                  }}
                />

                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <RiPencilFill className="editeImg" />
                </IconButton>
              </label>

              {profileImg ? (
                <div>
                  <UseStorageProfile imgP={profileImg} id={userProfile._id} />
                </div>
              ) : (
                ""
              )}

              {/* <RiPencilFill className="editeImg" /> */}
              <h3 className="name"> {userProfile.username} </h3>

              {!bioInpu && (
                <p className="bio">
                  {userProfile.Bio}{" "}
                  <RiPencilFill
                    className="editBioIcno"
                    onClick={() => {
                      changeBio();
                    }}
                  />
                </p>
              )}

              {bioInpu && (
                <>
                  <input
                    className="inputBio"
                    type="text"
                    placeholder={userProfile.Bio}
                    onChange={(e) => {
                      setNewBio(e.target.value);
                    }}
                  />
                  <button className="bioBtn" onClick={changeBioBack}>
                    {" "}
                    change{" "}
                  </button>
                </>
              )}
            </div>

            <div className="newPostBtn">
              <Button
                onClick={() => {
                  handleOpen();
                }}
              >
                New post +
              </Button>
            </div>
            <Modal
              className="modal"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="NewPostModel">
                <Box sx={style} className="box">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <span className="newPostText"> New post </span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <label htmlFor="icon-button-file">
                        <Input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          onChange={(e) => {
                            /////////
                            setImg(e.target.files[0]);
                          }}
                        />

                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera className="fkoe" />
                        </IconButton>
                      </label>
                    </Stack>

                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setDescribe(e.target.value);
                      }}
                      type="text"
                      placeholder="Write a caption"
                    />
                    <br />
                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setTag(e.target.value);
                      }}
                      type="text"
                      placeholder="hashtag"
                    />
                    {img ? (
                      <div>
                        <UseStorage
                          img={img}
                          describe={describe}
                          hashtags={tag}
                          postedBy={userProfile._id}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Box>
              </div>
            </Modal>
            <div className="toggleBtn">
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton onClick={goToPosts} value="posts">
                  Posts
                </ToggleButton>
                <ToggleButton onClick={goToLikes} value="likes">
                  Likes
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>

      <div>
        {userPostss && alignment == "posts" ? (
          <>
            {userPostss.length ? (
              <div className="allImg">
                <ImageList variant="masonry" cols={3} gap={10}>
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
              <p className="noPosted">no posted yet ): </p>
            )}
          </>
        ) : (
          console.log("d")
        )}
      </div>

      <div>
        {userLikes && alignment == "likes" ? (
          <>
            {userLikes.length ? (
              <div className="allImg">
                {console.log(userLikes)}
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
              <p className="noPosted">You didn't like any post yet ): </p>
            )}
          </>
        ) : (
          // <h1>loading ...</h1>
          console.log("d")
        )}
      </div>
    </>
  );
};
export default Profile;
