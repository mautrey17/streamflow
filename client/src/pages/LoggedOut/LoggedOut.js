import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Columns, Container } from 'react-bulma-components';

function LoggedOut() {

    const location = useLocation();

    const [navActive, setNavActive] = React.useState(false);

    return(
        <div>
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
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
                        <p className="navbar-item ml-6 mt-2 has-text-dark">Start using StreamFlow for FREE today!</p>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                            <Link
                                to="/signup"
                                className="button is-primary is-rounded"
                            >
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
            

            <section className="hero is-link is-fullheight mt-6">
                <Container>
            <div className="hero-body">
                <div className="">
                <p className="title">
                    Reason 1 to use streamflow
                </p>
                <p className="subtitle">
                    This is a good reason
                </p>
                </div>
            </div>
            </Container>
            </section>

            <section className="hero is-primary is-fullheight">
                <Container>
            <div className="hero-body">
                <div className="">
                <p className="title">
                Reason 2 to use streamflow
                </p>
                <p className="subtitle">
                This is a better reason
                </p>
                </div>
            </div>
            </Container>
            </section>
                
        </div>
    )
}

export default LoggedOut;