import React, { useState, useEffect } from 'react';
import Helmet from "react-helmet"
import { Route, Switch } from 'react-router-dom';
import "./App.scss";
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import 'bootstrap/dist/css/bootstrap.min.css';
import AUTH from './utils/AUTH';
import Favicon from './images/favicon.ico'

//pages
import Messages from './pages/Messages';
import Project from './pages/Project';
import Notes from './pages/Notes';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import LoggedOut from './pages/LoggedOut';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    AUTH.getUser().then(response => {
        // console.log(response.data);
        if (!!response.data.user) {
          setLoggedIn(true);
          setUser(response.data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      });

      return () => {
        setLoggedIn(false);
        setUser(null);
      };
  }, []);

	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
			}
		});
	};

	const login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
      }
    });
	};

  return (
    <div className="App">
      <Helmet>
        <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      </Helmet>
      { loggedIn && (
        <div>
          <Nav user={user} logout={logout}/>
          <div className="main-view">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/messaging" component={Messages} />
              <Route exact path="/project" component={Project} />
              <Route exact path="/project/:id" component={Project} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/notes" component={Notes} />
              <Route exact path="/userprofile" component={UserProfile} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <div className="auth-wrapper" style={{}}>
          <div className="main-view">
            <Switch>
              <Route exact path="/signup" component={SignupForm} />
              <Route exact path="/login" component={() => <LoginForm login={login}/>} />
              <Route component={LoggedOut} />
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
