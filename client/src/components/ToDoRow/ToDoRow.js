import React from "react";
import API from "../../utils/API";

function ToDoRow(props) {

    function markComplete(e) {
        let id = e.target.value

        API.updateTask(id, {
            status: "completed"
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    function status(x) {
        switch (x) {
            case "toDo":
                return "To Do";
            case "inProgress":
                return "In Progress";
            case "completed":
                return "Completed";
            default:
                return "";
        }
    }

    function statusStyle(x) {
        switch (x) {
            case "toDo":
                return "has-text-danger";
            case "inProgress":
                return "has-text-warning has-background-warning-light";
            case "completed":
                return "has-background-success-light has-text-success";
            default:
                return "";
        }
    }

    function urgentStyle(x) {
        switch (x) {
            case "low":
                return "has-text-link has-background-link-light";
            case "medium":
                return "has-text-success has-background-success-light";
            case "high":
                return "has-background-danger-light has-text-warning";
            case "urgent":
                return "has-background-danger has-text-white has-text-weight-bold";
            default:
                return "";
        }
    }

    function strike(status) {
        if (status === 'completed') {
            return { textDecoration: 'line-through' }
        }
    }

    return (
        <tr style={strike(props.task.status)}>
            <th scope="row">{props.count}</th>
            <td>{props.task.projectTitle}</td>
            <td>{props.task.title}</td>
            <td>{props.date}</td>
            <td className={urgentStyle(props.task.urgency)}>{props.task.urgency ? props.task.urgency.charAt(0).toUpperCase() + props.task.urgency.slice(1) : ""}</td>
            <td className={statusStyle(props.task.status)}>{props.task.status ? status(props.task.status) : ""}</td>
            <td>{props.task.owner.username}</td>
            <td><button className="button is-success is-rounded" value={props.task._id} onClick={markComplete}>Complete</button></td>
        </tr>
    )
}

export default ToDoRow;