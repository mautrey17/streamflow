import React ,{ useState , useEffect, useRef } from "react";
import Nav from "../../components/Nav";
import { Card } from "../../components/Card";
import MyAvatar from "../../components/Avatar"
import { Col, Row, Container } from "../../components/Grid";
import SignupForm from "../Auth/SignupForm";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, Dropdown } from "../../components/Form";
import AUTH from "../../utils/AUTH"
import Axios from "axios";

function UserProfile() {
  const formEl = useRef(null);
  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
  });
  
  const avatarEl = useRef(null);
  const [avatarObject, setAvatarObject] = useState({
    style: '',
    top: ''
  });

  useEffect(() => {
  Axios.get("/auth/user/ ")
  }, [])

  function handleInputChange(event){
    const { name, value } = event.target;
    setUserObject({...userObject, [name ]: value})
  };

  function handleAvatarChange(event){
    const { name, value } = event.target;
    setAvatarObject({...avatarObject, [name ]: value})
  };

  function handleFormSubmit(event){
    event.preventDefault();
    if(userObject.username && userObject.password && userObject.email){

    }
  }

  return (
    <>
    <Container fluid>
      <Row>
        <Col size="md-6 sm-6">
          <Card title="Profile Settings">
            <form ref={formEl}>
              <Input
                onChange={handleInputChange}
                name="firstname"
                placeholder="First Name"
              />
              <Input
                onChange={handleInputChange}
                name="lastname"
                placeholder="Last Name"
              />
              <Input
                onChange={handleInputChange}
                name="username"
                placeholder="Username (required)"
              />
                <Input
                onChange={handleInputChange}
                name="Password"
                placeholder="Change Password (required)"
              />
              <Input
                onChange={handleInputChange}
                name="Email"
                placeholder="Email Address (required)"
              />
              <FormBtn
                disabled={!(userObject.username && userObject.password && userObject.email)}
                onClick={handleFormSubmit}
              >Update Profile</FormBtn>
            </form>
          </Card>
        </Col>
        <Col size="md-6 sm-6">
          <Card title="Avatar Settings">
            <form ref={avatarEl}>
              <Input 
                onChange={handleAvatarChange}
                placeholder="my style" 
                list="optStyle"
              />
                <datalist id="optStyle">
                  <option>Circle</option>
                  <option>Transparent</option>
                </datalist>
              <Input
                onChange={handleAvatarChange}
                placeholder="my top" 
                list="optTop"
              />
                <datalist id="optTop">
                  <option>No Hair</option>
                  <option>WinterHat1</option>
                </datalist>
              {(avatarEl.current !== null) ? (
              <MyAvatar
                style={avatarEl.current[0].value}
                top={avatarEl.current[1].value}
              />
              ) : (
                <MyAvatar
                  style='Transparent'
                  top='LongHairMiaWallace'
                />
              )}
            </form>
          </Card>
        </Col>
      </Row>  
    </Container>
    </>
  )
}
      


export default UserProfile;
