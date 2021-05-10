import React from 'react';
import Task from "../Task";
import { Columns, Container } from 'react-bulma-components';
import "./KanBan.css";

function KanBan(props) {
    return (
            <Columns.Column size="4">
                <div className="kanban-box">
                    <h4 className="text-center">{props.title}</h4>
                    {props.tasks ? props.tasks.map(task => (
                        <>
                            {props.title  === "To Do" && task.status === "toDo" ? 
                            <Task
                                taskClick={props.taskClick}
                                task={task}
                                handleSelectedTask={props.handleSelectedTask}
                                key={task._id}
                            /> : ""}
                            {props.title  === "In Progress" && task.status === "inProgress" ? 
                            <Task
                                taskClick={props.taskClick}
                                task={task}
                                handleSelectedTask={props.handleSelectedTask}
                            /> : ""}
                            {props.title  === "Completed" && task.status === "completed" ? 
                            <Task
                                taskClick={props.taskClick}
                                task={task}
                                handleSelectedTask={props.handleSelectedTask}
                            /> : ""}
                        </>
                    )) : ""}
                    
                </div>
            </Columns.Column>
    )
}

export default KanBan;