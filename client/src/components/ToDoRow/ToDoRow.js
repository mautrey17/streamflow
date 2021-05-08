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

    return (
        <tr>
            <th scope="row">{props.count}</th>
            <td>{props.project}</td>
            <td>{props.task.title}</td>
            <td>{props.date}</td>
            <td>{props.task.urgency ? props.task.urgency.charAt(0).toUpperCase() + props.task.urgency.slice(1) : ""}</td>
            <td>{props.task.status ? status(props.task.status) : ""}</td>
            <td></td>
            <td>{props.task.owner.firstName}</td>
        </tr>
    )
}

export default ToDoRow;