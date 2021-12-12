import React, { useState, useEffect } from "react";
import { porjectSto } from "../components/firebase/config";
import axios from "axios";
import "./style.css";

const BASE_URL = "https://project2back.herokuapp.com";

const UseStorageProfile = (props) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = porjectSto.ref(props.imgP.name);
    storageRef.put(props.imgP).on("state_changed", async () => {
      const URL = await storageRef.getDownloadURL();
      setUrl(URL);
    });
    // eslint-disable-next-line
  }, []);

  const changeProfile = () => {
    const obj = {
      _id: props.id,
      img: url,
    };
    axios
      .put(`${BASE_URL}/users/updatePhoto`, obj)
      .then(() => console.log("addedddddddd"))
      .catch((err) => {
        console.error(err);
      });
    window.location.reload(false);
  };

  return (
    <>
      {url ? changeProfile() : <h4 className="loadingProfile">Loading ...</h4>}
    </>
  );
};

export default UseStorageProfile;
