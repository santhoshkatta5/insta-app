import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import Login from "./Login";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const { setToken } = useContext(UserContext);
  const [signupSuccess, setSignupSuccess] = useState(false);

  function updateUser(e) {
    let key = e.target.name;
    setUser({ ...user, [key]: e.target.value });
  }

  async function implementSignup(e) {
    console.log("hello");
    e.preventDefault();
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      setMessage("Please fill all the details");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setMessage("Password and confirm Password do not match");
      return;
    }

    //signup Api-https://instagram-express-app.vercel.app/api/auth/signup
    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/signup",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );
      console.log("success", response.data.message);
      console.log("status", response.status);
      setMessage(response.data.message);
      console.log("token", response.data.data.token);
      setToken(response.data.data.token);
      setUser({ name: "", email: "", password: "", confirmPassword: "" });
      setSignupSuccess(true);
      setMessage("Signup Successful!");
    } catch (error) {
      console.log("Error", error.response.data.message);
      console.log("status", error.response.status);
      setMessage(error.response.data.message);
    }
  }

  return (
    <div>
      {signupSuccess ? (
        <div>
          {message && <h2>{message}</h2>}
          <h2></h2>
          <Login />
        </div>
      ) : (
        <div className="dude">
          <h1>Signup</h1>
          {message && <h2>{message}</h2>}
          <form onSubmit={implementSignup}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={updateUser}
              value={user.name}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={updateUser}
              value={user.email}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={updateUser}
              value={user.password}
            />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={updateUser}
              value={user.confirmPassword}
            />
            <br /><br /><br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Signup;