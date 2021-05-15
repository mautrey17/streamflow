import React, { useState } from "react";
import "./Task.css";
import DeleteTaskModal from "../../components/DeleteTaskModal";
import moment from "moment"

function Task(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function getTeam() {
    let team = [];
    props.task.assignedUsers.map(taskUser => {
      props.users.map(user => {
        if (taskUser === user._id) {
          team.push(user.username);
        }
      })
    })

    let message = ""
    if (team.length > 0) {
      message = "Team: ";
      team.map((user, i) => {
        message += (i ? ", " : "") + user;
      });
    }
    return message;
  }

  return (
    <article className="message is-small is-info mb-3">
      <div className="message-header title is-5 mb-1">
        <p onClick={props.handleSelectedTask} value={props.task._id} style={{ cursor: "pointer" }}>{props.task.title}</p>
        <DeleteTaskModal
          task={props.task}
          className="has-text-right"
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          openModal={openModal}
          ariaHideApp={false}
          i={props.i}
        />
      </div>

      <div className="message-body">
        <p className="mb-2 has-text-weight-semibold">Due: {moment(props.task.dueDate).format('MMMM Do YYYY')}</p>
        <p className="mb-2">Urgency: {props.task.urgency[0].toUpperCase() + props.task.urgency.substring(1)}</p>
        <p className="mb-2">{getTeam()}</p>
        <p className="mb-2">Opened by: {props.task.owner.username}</p>
      </div>
    </article>
  );
}

export default Task;
