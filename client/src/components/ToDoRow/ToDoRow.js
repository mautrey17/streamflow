import React, { useState, useEffect } from "react";

function ToDoRow(props) {

    return (
        <tr>
            <th scope="row">{props.count}</th>
            <td>Project 1</td>
            <td>{props.task.title}</td>
            <td>{props.task.urgency ? props.task.urgency.charAt(0).toUpperCase() + props.task.urgency.slice(1) : ""}</td>
            <td>{props.task.status ? props.task.status.charAt(0).toUpperCase() + props.task.urgency.slice(1) : ""}</td>
            <td>90%</td>
            <td>{props.task.owner.firstName}</td>
        </tr>
    )
}

export default ToDoRow;