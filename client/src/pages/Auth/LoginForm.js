import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Columns } from "react-bulma-components";
import login_img from "../../images/login.jpg";
import "./LoginForm.css";

function LoginForm({ login }) {
  const [userObject, setUserObject] = useState({
    username: "",
    password: "",
  });
  const [redirectTo, setRedirectTo] = useState(null);

  const handleChange = (event) => {
    setUserObject({
      ...userObject,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userObject.username, userObject.password);
    setRedirectTo("/");
  };

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />;
  } else {
    return (
      <div className="gradient" style={{ height: "100vh" }}>
        <Columns>
          <Columns.Column size="1"></Columns.Column>
          <Columns.Column size="3" className="holder">
            <form className="box px-5 form-box">
              <h3 className="title has-text-centered mb-4 is-2">
                Welcome Back to Streamflow
              </h3>
              <h4 className="subtitle has-text-centered is-5">
                Please login to continue
              </h4>
              <div className="field">
                <label className="label">Username:</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="CoolGuy1234"
                    name="username"
                    value={userObject.username}
                    onChange={handleChange}
                  ></input>
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Password:</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="PleaseBeSecure"
                    name="password"
                    value={userObject.password}
                    onChange={handleChange}
                  ></input>
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered mt-4">
                <p className="control">
                  <a
                    className="button is-success has-text-light is-rounded"
                    onClick={handleSubmit}
                  >
                    Login
                  </a>
                </p>
                <p className="control">
                  <Link
                    className="button is-link is-outlined  is-rounded"
                    to="/signup"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <img className="ml-4" src={login_img}></img>
              <p style={{ fontSize: 10 }} className="has-text-centered">
                Image by:{" "}
                <a href="https://www.vecteezy.com/free-vector/vector">
                  Vector Vectors by Vecteezy
                </a>
              </p>
            </form>
          </Columns.Column>
          <Columns.Column size="3"></Columns.Column>
        </Columns>
      </div>
    );
  }
}

export default LoginForm;
