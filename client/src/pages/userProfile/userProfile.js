import React from "react";

function UserProfile() {
  return (
    <div className="userProfile">
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
  );
}

export default UserProfile;
