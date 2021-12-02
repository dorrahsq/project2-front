import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const BASE_URL = "http://localhost:5000";

const SignUp = () => {
  const [users, setusers] = useState([]);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const users = await axios.get(`${BASE_URL}/users/`);
    setusers(users.data);
  };

  const createNew = () => {
    let obj = {
      username,
      email,
      password,
    };
    axios.post(`${BASE_URL}/users/create`, obj).then(function (response) {
      console.log(response.data._id);
      setUser(response.data);
      localStorage.setItem("userId", JSON.stringify(response.data._id));
      window.location.reload(false);
    });
  };

  return (
    <>
      {/* <img className="videoBG" src="https://images.pexels.com/photos/947785/pexels-photo-947785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/> */}
      <img
        className="videoBG"
        src="https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />

      <div className="describeItemS">
        <div className="signUpInput">
          <span className="sign"> Sign up </span>

          <input
            type="text"
            placeholder=" username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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
                return ele.email == email;
              });
              if (found) {
                console.log(found);
                <p id="accountTextt">
                  {setMessage(
                    "This email already have an account! log in or change your email"
                  )}
                </p>;
              } else {
                createNew();
              }
            }}
          >
            <BsFillArrowRightCircleFill className="goIcon" />
          </button>
        </div>
        <div className="already">
          Already have an account? <Link to="/login">Log in </Link>
        </div>
        <p id="accountTextt"> 
        {message} </p>
      </div>
    </>
  );
};

export default SignUp;
