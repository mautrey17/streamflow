import React ,{ useState , useEffect } from "react";
import Nav from "../../components/Nav";
import { Col, Row } from "../../components/Grid";
import SignupForm from "../Auth/SignupForm";
import API from "../../utils/API";

function UserProfile() {
  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });
  useEffect(() => {
  API.get("/api/users/")
  }, [])

  const [property, setProperty] =
        useState(props.initialProperty)
  return (
    <>
      <Nav />

      <Row>
        <Col size="md-2 sm-2">
          <h2>Profile Settings</h2>
          <div>
            <button>Change Password</button>
          </div>
          <div>
            <button>Change Username</button>
          </div>
          <div>
            <button>Update Profile Picture</button>
          </div>
          <div>
            <button>Update Email Address: </button>
          </div>
        </Col>
     
      <Col size="md-9 sm-9">
        
        <h2>Current Profile Settings</h2>
        <EditableTextField initialProperty={userObject.firstName} />
        <EditableTextField initialProperty={userObject.lastName} />
        <EditableTextField initialProperty={userObject.userName} />
        <EditableTextField initialProperty={userObject.email} />
        <EditableTextField initialProperty={userObject.password} />
        {/* <div> Password: </div>
        <div> Profile Picture: </div> */}
       
      </Col>
      </Row>
    </>
  );
}
export default UserProfile;
