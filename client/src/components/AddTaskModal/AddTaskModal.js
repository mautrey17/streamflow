import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { Input, FormBtn } from "../../components/Form";
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
    marginTop: '5%',
    transform: 'translate(-50%, -50%)',
    width: "500px",
    height: "700px"
  }
};

function AddTaskModal(props) {
  const [formObject, setFormObject] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const formEl = useRef(null);
  const [projectList, setProjectList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [projectIndex, setProjectIndex] = useState("");
  

  function setInfo() {
    setUserInfo(props.currentUser);
    setProjectList(props.projects);

    // Automatically sets project name if selected in project page
    if (props.selectedProject) {
      let x = {
        value: {
          owner: {
            id: props.selectedProject.owner._id
          },
          _id: props.selectedProject.id,
          assignedUsers: props.selectedProject.assignedUsers
        }
      }
      setProjectIndex(props.selectedProject.selected)
      handleSelectedProj(x);
    }
  }

  // Clears formObject after the modal is closed
  function clearForm() {
    setFormObject({});
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function handleSelectedUser(options) {
    let userArray = [];
    options.forEach(user => {
      userArray.push(user.value);
    })
    setFormObject({ ...formObject, users: userArray});
  }

  function handleSelectedProj(option) {
    setFormObject({ ...formObject, project: option.value._id})

    // Allows it so only users associated with the selected project are shown
    let userArray = [];
    props.users.forEach(user => {
      if (option.value.owner.id === user._id) {
        userArray.push(user)
      }
      option.value.assignedUsers.forEach(projUser => {
        if (user._id === projUser) {
          if (!userArray.some(x => x._id === projUser)) {
            userArray.push(user)
          }
        }
      })
    })
    setFilteredUsers(userArray);
    console.log(filteredUsers);
  }

  function handleSelectedUrgency(option) {
    setFormObject({ ...formObject, urgency: option.value})
  }

  function handleSelectedStatus(option) {
    setFormObject({ ...formObject, status: option.value})
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.date) {
      API.saveTask({
        title: formObject.title,
        dueDate: formObject.date,
        project: formObject.project,
        assignedUsers: formObject.users,
        urgency: formObject.urgency,
        status: formObject.status,
        owner: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          username: userInfo.username,
          id: userInfo._id
        }
      })
        .then(res => {
          formEl.current.reset();
          if (projectIndex !== "") window.open(window.location.origin + "/project/" + projectIndex, "_self");
          else window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className>
      <li className="has-background-success"><a className="has-text-white" href="#" onClick={props.openModal}>Create a Task<i className="fas fa-plus ml-2"/></a></li>
      <Modal
        isOpen={props.modalIsOpen}
        onAfterOpen={setInfo}
        onRequestClose={props.closeModal}
        onAfterClose={clearForm}
        style={customStyles}
        contentLabel="New Task Modal"
      >

        <h2>Enter Task Information</h2>
        <form ref={formEl}>
          <div>
            Select Project for Task
            <Select 
              defaultValue={props.selectedProject &&
                {value: props.selectedProject._id, label: props.selectedProject.title}
              }
              options={projectList ? projectList.map(proj => (
                {value: proj, label: proj.title}
              )) : ""}
              onChange={handleSelectedProj}
            />
          </div>
          <br />
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
              options={filteredUsers.map(users => (
                {value: users._id, label: users.username}
              ))} 
              isMulti
              onChange={handleSelectedUser}
              isDisabled={!formObject.project}
            />
          </div>
          <br />
          <div>
            Set Urgency
            <Select 
              options=
                {[
                  {value: "low", label: "Low"},
                  {value: "medium", label: "Medium"},
                  {value: "high", label: "High"},
                  {value: "urgent", label: "Urgent"}
                ]}
              onChange={handleSelectedUrgency}
            />
          </div>
          <br />
          <div>
            Set Status
            <Select 
              options=
                {[
                  {value: "toDo", label: "To Do"},
                  {value: "inProgress", label: "In Progress"},
                  {value: "completed", label: "Completed"}
                ]}
              onChange={handleSelectedStatus}
            />
          </div>
          <br />
          <hr />
          <FormBtn
            disabled={!formObject.title}
            onClick={handleFormSubmit}
          >
            Submit Task
          </FormBtn>
        </form>
      </Modal>
    </div>
  );
}

export default AddTaskModal;