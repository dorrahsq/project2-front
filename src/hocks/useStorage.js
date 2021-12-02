import React, { useState, useEffect } from "react";
import { porjectSto } from "../components/firebase/config";
import axios from "axios";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const UseStorage = (props) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = porjectSto.ref(props.img.name);
    storageRef.put(props.img).on("state_changed", async () => {
      const URL = await storageRef.getDownloadURL();
      setUrl(URL);
    });
  }, []);
  const postIt = () => {
    const obj = {
      img: url,
      describe: props.describe,
      hashtags: props.hashtags,
      postedBy: props.postedBy,
    };
    axios
      .post(`${BASE_URL}/posts/create`, obj)
      .then(() => console.log("addedddddddd"))
      .catch((err) => {
        console.error(err);
      });
    window.location.reload(false);
  };

  return (
    <>
      {url ? (
        <button
          className="PostIt"
          onClick={() => {
            postIt();
          }}
        >
          post{" "}
        </button>
      ) : (
        <h4>Loading ...</h4>
      )}
    </>
  );
};

export default UseStorage;
