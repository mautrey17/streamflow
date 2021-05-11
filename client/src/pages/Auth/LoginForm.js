import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import { Columns, Container } from 'react-bulma-components';
import './LoginForm.css'

function LoginForm({login}) {
  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
  });
  const [redirectTo, setRedirectTo] = useState(null);

	const handleChange = (event) => {
		setUserObject({
      ...userObject,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		login(userObject.username, userObject.password);
		setRedirectTo('/');
	};

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <div className='gradient' style = {{height:"100vh"}}>
        <Columns>
          <Columns.Column size="1"></Columns.Column>
          <Columns.Column size="3">
            <form className="box mt-6">
              <h3 className="has-text-centered mb-4 is-2">Welcome Back!</h3>
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
                  <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
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
                  <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                </div>
              </div>

              <div className="field is-grouped  mt-4">
                <p className="control">
                  <a className="button is-success has-text-light" onClick={handleSubmit}>
                    Login
                  </a>
                </p>
                
              </div>
              
            </form>
            <Card title="Login to React Reading List">
              <form style={{marginTop: 10}}>
                <label htmlFor="username">Username: </label>
                <Input
                  type="text"
                  name="username"
                  value={userObject.username}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password: </label>
                <Input
                  type="password"
                  name="password"
                  value={userObject.password}
                  onChange={handleChange}
                />
                <Link to="/signup">Register</Link>
                <FormBtn onClick={handleSubmit}>Login</FormBtn>
              </form>
            </Card>
          </Columns.Column>
          <Columns.Column size="3"></Columns.Column>
        </Columns>
        
      </div>
    )
  }
}

export default LoginForm;
