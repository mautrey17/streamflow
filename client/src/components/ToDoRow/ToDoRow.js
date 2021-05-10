import React, { useState, useEffect } from "react";

function ToDoRow(props) {

    function status(x) {
        switch(x) {
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
        switch(x) {
            case "todo":
                return "has-text-success";
            case "inProgress":
                return "has-text-primary";
            case "completed":
                return "has-background-danger-light has-text-dark";
            default:
                return "";
        }
    }

    function urgentStyle(x) {
        switch(x) {
            case "low":
                return "has-text-link";
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

    return (
        <tr>
            <th scope="row">{props.count}</th>
            <td>{props.project}</td>
            <td>{props.task.title}</td>
            <td>{props.date}</td>
            <td className={urgentStyle(props.task.urgency)}>{props.task.urgency ? props.task.urgency.charAt(0).toUpperCase() + props.task.urgency.slice(1) : ""}</td>
            <td className={statusStyle(props.task.status)}>{props.task.status ? status(props.task.status) : ""}</td>
            <td>{props.task.owner.firstName}</td>
        </tr>
    )
}

export default ToDoRow;