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
                                task={task}
                                handleSelectedTask={props.handleSelectedTask}
                                key={task._id}
                                users={props.users}
                                i={props.i}
                            /> : ""}
                            {props.title  === "In Progress" && task.status === "inProgress" ? 
                            <Task
                                task={task}
                                handleSelectedTask={props.handleSelectedTask}
                                key={task._id}
                                users={props.users}
                                i={props.i}
                            /> : ""}
                            {props.title  === "Completed" && task.status === "completed" ? 
                            <Task
                                task={task}
                                handleSelectedTask={props.handleSelectedTask}
                                key={task._id}
                                users={props.users}
                                i={props.i}
                            /> : ""}
                        </>
                    )) : ""}
                    
                </div>
            
    )
}

export default KanBan;