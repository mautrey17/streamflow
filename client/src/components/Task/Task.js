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
    <div className="card mb-3 pr-2">
      <div className="task-box">
        <div>
          <span>
            <strong>
              <a onClick={props.handleSelectedTask} value={props.task._id}>{props.task.title}</a>
            </strong>
          </span>
          <DeleteTaskModal 
            task={props.task}
            className="text-right"
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            openModal={openModal}
            ariaHideApp={false}
          />
        </div>
        <div className="task-item">
          <p>Opened by: {props.task.owner.username}</p>
        </div>
        <div className="mx-auto move">
            <button onClick={props.taskClick}>&lt;</button>
            <button>&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Task;
