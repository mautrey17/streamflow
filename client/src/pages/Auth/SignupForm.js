import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import { Columns, Container } from 'react-bulma-components';
import AUTH from '../../utils/AUTH';
import './LoginForm.css';

function SignupForm(props) {
  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    redirectTo: null
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
		// TODO - validate!
		AUTH.signup({
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      username: userObject.username,
      password: userObject.password
    }).then(response => {
      // console.log(response);
      if (!response.data.errmsg) {
        setRedirectTo('/');
      } else {
        console.log('duplicate');
      }
    });
  };
  
  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  }
  
  return (
    <div className='gradient' style = {{height:"100vh"}}>
    <Container>
      <Columns>
        <Columns.Column size="one-quarter"></Columns.Column>
        <Columns.Column size="half">
          <form className="box px-5 py-6 reg-box">
            <h3 className="title has-text-centered mb-4 is-2">Streamflow Registration</h3>
            <h4 className="subtitle has-text-centered is-5">Create your own FREE Streamflow account</h4>
            <div className="field">
                <label className="label">First Name:</label>
                <div className="control pb-1">
                  <input 
                    className="input"
                    type="text"
                    placeholder="Jane"
                    name="firstName"
                    value={userObject.firstName}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>

              <div className="field">
                <label className="label">Last Name:</label>
                <div className="control pb-1">
                  <input 
                    className="input"
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    value={userObject.lastName}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>

              <div className="field">
                <label className="label">Username:</label>
                <div className="control has-icons-left pb-1">
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
                <div className="control has-icons-left pb-1">
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

              <div className="field">
                <label className="label">Confirm Password:</label>
                <div className="control has-icons-left pb-1">
                  <input 
                    className={`input ${userObject.confirmPassword.length>0 && userObject.confirmPassword === userObject.password ? 'is-success' : ''} `}
                    type="password"
                    placeholder="PleaseBeSecure"
                    name="confirmPassword"
                    value={userObject.confirmPassword}
                    onChange={handleChange}
                  ></input>
                  <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered mt-4">
                <p className="control">
                  <a className="button is-success has-text-light is-rounded" onClick={handleSubmit}>
                    Register
                  </a>
                </p>
                <p className="control">
                  <Link className="button is-link is-outlined  is-rounded" to='/login'>
                    Login
                  </Link>
                </p>
              </div>
          </form>
        </Columns.Column>
      </Columns>
    </Container>
    </div>
  )
}

export default SignupForm;
