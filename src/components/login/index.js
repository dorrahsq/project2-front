import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

// import video from "../../imges/video.mp4"
const BASE_URL = "http://localhost:5000";

const Login = () => {
  let navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const users = await axios.get(`${BASE_URL}/users/`);
    setusers(users.data);
  };

  return (
    <>
      <img
        className="videoBG"
        src="https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <div className="describeItem">
        <span className="Logg">Log in </span>
        <input
          type="text"
          placeholder=" email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder=" password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="LogBtn"
          onClick={() => {
            let found = users.find((ele) => {
              return ele.email == email && ele.password == password;
            });
            if (found) {
              //navigate first
              navigate(`/`);
              localStorage.setItem("userId", JSON.stringify(found._id));
              console.log("your in ");
              window.location.reload(false);
            } else {
              setMessage(`The email address or password is incorrect `); //link to sign up component
            }
          }}
        >
          <BsFillArrowRightCircleFill className="goIcon" />
        </button>
        <div className="already">
          Don't have an account? <Link to="/">Sign up </Link>
        </div>
        <div className="mesageL">{message} </div>
      </div>
    </>
  );
};

export default Login;
