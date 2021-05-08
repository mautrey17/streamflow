import React, { useState, useEffect } from "react";

function ToDoRow(props) {

    function status(x) {
        switch(x) {
            case "onTrack":
                return "On Track";
            case "potentialDelays":
                return "Potential Delays";
            case "delayed":
                return "Delayed";
            case "stuck":
                return "Stuck";
            case "finished":
                return "Finished";
            default:
                return "";
        }
    }

    function statusStyle(x) {
        switch(x) {
            case "onTrack":
                return "has-text-success";
            case "potentialDelays":
                return "has-text-primary";
            case "delayed":
                return "has-background-danger-light has-text-dark";
            case "stuck":
                return "has-text-primary";
            case "finished":
                return "has-text-primary";
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