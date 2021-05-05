import React ,{ useState , useEffect, useRef } from "react";
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
        </Row>
        </>
  )
     function TextField({label, text, toggleEditing}) {
       return(
        <div style={{ width: '33%', padding: '10px' }}>
        <h4>{label || 'Label'}</h4>
        <div style={{ display: 'flex' }}>
          <p style={{ flexGrow: 1 }}>{text || 'Nothing yet'}</p>
          <button type='button' className='btn btn-secondary btn-sm' onClick={toggleEditing}>
            Edit
          </button>
        </div>
      </div>
    );
  }
  function TextInput({ label, saveInput, toggleEditing }) {
    const userInput = useRef();
    const handleInput = () => {
      saveInput(userInput.current.value);
      toggleEditing();
    };
    return (
      <div style={{ width: '33%', padding: '10px' }}>
     <label htmlFor={`input-${label}`}>
        <h4>{label}</h4>
      </label>
      <div class='input-group mt-5'>
        <input type='text' className='form-control' id={`input-${label}`} ref={userInput} />
        <div class='input-group-append'>
          <button className='btn btn-secondary btn-sm' onClick={handleInput}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default function EditableTextField() {
  const [favoriteFlavor, setFavoriteFlavor] = useState('Vanilla');
  const [userIsEditing, setUserIsEditing] = useState(false);
​
  const toggleEditing = () => setUserIsEditing(!userIsEditing);
  const saveInput = input => setFavoriteFlavor(input);
​
  return userIsEditing ? (
    <TextInput label='Favorite flavor' saveInput={saveInput} toggleEditing={toggleEditing} />
  ) : (
    <TextField label='Favorite flavor' text={favoriteFlavor} toggleEditing={toggleEditing} />
  );
}
      // <Col size="md-9 sm-9">
        
      //   <h2>Current Profile Settings</h2>
      //   <EditableTextField initialProperty={userObject.firstName} />
      //   <EditableTextField initialProperty={userObject.lastName} />
      //   <EditableTextField initialProperty={userObject.userName} />
      //   <EditableTextField initialProperty={userObject.email} />
      //   <EditableTextField initialProperty={userObject.password} />
      //   {/* <div> Password: </div>
      //   <div> Profile Picture: </div> */}
       
      // </Col>
}
      


export default UserProfile;
