import React, { useState, useEffect, useRef } from "react";
import MyAvatar from "../../components/Avatar"
import { Input } from "../../components/Form";
import Axios from "axios";
import API from "../../utils/API";
import { Box, Columns } from "react-bulma-components";
import Select from "react-select";

function UserProfile() {
  let userId;
  const formEl = useRef(null);
  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: ''
  });

  const [avatarObject, setAvatarObject] = useState({
    style: '',
    top: '',
    accessories: '',
    hairColor: '',
    facialHair: '',
    facialColor: '',
    clothes: '',
    clotheColor: '',
    eyes: '',
    eyebrow: '',
    mouth: '',
    skin: ''
  });

  useEffect(() => {
    Axios.get("/auth/user/ ").then(res => {
      setUserObject({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        username: res.data.user.username
      });
      API.getOneUser(res.data.user._id).then(res => {
        let avatar = {};
        avatar.style = res.data[0].avatar.style;
        avatar.top = res.data[0].avatar.top;
        avatar.accessories = res.data[0].avatar.accessories;
        avatar.hairColor = res.data[0].avatar.hairColor;
        avatar.facialHair = res.data[0].avatar.facialHair;
        avatar.facialColor = res.data[0].avatar.facialColor;
        avatar.clothes = res.data[0].avatar.clothes;
        avatar.clotheColor = res.data[0].avatar.clotheColor;
        avatar.eyes = res.data[0].avatar.eyes;
        avatar.eyebrow = res.data[0].avatar.eyebrow;
        avatar.mouth = res.data[0].avatar.mouth;
        avatar.skin = res.data[0].avatar.skin;
        setAvatarObject(avatar);
      })
    })
  }, [])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserObject({ ...userObject, [name]: value })
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    Axios.get("/auth/user/ ").then(res => {
      userId = res.data.user._id
      API.updateUser(
        userId,
        {
          firstName: userObject.firstName,
          lastName: userObject.lastName,
          username: userObject.username,
          password: userObject.password,
          avatar: {
            style: avatarObject.style,
            top: avatarObject.top,
            accessories: avatarObject.accessories,
            hairColor: avatarObject.hairColor,
            facialHair: avatarObject.facialHair,
            facialColor: avatarObject.facialColor,
            clothes: avatarObject.clothes,
            clotheColor: avatarObject.clotheColor,
            eyes: avatarObject.eyes,
            eyebrow: avatarObject.eyebrow,
            mouth: avatarObject.mouth,
            skin: avatarObject.skin
          }
        }
      )
        .then(res => {
          window.location.reload();
        })
    })
  }

  return (
    <div style={{ minHeight: "90vh" }}>
      <div className="block">
        <h1 className="mt-3 mb-3 title is-1 has-text-centered">User Profile</h1>
      </div>
      <Columns>
        <Columns.Column size="6">
          <Box style={{ backgroundColor: "#efefef" }} className=" ml-6 mr-6" title="Profile Settings">
            <h2 className="title is-3 has-text-centered">Profile Settings</h2>
            <form ref={formEl}>
              <Input
                value={userObject.firstName}
                onChange={handleInputChange}
                name="firstName"
                placeholder="First Name"
                label="First Name:"
              />
              <Input
                value={userObject.lastName}
                onChange={handleInputChange}
                name="lastName"
                placeholder="Last Name"
                label="Last Name:"
              />
              <Input
                value={userObject.username}
                onChange={handleInputChange}
                name="username"
                placeholder="Username (required)"
                label="Username:"
              />
              <Input
                onChange={handleInputChange}
                name="password"
                placeholder="Change Password"
                label="Change Password:"
              />
              <div class="field">
                <div class="buttons is-centered">
                  <button className="mt-3 button is-success" onClick={handleFormSubmit}>Update Profile</button>
                </div>
              </div>

            </form>
          </Box>
        </Columns.Column>
        <Columns.Column size="md-6 sm-6">

          <Box className="ml-6 mr-6" title="Avatar Settings" style={{ backgroundColor: "#efefef" }}>
            <h2 className="title is-3 has-text-centered">Avatar Settings</h2>
            <div className="columns">
              <div className="column">
                <h6>Style</h6>
                <Select
                  onChange={option => { setAvatarObject({ ...avatarObject, style: option.value }) }}
                  value={{ value: avatarObject.style, label: avatarObject.style }}
                  name="style"
                  placeholder="Style"
                  options={([
                    { value: "Circle", label: "Circle" },
                    { value: "Transparent", label: "Transparent" }
                  ])}
                />
              </div>
              <div className="column">
                <h6>Accessories</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, accessories: option.value })}
                  name="accessories"
                  value={{ value: avatarObject.accessories, label: avatarObject.accessories }}
                  placeholder="Accessories"
                  options={[
                    { value: "Blank", label: "Blank" },
                    { value: "Prescription01", label: "Prescription01" },
                    { value: "Prescription02", label: "Prescription02" },
                    { value: "Round", label: "Round" },
                    { value: "Sunglasses", label: "Sunglasses" },
                    { value: "Wayfarers", label: "Wayfarers" }
                  ]}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <h6>Top</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, top: option.value })}
                  value={{ value: avatarObject.top, label: avatarObject.top }}
                  name="top"
                  placeholder="Top"
                  options={([
                    { value: "NoHair", label: "NoHair" },
                    { value: "Eyepatch", label: "Eyepatch" },
                    { value: "Hat", label: "Hat" },
                    { value: "Hijab", label: "Hijab" },
                    { value: "Turban", label: "Turban" },
                    { value: "WinterHat1", label: "WinterHat1" },
                    { value: "LongHairBigHair", label: "LongHairBigHair" },
                    { value: "LongHairBob", label: "LongHairBob" },
                    { value: "LongHairBun", label: "LongHairBun" },
                    { value: "LongHairCurly", label: "LongHairCurly" },
                    { value: "LongHairCurvy", label: "LongHairCurvy" },
                    { value: "LongHairFrida", label: "LongHairFrida" },
                    { value: "LongHairFro", label: "LongHairFro" },
                    { value: "LongHairFroBand", label: "LongHairFroBand" },
                    { value: "LongHairNotTooLong", label: "LongHairNotTooLong" },
                    { value: "LongHairShavedSides", label: "LongHairShavedSides" },
                    { value: "LongHairMiaWallace", label: "LongHairMiaWallace" },
                    { value: "LongHairStraight", label: "LongHairStraight" },
                    { value: "LongHairStraightStrand", label: "LongHairStraightStrand" },
                    { value: "LongHairDreads", label: "LongHairDreads" },
                    { value: "ShortHairDreads01", label: "ShortHairDreads01" },
                    { value: "ShortHairDreads02", label: "ShortHairDreads02" },
                    { value: "ShortHairFrizzle", label: "ShortHairFrizzle" },
                    { value: "ShortHairShaggyMullet", label: "ShortHairShaggyMullet" },
                    { value: "ShortHairShortCurly", label: "ShortHairShortCurly" },
                    { value: "ShortHairShortRound", label: "ShortHairShortRound" },
                    { value: "ShortHairShortFlat", label: "ShortHairShortFlat" },
                    { value: "ShortHairShortWaved", label: "ShortHairShortWaved" },
                    { value: "ShortHairSides", label: "ShortHairSides" },
                    { value: "ShortHairTheCaesar", label: "ShortHairTheCaesar" },
                    { value: "ShortHairTheCaesarSidePart", label: "ShortHairTheCaesarSidePart" }
                  ])}
                />
              </div>
              <div className="column">
                <h6>Hair Color</h6>
                <Select
                  isDisabled={avatarObject.top === "NoHair" || avatarObject.top === "Eyepatch" || avatarObject.top === "Hat" || avatarObject.top === "Hijab" || avatarObject.top === "Turban" || avatarObject.top === "WinterHat1"}
                  onChange={option => setAvatarObject({ ...avatarObject, hairColor: option.value })}
                  value={{ value: avatarObject.hairColor, label: avatarObject.hairColor }}
                  name="hairColor"
                  placeholder="Hair Color"
                  options={[
                    { value: "Black", label: "Black" },
                    { value: "BrownDark", label: "BrownDark" },
                    { value: "Auburn", label: "Auburn" },
                    { value: "Blonde", label: "Blonde" },
                    { value: "Red", label: "Red" }
                  ]}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <h6>Facial Hair</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, facialHair: option.value })}
                  value={{ value: avatarObject.facialHair, label: avatarObject.facialHair }}
                  name="facialHair"
                  placeholder="Facial Hair"
                  options={[
                    { value: "Blank", label: "Blank" },
                    { value: "BeardMedium", label: "BeardMedium" },
                    { value: "BeardLight", label: "BeardLight" },
                    { value: "BeardMajestic", label: "BeardMajestic" },
                    { value: "MoustacheFancy", label: "MoustacheFancy" },
                    { value: "MoustacheMagnum", label: "MoustacheMagnum" }
                  ]}
                />
              </div>
              <div className="column">
                <h6>Facial Color</h6>
                <Select
                  isDisabled={avatarObject.facialHair === "Blank"}
                  onChange={option => setAvatarObject({ ...avatarObject, facialColor: option.value })}
                  value={{ value: avatarObject.facialColor, label: avatarObject.facialColor }}
                  name="facialColor"
                  placeholder="Facial Hair Color"
                  options={[
                    { value: "Black", label: "Black" },
                    { value: "BrownDark", label: "BrownDark" },
                    { value: "Auburn", label: "Auburn" },
                    { value: "Blonde", label: "Blonde" },
                    { value: "Red", label: "Red" }
                  ]}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <h6>Clothes</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, clothes: option.value })}
                  value={{ value: avatarObject.clothes, label: avatarObject.clothes }}
                  name="clothes"
                  placeholder="My Clothes"
                  options={[
                    { value: "BlazerShirt", label: "BlazerShirt" },
                    { value: "BlazerSweater", label: "BlazerSweater" },
                    { value: "CollarSweater", label: "CollarSweater" },
                    { value: "GraphicShirt", label: "GraphicShirt" },
                    { value: "Overall", label: "Overall" },
                    { value: "ShirtScoopNeck", label: "ShirtScoopNeck" },
                    { value: "ShirtVNeck", label: "ShirtVNeck" },
                    { value: "Hoodie", label: "Hoodie" },
                    { value: "ShirtCrewNeck", label: "ShirtCrewNeck" }
                  ]}
                />
              </div>
              <div className="column">
                <h6>Clothe Color</h6>
                <Select
                  isDisabled={avatarObject.clothes === "BlazerShirt" || avatarObject.clothes === "BlazerSweater"}
                  onChange={option => setAvatarObject({ ...avatarObject, clotheColor: option.value })}
                  value={{ value: avatarObject.clotheColor, label: avatarObject.clotheColor }}
                  name="clotheColor"
                  placeholder="My Clothe Color"
                  options={[
                    { value: "Black", label: "Black" },
                    { value: "Blue01", label: "Blue01" },
                    { value: "Blue02", label: "Blue02" },
                    { value: "Blue03", label: "Blue03" },
                    { value: "Gray01", label: "Gray01" },
                    { value: "Gray02", label: "Gray02" },
                    { value: "Heather", label: "Heather" },
                    { value: "PastelBlue", label: "PastelBlue" },
                    { value: "PastelGreen", label: "PastelGreen" },
                    { value: "PastelOrange", label: "PastelOrange" },
                    { value: "PastelRed", label: "PastelRed" },
                    { value: "PastelYellow", label: "PastelYellow" },
                    { value: "Pink", label: "Pink" },
                    { value: "Red", label: "Red" },
                    { value: "White", label: "White" }
                  ]}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <h6>Eyes</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, eyes: option.value })}
                  value={{ value: avatarObject.eyes, label: avatarObject.eyes }}
                  name="eyes"
                  placeholder="My Eyes"
                  options={[
                    { value: "Close", label: "Close" },
                    { value: "Cry", label: "Cry" },
                    { value: "Default", label: "Default" },
                    { value: "Dizzy", label: "Dizzy" },
                    { value: "EyeRoll", label: "EyeRoll" },
                    { value: "Happy", label: "Happy" },
                    { value: "Hearts", label: "Hearts" },
                    { value: "Side", label: "Side" },
                    { value: "Squint", label: "Squint" },
                    { value: "Surprised", label: "Surprised" },
                    { value: "Wink", label: "Wink" },
                    { value: "WinkWacky", label: "WinkWacky" }
                  ]}
                />
              </div>
              <div className="column">
                <h6>Eyebrow</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, eyebrow: option.value })}
                  value={{ value: avatarObject.eyebrow, label: avatarObject.eyebrow }}
                  name="eyebrow"
                  placeholder="My Eyebrow"
                  options={[
                    { value: "Angry", label: "Angry" },
                    { value: "AngryNatural", label: "AngryNatural" },
                    { value: "Default", label: "Default" },
                    { value: "DefaultNatural", label: "DefaultNatural" },
                    { value: "FlatNatural", label: "FlatNatural" },
                    { value: "RaisedExcited", label: "RaisedExcited" },
                    { value: "RaisedExcitedNatural", label: "RaisedExcitedNatural" },
                    { value: "SadConcerned", label: "SadConcerned" },
                    { value: "SadConcernedNatural", label: "SadConcernedNatural" },
                    { value: "UnibrownNatural", label: "UnibrownNatural" },
                    { value: "UpDown", label: "UpDown" },
                    { value: "UpDownNatural", label: "UpDownNatural" }
                  ]}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <h6>Skin</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, skin: option.value })}
                  value={{ value: avatarObject.skin, label: avatarObject.skin }}
                  name="skin"
                  placeholder="My skin"
                  options={[
                    { value: "Tanned", label: "Tanned" },
                    { value: "Yellow", label: "Yellow" },
                    { value: "Pale", label: "Pale" },
                    { value: "Light", label: "Light" },
                    { value: "Brown", label: "Brown" },
                    { value: "DarkBrown", label: "DarkBrown" },
                    { value: "Black", label: "Black" }
                  ]}
                />
              </div>
              <div className="column">
                <h6>Mouth</h6>
                <Select
                  onChange={option => setAvatarObject({ ...avatarObject, mouth: option.value })}
                  value={{ value: avatarObject.mouth, label: avatarObject.mouth }}
                  name="mouth"
                  placeholder="My Mouth"
                  options={[
                    { value: "Concerned", label: "Concerned" },
                    { value: "Default", label: "Default" },
                    { value: "Disbelief", label: "Disbelief" },
                    { value: "Eating", label: "Eating" },
                    { value: "Grimace", label: "Grimace" },
                    { value: "Sad", label: "Sad" },
                    { value: "ScreamOpen", label: "ScreamOpen" },
                    { value: "Serious", label: "Serious" },
                    { value: "Smile", label: "Smile" },
                    { value: "Tongue", label: "Tongue" },
                    { value: "Twinkle", label: "Twinkle" },
                    { value: "Vomit", label: "Vomit" }
                  ]}
                />
              </div>
            </div>
            <div className="has-text-centered">
              <MyAvatar
                style={avatarObject.style}
                top={avatarObject.top}
                accessories={avatarObject.accessories}
                hairColor={avatarObject.hairColor}
                facialHair={avatarObject.facialHair}
                facialColor={avatarObject.facialColor}
                clothes={avatarObject.clothes}
                clotheColor={avatarObject.clotheColor}
                eyes={avatarObject.eyes}
                eyebrow={avatarObject.eyebrow}
                mouth={avatarObject.mouth}
                skin={avatarObject.skin}
              />

            </div>
            <div class="field">
              <div class="buttons is-centered">
                <button className="mt-3 button is-success" onClick={handleFormSubmit}>Update Avatar</button>
              </div>
            </div>
          </Box>
        </Columns.Column>
      </Columns>
    </div>

  )
}

export default UserProfile;