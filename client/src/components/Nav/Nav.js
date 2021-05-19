import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { PromiseProvider } from "mongoose";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import './Nav.css';

function Nav(props) {
  useEffect(() => {
    AUTH.getUser().then(res => {
      API.getOneUser(res.data.user._id).then(res2 => {
        loadAvatar(res2.data[0])
      })
    })
  }, [])

  const location = useLocation();
  const [navActive, setNavActive] = React.useState(false)
  const [avatar, setAvatar] = useState('https://avataaars.io/?')
  let avatarSettings = 'https://avataaars.io/?';
  function loadAvatar(user) {
    if (user.avatar.style) {
      avatarSettings += 'avatarStyle=' + user.avatar.style
    }
    if (user.avatar.top) {
      avatarSettings += '&topType=' + user.avatar.top
    }
    if (user.avatar.accessories) {
      avatarSettings += '&accessoriesType=' + user.avatar.accessories
    }
    if (user.avatar.hairColor) {
      avatarSettings += '&hairColor=' + user.avatar.hairColor
    }
    if (user.avatar.facialHair) {
      avatarSettings += '&facialHairType=' + user.avatar.facialHair
    }
    if (user.avatar.facialColor) {
      avatarSettings += '&facialHairColor=' + user.avatar.facialColor
    }
    if (user.avatar.clothes) {
      avatarSettings += '&clotheType=' + user.avatar.clothes
    }
    if (user.avatar.clotheColor) {
      avatarSettings += '&clotheColor=' + user.avatar.clotheColor
    }
    if (user.avatar.eyes) {
      avatarSettings += '&eyeType=' + user.avatar.eyes
    }
    if (user.avatar.eyebrow) {
      avatarSettings += '&eyebrowType=' + user.avatar.eyebrow
    }
    if (user.avatar.mouth) {
      avatarSettings += '&mouthType=' + user.avatar.mouth
    }
    if (user.avatar.skin) {
      avatarSettings += '&skinColor=' + user.avatar.skin
    }
    setAvatar(avatarSettings)
  }

  return (
    <div className="">
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link
            to="/"
            className={
              location.pathname === "/dashboard"
                ? "navbar-item is-active"
                : "navbar-item"
            }
          >
            <h3>
              <span>
                <i className="fas fa-wind"></i>
              </span>{" "}
              StreamFlow
            </h3>
          </Link>

          <a
            onClick={() => {
              setNavActive(!navActive)
            }}
            role="button"
            className={`navbar-burger ${navActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMain"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarMain" className={`navbar-menu ${navActive ? 'is-active is-centered' : ''}`}>
          <div className="navbar-start">
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "navbar-item is-active"
                  : "navbar-item"
              }
            >
              <span><i className="fas fa-home mr-2"></i></span>Dashboard
          </Link>

            <Link
              to="/project"
              className={
                location.pathname === "/project"
                  ? "navbar-item is-active"
                  : "navbar-item"
              }
            >
              <span><i className="mr-2 fas fa-shapes"></i></span>Projects
          </Link>
            <Link
              to="/messaging"
              className={
                location.pathname === "/messaging"
                  ? "navbar-item is-active"
                  : "navbar-item"
              }
            >
              <span><i className="mr-2 fas fa-comment-dots"></i></span>Messages
          </Link>
            <Link
              to="/notes"
              className={
                location.pathname === "/notes"
                  ? "navbar-item is-active"
                  : "navbar-item"
              }
            >
              <span><i className="mr-2 fas fa-sticky-note"></i></span>Notes
          </Link>

            {/* In the future if we add a dropdown menu */}
            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div> */}
          </div>

          <div className="navbar-end">
            <img
              src={avatar}
              width='50px'
              height='75px'
            />
            <Link
              to="/userprofile"
              className={
                location.pathname === "/userprofile"
                  ? "navbar-item is-active"
                  : "navbar-item"
              }
            >
              <span><i className="fas fa-user-tie mr-2"></i></span>User Profile
          </Link>
            <div className="navbar-item">
              <div className="buttons">

                <a
                  className="button is-black"
                  onClick={props.logout}
                >Log Out</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
