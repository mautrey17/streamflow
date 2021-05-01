import React from "react";
import Nav from "../../components/Nav"

function UserProfile() {
  return (
    <div>
      <Nav />
      <div className="userProfile container">
      <form>
        <label>Login Information</label>
        <input className="form-control" type="text" placeholder="Username " />
        <input className="form-control" type="text" placeholder="Password " />
        <input className="form-control" type="text" placeholder="Email: " />
        <input
          className="form-control"
          type="image"
          placeholder="Profile Picture "
        />
      </form>
      </div>
    </div>
  );
}

export default UserProfile;
