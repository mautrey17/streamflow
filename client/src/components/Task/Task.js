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
    <article className="message is-info mb-3">
      <div className="message-header task-title">

              <a className="title is-5 task-title" onClick={props.handleSelectedTask} value={props.task._id}>{props.task.title}</a>
            
            
            
          
          <DeleteTaskModal 
            task={props.task}
            className="has-text-right"
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            openModal={openModal}
            ariaHideApp={false}
          />
        </div>
        <div>
        <div className="message-body">
          <p>Opened by: {props.task.owner.username}</p>
        </div>
      </div>
    </article>
  );
}

export default Task;
