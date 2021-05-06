import React ,{ useState , useEffect, useRef } from "react";
import Nav from "../../components/Nav";
import { Card } from "../../components/Card";

import { Col, Row, Container } from "../../components/Grid";
import SignupForm from "../Auth/SignupForm";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
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
  

  useEffect(() => {
  Axios.get("/auth/user/ ")
  }, [])

  function handleInputChange(event){
    const { name, value } = event.target;
    setUserObject({...userObject, [name]: value})
  };

  function handleFormSubmit(event){
    event.preventDefault();
    if(userObject.username && userObject.password && userObject.email){

    }
  }
  return (
    <>
      <Nav />
    <Container fluid>
      <Row>
        <Col size="md-6 sm-6">
          <Card title="Profile Settings">
            <form ref={formEl}>
           
                <Input
                  onChange={handleInputChange}
                  name="firstname"
                  placeholder="First Name (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="lastname"
                  placeholder="Last Name (required)"
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
                <Input
                  onChange={handleInputChange}
                  name="profilepic"
                  placeholder="Profile Picture (optional)"
                />
          <FormBtn
                  disabled={!(userObject.username && userObject.password && userObject.email)}
                  onClick={handleFormSubmit}
                ></FormBtn>
          </form>
          </Card>
        </Col>
        </Row>
        
        </Container>
        </>
  )
}
      


export default UserProfile;
