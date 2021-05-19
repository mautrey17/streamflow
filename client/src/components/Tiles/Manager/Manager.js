import React, { useState, useEffect } from "react";

function Manager(props) {
  const [avatar, setAvatar] = useState('https://avataaars.io/?')
  const [owner, setOwner] = useState({
    username: "",
    avatar: {
      style: "",
      top: "",
      accessories: "",
      hairColor: "",
      facialHair: "",
      facialColor: "",
      clothes: "",
      eyes: "",
      eyebrow: "",
      mouth: "",
      skin: ""
    }
  })

  useEffect(() => {
    if (props.manager) {
      setOwner(props.manager);
      loadAvatar(props.manager);
    }
  }, [props.manager])

  function loadAvatar(user) {
    let avatarSettings = 'https://avataaars.io/?';
    
    if (user.avatar) {
      if (user.avatar.style) {
        avatarSettings += 'avatarStyle=' + user.avatar.style
      }
      if (user.avatar.top) {
        avatarSettings += '&topType=' + user.avatar.top
      }
      if (user.avatar.accessories) {
        avatarSettings += '&accessoriesType=' + user.avatar.accessories
      }
      if (user.avatar.hairColor) {
        avatarSettings += '&hairColor=' + user.avatar.hairColor
      }
      if (user.avatar.facialHair) {
        avatarSettings += '&facialHairType=' + user.avatar.facialHair
      }
      if (user.avatar.facialColor) {
        avatarSettings += '&facialHairColor=' + user.avatar.facialColor
      }
      if (user.avatar.clothes) {
        avatarSettings += '&clotheType=' + user.avatar.clothes
      }
      if (user.avatar.eyes) {
        avatarSettings += '&eyeType=' + user.avatar.eyes
      }
      if (user.avatar.eyebrow) {
        avatarSettings += '&eyebrowType=' + user.avatar.eyebrow
      }
      if (user.avatar.mouth) {
        avatarSettings += '&mouthType=' + user.avatar.mouth
      }
      if (user.avatar.skin) {
        avatarSettings += '&skinColor=' + user.avatar.skin
      }
      setAvatar(avatarSettings)
    }
  }

  return (
      <div className="tile is-parent">
        <article className="tile is-child notification is-primary">
            <p className="title">Manager
            {owner.username && <img src={avatar} width="100px" style={{float: "right"}}/>}</p>
            <p className="subtitle">{owner.username && owner.username}</p>
        </article>
      </div>
  )
}

export default Manager;