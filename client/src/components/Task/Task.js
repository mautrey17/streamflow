import React from "react";
import "./Task.css";

function Task(props) {
  return (
    <div className="card mb-3 pr-2">
      <div className="task-box">
        <div>
          <span>
            <strong>
              <a onClick={props.handleSelectedTask} value={props.task._id}>{props.task.title}</a>
            </strong>
          </span>
          <div className="text-right close">x</div>
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
