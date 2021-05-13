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
    top: '',
    accessories: '',
   hairColor: '',
   facialHair: '',
   clothes: '',
   eyes: '',
  eyebrow: '',
  mouth: '',
  skin:''

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
                  <option>Hat</option>
                  <option>LongHairStraight</option>
                  <option>ShortHairShortFlat</option>
                  <Input
                onChange={handleAvatarChange}
                placeholder="my accessories" 
                list="optAccessories"
              />
                </datalist>
                <datalist id="optAccessories">
                  <option>Blank</option>
                  <option>Prescription01</option>
                  <option>Prescription02</option>
                  <option>Round</option>
                  <option>Sunglasses</option>
                </datalist>
                <Input
                onChange={handleAvatarChange}
                placeholder="my hair color" 
                list="optHairColor"
              />
                <datalist id="optHairColor">
                  <option>Black</option>
                  <option>BrownDark</option>
                  <option>Auburn</option>
                  <option>Blonde</option>
                  <option>Red</option>
                </datalist>
                <Input
                onChange={handleAvatarChange}
                placeholder="my facial hair" 
                list="optFacialHair"
              />
                <datalist id="optFacialHair">
                  <option>Blank</option>
                  <option>BeardMedium</option>
                  <option>BeardLight</option>
                </datalist>
                <Input
                onChange={handleAvatarChange}
                placeholder="my clothes" 
                list="optClothes"
              />
                <datalist id="optClothes">
                  <option>CollarSweater</option>
                  <option>Hoodie</option>
                  <option>ShirtCrewNeck</option>
                </datalist>
                <Input
                onChange={handleAvatarChange}
                placeholder="my eyes" 
                list="optEyes"
              />
                <datalist id="optEyes">
                  <option>Happy</option>
                </datalist>
                <Input
                onChange={handleAvatarChange}
                placeholder="my eyebrow" 
                list="optEyebrow"
              />
                <datalist id="optEyebrow">
                  <option>DefaultNatural</option>
                </datalist>
                <Input
                onChange={handleAvatarChange}
                placeholder="my mouth" 
                list="optMouth"
              />
                <datalist id="optMouth">
                  <option>Default</option>
                </datalist>
                <Input
                onChange={handleAvatarChange}
                placeholder="my skin" 
                list="optSkin"
              />
                <datalist id="optSkin">
                  <option>Tanned</option>
                  <option>Yellow</option>
                  <option>Pale</option>
                  <option>Light</option>
                  <option>Brown</option>
                  <option>DarkBrown</option>
                </datalist>
              {(avatarEl.current !== null) ? (
              <MyAvatar
                style={avatarEl.current[0].value}
                top={avatarEl.current[1].value}
                accessories={avatarEl.current[2].value}
                hairColor={avatarEl.current[3].value}
                facialHair={avatarEl.current[4].value}
                clothes={avatarEl.current[5].value}
                eyes={avatarEl.current[6].value}
                eyebrow={avatarEl.current[7].value}
                mouth={avatarEl.current[8].value}
                skin={avatarEl.current[9].value}
                
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
