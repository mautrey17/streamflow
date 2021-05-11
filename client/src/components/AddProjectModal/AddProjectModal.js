import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Input, TextArea, FormBtn } from "../../components/Form";
import AUTH from '../../utils/AUTH';
import API from "../../utils/API";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "500px",
    height: "500px"
  }
};

function AddProjectModal(props) {
  const [formObject, setFormObject] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userList, setUserList] = useState([]);
  const formEl = useRef(null);
  const [addUsers, setAddUsers] = useState([]);

  useEffect(() => {
    AUTH.getUser().then(res => {
      setUserInfo(res.data.user);
    });
    API.getUsers().then(res => {
      setUserList(res.data);
    })
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function handleSelectedUser(options) {
    let userArray = [];
    options.map(user => {
      userArray.push(user.value);
    })
    setAddUsers(userArray);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      API.saveProject({
        title: formObject.title,
        dueDate: formObject.date,
        assignedUsers: addUsers,
        owner: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          username: userInfo.username,
          id: userInfo._id
        }
      })
        .then(res => {
          formEl.current.reset();
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  // function dateToLocalTZ(date) {
  //   const x = date.toString();
  //   let y = x.substring(0, 4);
  //   let m = parseInt(x.substring(5, 7)) - 1;
  //   let d = x.substring(8, 10);
  //   console.log(`date: ${date}, x: ${x}, y: ${y}, m: ${m}, d: ${d}`)
  //   const newDate = new Date(y, m, d);
  //   return newDate.toISOString();
  // }

  return (
    <div>
      <li className="has-background-success mt-4"><a className="has-text-white" href="#" onClick={props.openModal}>Create a Project<i className="fas fa-plus ml-2"/></a></li>
      <Modal
        isOpen={props.modalIsOpen}
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="New Project Modal"
      >

        <h2>Enter Project Information</h2>
        <form ref={formEl}>
          <Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title (required)"
          />
          <DatePicker 
            selected={formObject.date}
            onChange={date => setFormObject({...formObject, date: date})}
            className="form-control mb-2"
            placeholderText="Due date (required)"
          />
          <div>
            Assign user(s)
            <Select 
              options={userList.map(users => (
                {value: users._id, label: users.username}
              ))} 
              isMulti
              onChange={handleSelectedUser}
            />
          </div>
          <hr />
          <FormBtn
            disabled={!formObject.title}
            onClick={handleFormSubmit}
          >
            Submit Project
          </FormBtn>
        </form>
      </Modal>
    </div>
  );
}

export default AddProjectModal;