import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { Input } from "../../components/Form";
import API from "../../utils/API";

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

function DeleteProjectModal(props) {
  const formEl = useRef(null);
  const [projNameForm, setProjNameForm] = useState("")

  function handleFormSubmit(event) {
    event.preventDefault();
    API.deleteProject(props.project.id)
      .then(window.location.reload())
      .catch(err => console.log(err));
  };

  function clearProjName() {
    setProjNameForm("")
  }

  return (
    <>
      <a href="#" onClick={props.openDelModal}><i className="fa fa-trash" /></a>
      <Modal
        isOpen={props.delModalIsOpen}
        onRequestClose={props.closeDelModal}
        style={customStyles}
        contentLabel="Delete Project Modal"
        onAfterClose={clearProjName}
      >
        
        <h3>Are you sure you want to delete this project?</h3>
        <h5 className="has-text-danger">This cannot be undone</h5>
        <form ref={formEl} autoComplete="off">
          <Input
            value={props.project.title}
            name="title"
            disabled={true}
          />
          <h6>Enter project name to confirm</h6>
          <Input 
            value={projNameForm}
            name="projName"
            onChange={e => {setProjNameForm(e.target.value); console.log(projNameForm)}}
          />
          <hr />
          <button
            className="button is-danger text-right"
            onClick={handleFormSubmit}
            disabled={props.project.title !== projNameForm}
          >
            Delete Project
          </button>
        </form>
      </Modal>
    </>
  );
}

export default DeleteProjectModal;