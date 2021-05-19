import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Columns, Container } from "react-bulma-components";
import time from "../../images/time.jpg";
import dashboard from "../../images/dashboard.png";
import project from "../../images/project.png";

function LoggedOut() {
  const location = useLocation();

  const [navActive, setNavActive] = React.useState(false);

  return (
    <div>
      <nav
        className="navbar is-fixed-top is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link
            to="/login"
            className={
              location.pathname === "/login"
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
              setNavActive(!navActive);
            }}
            role="button"
            className={`navbar-burger ${navActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMain"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarMain"
          className={`navbar-menu ${navActive ? "is-active is-centered" : ""}`}
        >
          <div className="navbar-start">
            <p className="navbar-item ml-6 mt-2 has-text-dark">
              Start using StreamFlow for FREE today!
            </p>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/signup" className="button is-primary is-rounded">
                  Register
                </Link>
                <Link
                  to="/login"
                  className="button is-link is-rounded is-outlined"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* //hero sections */}
      <section className="hero is-medium ">
        <Container>
          <div className="hero-body">
            <h1 className="title is-1 has-text-centered">
              Welcome to StreamFlow
            </h1>
            <h2 className="subtitle is-1 has-text-centered">
              Enjoy sleek project management without all of the fluff
            </h2>
          </div>
        </Container>
      </section>

      <section className="hero is-link is-fullheight mt-6">
        <div className="hero-body">
          <div className="container has-text-centered">
            <Columns>
              <Columns.Column>
                <p className="title is-1">Set Up in Minutes</p>
                <p className="subtitle is-2">
                  Create a project, add your team, and you are ready to go!
                </p>
              </Columns.Column>
              <Columns.Column>
                <img style={{ width: 400 }} className="mb-3" src={time}></img>
                <div>
                  <a
                    style={{ fontSize: 10 }}
                    href="https://www.vecteezy.com/free-vector/calendar"
                  >
                    Calendar Vectors by Vecteezy
                  </a>
                </div>
              </Columns.Column>
            </Columns>
          </div>
        </div>
      </section>

      <section className="hero is-primary is-fullheight">
        <div className="hero-body has-text-centered">
          <div className="container has-text-centered">
            <Columns>
              <Columns.Column>
                <img
                  style={{ width: 500 }}
                  className="mb-3"
                  src={project}
                ></img>
              </Columns.Column>
              <Columns.Column>
                <p className="title is-1">Visualization of Project Progress</p>
                <p className="subtitle is-2">
                  Easily view all of your tasks conveniently in one location
                </p>
              </Columns.Column>
            </Columns>
          </div>
        </div>
      </section>

      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <Columns>
              <Columns.Column>
                <p className="title is-1">
                  Easily switch between multiple projects
                </p>
                <p className="subtitle is-2">
                  There is no limit to the amount of createable projects
                </p>
              </Columns.Column>
              <Columns.Column>
                <img
                  style={{ width: 500 }}
                  className="mb-3"
                  src={dashboard}
                ></img>
              </Columns.Column>
            </Columns>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoggedOut;
