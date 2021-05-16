import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { PromiseProvider } from "mongoose";
import API from "../../utils/API";
import './Nav.css';

function Nav(props) {

  const location = useLocation();
  const [navActive, setNavActive] = React.useState(false)
  const [avatar, setAvatar] = useState('https://avataaars.io/?')
  let avatarSettings='https://avataaars.io/?';
  function loadAvatar() {
    API.getUsers().then(res => {
      console.log('Avatar res',res.data)
      if (res.data[0].avatar.style) {
        avatarSettings += 'avatarStyle=' + res.data[0].avatar.style
      }
      if (res.data[0].avatar.top) {
        avatarSettings += '&topType=' + res.data[0].avatar.top
      }
      if (res.data[0].avatar.accessories) {
        avatarSettings += '&accessoriesType=' + res.data[0].avatar.accessories
      }
      if (res.data[0].avatar.hairColor) {
        avatarSettings += '&hairColor=' + res.data[0].avatar.hairColor
      }
      if (res.data[0].avatar.facialHair) {
        avatarSettings += '&facialHairType=' + res.data[0].avatar.facialHair
      }
      if (res.data[0].avatar.facialColor) {
        avatarSettings += '&facialHairColor=' + res.data[0].avatar.facialColor
      }
      if (res.data[0].avatar.clothes) {
        avatarSettings += '&clotheType=' + res.data[0].avatar.clothes
      }
      if (res.data[0].avatar.eyes) {
        avatarSettings += '&eyeType=' + res.data[0].avatar.eyes
      }
      if (res.data[0].avatar.eyebrow) {
        avatarSettings += '&eyebrowType=' + res.data[0].avatar.eyebrow
      }
      if (res.data[0].avatar.mouth) {
        avatarSettings += '&mouthType=' + res.data[0].avatar.mouth
      }
      if (res.data[0].avatar.skin) {
        avatarSettings += '&skinColor=' + res.data[0].avatar.skin
      }
      console.log('avatarObject',avatarSettings)
      // return avatarSettings
    });
  }
  
  console.log('at RETURN')
  loadAvatar()
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
