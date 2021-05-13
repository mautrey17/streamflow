import React from 'react';
import Task from "../Task";
import { Columns, Container } from 'react-bulma-components';
import "./KanBan.css";

function KanBan(props) {
    return (
            
                <div className="">
                    
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
                                key={task._id}
                            /> : ""}
                            {props.title  === "Completed" && task.status === "completed" ? 
                            <Task
                                taskClick={props.taskClick}
                                task={task}
                                handleSelectedTask={props.handleSelectedTask}
                                key={task._id}
                            /> : ""}
                        </>
                    )) : ""}
                    
                </div>
            
    )
}

export default KanBan;