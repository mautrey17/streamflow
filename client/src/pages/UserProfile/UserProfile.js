import React ,{ useState , useEffect, useRef } from "react";
import { Card } from "../../components/Card";
import MyAvatar from "../../components/Avatar"
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Axios from "axios";
import API from "../../utils/API";

function UserProfile() {
  let userId;
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
    Style: '',
    top: '',
    accessories: '',
    hairColor: '',
    facialHair: '',
    facialColor: '',
    clothes: '',
    eyes: '',
    eyebrow: '',
    mouth: '',
    skin:''
  });

  useEffect(() => {
    Axios.get("/auth/user/ ").then(res => {
      // console.log('useEffect',res.data)
      formEl.current[0].value=res.data.user.firstName
      formEl.current[1].value=res.data.user.lastName
      formEl.current[2].value=res.data.user.username
      formEl.current[3].value=res.data.user.password
      formEl.current[4].value=res.data.user.email
      API.getUsers().then(res => {
        console.log('useEffect res',res.data)
        avatarEl.current[0].value=res.data[0].avatar.style
        avatarEl.current[1].value=res.data[0].avatar.top
        avatarEl.current[2].value=res.data[0].avatar.accessories
        avatarEl.current[3].value=res.data[0].avatar.hairColor
        avatarEl.current[4].value=res.data[0].avatar.facialHair
        avatarEl.current[5].value=res.data[0].avatar.facialColor
        avatarEl.current[6].value=res.data[0].avatar.clothes
        avatarEl.current[7].value=res.data[0].avatar.eyes
        avatarEl.current[8].value=res.data[0].avatar.eyebrow
        avatarEl.current[9].value=res.data[0].avatar.mouth
        avatarEl.current[10].value=res.data[0].avatar.skin
        setAvatarObject({...avatarObject})
        console.log('avatarObject',avatarObject)
      })
    })
  }, [])

  function handleInputChange(event){
    const { name, value } = event.target;
    setUserObject({...userObject, [name ]: value})
  };

  function handleAvatarChange(event){
    const { name, value } = event.target;
    setAvatarObject({...avatarObject, [name ]: value})
    console.log('change',avatarObject)
  };

  function handleFormSubmit(event){
    event.preventDefault();
    Axios.get("/auth/user/ ").then(res => {
      console.log('user id',res.data.user._id)
      userId=res.data.user._id
      console.log('update user', userId)
      // if(userObject.username && userObject.password){
      if (formEl.current[2].value && formEl.current[3].value ){
        API.updateUser(
          userId,
          {
            firstName: formEl.current[0].value,
            lastName: formEl.current[1].value,
            username: formEl.current[2].value,
            password: formEl.current[3].value,
            email: formEl.current[4].value,
            avatar: {
              style: avatarEl.current[0].value,
              top: avatarEl.current[1].value,
              accessories: avatarEl.current[2].value,
              hairColor: avatarEl.current[3].value,
              facialHair: avatarEl.current[4].value,
              facialColor: avatarEl.current[5].value,
              clothes: avatarEl.current[6].value,
              eyes: avatarEl.current[7].value,
              eyebrow: avatarEl.current[8].value,
              mouth: avatarEl.current[9].value,
              skin: avatarEl.current[10].value
            }
          }
        )
        .then(res => {
          console.log('User has been updated')
        })
      }
    })
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
                placeholder="Email Address"
              />
              <FormBtn
                // disabled={!(userObject.username && userObject.password)}
                // disabled={!(formEl.current[2].value && formEl.current[3].value)}
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
                name="Style"
                placeholder="my style" 
                list="optStyle"
              />
              <datalist id="optStyle">
                <option>Circle</option>
                <option>Transparent</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="top"
                placeholder="my top" 
                list="optTop"
              />
              <datalist id="optTop">
                <option>No Hair</option>
                <option>Eyepatch</option>
                <option>Hat</option>
                <option>Hijab</option>
                <option>Turban</option>
                <option>WinterHat1</option>
                <option>LongHairBigHair</option>
                <option>LongHairBob</option>
                <option>LongHairBun</option>
                <option>LongHairCurly</option>
                <option>LongHairCurvy</option>
                <option>LongHairFrida</option>
                <option>LongHairFro</option>
                <option>LongHairFroBand</option>
                <option>LongHairNotTooLong</option>
                <option>LongHairShavedSides</option>
                <option>LongHairMiaWallace</option>
                <option>LongHairStraight</option>
                <option>LongHairStraightStrand</option>
                <option>LongHairDreads01</option>
                <option>LongHairFrizzle</option>
                <option>LongHairShaggyMullet</option>
                <option>LongHairShortCurly</option>
                <option>LongHairShortRound</option>
                <option>ShortHairShortFlat</option>
                <option>ShortHairShortWaved</option>
                <option>ShortHairSides</option>
                <option>ShortHairTheCaesar</option>
                <option>ShortHairTheCaesarSidePart</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="accessories"
                placeholder="my accessories" 
                list="optAccessories"
              />
              <datalist id="optAccessories">
                <option>Blank</option>
                <option>Prescription01</option>
                <option>Prescription02</option>
                <option>Round</option>
                <option>Sunglasses</option>
                <option>Wayfarers</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="hairColor"
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
                name="facialHair"
                placeholder="my facial hair" 
                list="optFacialHair"
              />
              <datalist id="optFacialHair">
                <option>Blank</option>
                <option>BeardMedium</option>
                <option>BeardLight</option>
                <option>BeardMajestic</option>
                <option>MoustacheFancy</option>
                <option>MoustacheMagnum</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="facialColor"
                placeholder="my facial hair color" 
                list="optFaceHairColor"
              />
              <datalist id="optFaceHairColor">
                <option>Black</option>
                <option>BrownDark</option>
                <option>Auburn</option>
                <option>Blonde</option>
                <option>Red</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="clothes"
                placeholder="my clothes" 
                list="optClothes"
              />
              <datalist id="optClothes">
                <option>BlazerShirt</option>
                <option>BlazerSweater</option>
                <option>CollarSweater</option>
                <option>GraphicShirt</option>
                <option>Overall</option>
                <option>ShirtScoopNeck</option>
                <option>ShirtVNeck</option>
                <option>Hoodie</option>
                <option>ShirtCrewNeck</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="eyes"
                placeholder="my eyes" 
                list="optEyes"
              />
              <datalist id="optEyes">
                <option>Close</option>
                <option>Cry</option>
                <option>Default</option>
                <option>Dizzy</option>
                <option>EyeRoll</option>
                <option>Happy</option>
                <option>Hearts</option>
                <option>Side</option>
                <option>Squint</option>
                <option>Surprised</option>
                <option>Wink</option>
                <option>WinkWacky</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="eyebrow"
                placeholder="my eyebrow" 
                list="optEyebrow"
              />
              <datalist id="optEyebrow">
                <option>Angry</option>
                <option>AngryNatural</option>
                <option>Default</option>
                <option>DefaultNatural</option>
                <option>FlatNatural</option>
                <option>RaisedExcited</option>
                <option>RaisedExcitedNatural</option>
                <option>SadConcerned</option>
                <option>SadConcernedNatural</option>
                <option>UnibrownNatural</option>
                <option>UpDown</option>
                <option>UpDownNatural</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="mouth"
                placeholder="my mouth" 
                list="optMouth"
              />
              <datalist id="optMouth">
                <option>Concerned</option>
                <option>Default</option>
                <option>Disbelief</option>
                <option>Eating</option>
                <option>Grimace</option>
                <option>Sad</option>
                <option>ScreamOpen</option>
                <option>Serious</option>
                <option>Smile</option>
                <option>Tongue</option>
                <option>Twinkle</option>
                <option>Vomit</option>
              </datalist>
              <Input
                onChange={handleAvatarChange}
                name="skin"
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
                <option>Black</option>
              </datalist>
              {(avatarEl.current !== null) ? (
              <MyAvatar
                Style={avatarEl.current[0].value}
                top={avatarEl.current[1].value}
                accessories={avatarEl.current[2].value}
                hairColor={avatarEl.current[3].value}
                facialHair={avatarEl.current[4].value}
                facialColor={avatarEl.current[5].value}
                clothes={avatarEl.current[6].value}
                eyes={avatarEl.current[7].value}
                eyebrow={avatarEl.current[8].value}
                mouth={avatarEl.current[9].value}
                skin={avatarEl.current[10].value}
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