import Avatar from 'avataaars'
import * as React from 'react'
export default function MyAvatar (props){
    return (
        <Avatar
          style={{width: '100px', height: '100px'}}
          avatarStyle={props.style}
          topType={props.top}
          accessoriesType={props.accessories}
          hairColor={props.hairColor}
          facialHairType={props.facialHair}
          facialHairColor={props.facialColor}
          clotheType={props.clothes}
          eyeType={props.eyes}
          eyebrowType={props.eyebrow}
          mouthType={props.mouth}
          skinColor={props.skin}
        />
    )
}