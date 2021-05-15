import React, { useRef } from 'react';
import Modal from 'react-modal';
import { Input } from "../../components/Form";
import API from "../../utils/API";
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

function DeleteTaskModal(props) {
  const formEl = useRef(null);

  function handleFormSubmit(event) {
    event.preventDefault();
    API.deleteTask(props.task._id)
      .then(window.open(window.location.origin + "/project/" + props.i, "_self"))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <button onClick={props.openModal} className="delete is-small"></button>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Delete Task Modal"
      >
        
        <h3>Are you sure you want to delete this task?</h3>
        <h5 className="has-text-danger">This cannot be undone</h5>
        <form ref={formEl}>
          <Input
            value={props.task.title}
            name="title"
            disabled={true}
          />
          <hr />
          <button
            className="button is-danger text-right"
            onClick={handleFormSubmit}
          >
            Delete Task
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default DeleteTaskModal;