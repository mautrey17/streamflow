import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Input, TextArea, FormBtn } from "../../components/Form";
import AUTH from '../../utils/AUTH';
import API from "../../utils/API";
import Select from 'react-select'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "500px",
    height: "700px"
  }
};

function AddTaskModal(props) {
  const [formObject, setFormObject] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userList, setUserList] = useState([]);
  const formEl = useRef(null);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    AUTH.getUser().then(res => {
      setUserInfo(res.data.user);
    });
    API.getUsers().then(res => {
      setUserList(res.data);
    })
    API.getProjects().then(res => {
      setProjectList(res.data.projects);
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
    setFormObject({ ...formObject, users: userArray});
  }

  function handleSelectedProj(option) {
    setFormObject({ ...formObject, project: option.value})
  }

  function handleSelectedUrgency(option) {
    setFormObject({ ...formObject, urgency: option.value})
  }

  function handleSelectedStatus(option) {
    setFormObject({ ...formObject, status: option.value})
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.dueDate) {
      API.saveTask({
        title: formObject.title,
        dueDate: dateToLocalTZ(formObject.dueDate),
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
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  function dateToLocalTZ(date) {
    const x = date.toString();
    let y = x.substring(0, 4);
    let m = parseInt(x.substring(5, 7)) - 1;
    let d = x.substring(8, 10);
    console.log(`date: ${date}, x: ${x}, y: ${y}, m: ${m}, d: ${d}`)
    const newDate = new Date(y, m, d);
    return newDate.toISOString();
  }

  return (
    <div>
      <button onClick={props.openModal}>Create a Task</button>
      <Modal
        isOpen={props.modalIsOpen}
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="New Task Modal"
      >

        <h2>Enter Task Information</h2>
        <form ref={formEl}>
          <div>
            Select Project for Task
            <Select 
              options={projectList.map(proj => (
                {value: proj._id, label: proj.title}
              ))}
              onChange={handleSelectedProj}
            />
          </div>
          <br />
          <Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title (required)"
          />
          <Input
            onChange={handleInputChange}
            name="dueDate"
            placeholder="Due Date (YYYY-MM-DD)"
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
                  {value: "onTrack", label: "On Track"},
                  {value: "potentialDelays", label: "Potential Delays"},
                  {value: "delayed", label: "Delayed"},
                  {value: "stuck", label: "Stuck"},
                  {value: "finished", label: "Finished"}
                ]}
              onChange={handleSelectedStatus}
            />
          </div>
          <br />
          <hr />
          <FormBtn
            disabled={!(formObject.dueDate && formObject.title)}
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