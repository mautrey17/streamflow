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
          facialHair={props.facialHair}
          clothes={props.clothes}
          eyeType={props.eyes}
          eyebrowType={props.eyebrow}
          mouthType={props.mouth}
          skinColor={props.skin}

          
          // avatarStyle='Circle'
          // topType='LongHairMiaWallace'
          // accessoriesType='Prescription02'
          // hairColor='BrownDark'
          // facialHairType='Blank'
          // clotheType='Hoodie'
          // clotheColor='PastelBlue'
          // eyeType='Happy'
          // eyebrowType='Default'
          // mouthType='Smile'
          // skinColor='Light'
        />
    )
}