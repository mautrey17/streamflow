import React, { useState } from "react";
import "./Task.css";
import DeleteTaskModal from "../../components/DeleteTaskModal";

function Task(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <article className="message is-small is-info mb-3">
      <div className="message-header title is-5 mb-1" style={{ cursor: "pointer" }}>
        <p onClick={props.handleSelectedTask} value={props.task._id}>{props.task.title}</p>
        <DeleteTaskModal
          task={props.task}
          className="has-text-right"
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          openModal={openModal}
          ariaHideApp={false}
        />
      </div>

      <div className="message-body">
        <p className="mb-2">Urgency: *needs input*</p>
        <p className="mb-2">Team: *needs team*</p>
        <p className="mb-2">Opened by: {props.task.owner.username}</p>
      </div>
    </article>
  );
}

export default Task;
