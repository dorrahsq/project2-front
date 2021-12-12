import React from "react";
import "./style.css";

const AboutUs = () => {
  return (
    <div className="allp">
      {/* About us  



          <p> Frame it Is a free, online photo-sharing website </p> */}

      <div className="aboutUsimgDiv">
        <img
          className="aboutUsImg"
          src="https://images.pexels.com/photos/8743399/pexels-photo-8743399.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
      </div>

      <h1 className="aboutis">ABOUT US </h1>
      <p>
        At FRAME It , we believe everyone should have the opportunity to capture
        and share the world’s moments.{" "}
      </p>
    </div>
  );
};

export default AboutUs;
