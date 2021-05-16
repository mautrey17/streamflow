import React, { useState, useEffect } from "react";
import ToDoRow from "../ToDoRow";
import THead from "../THead";
import moment from "moment";
import './ToDo.css';

function ToDo(props) {
    const currentDate = new Date();
    const [overTasks, setOverTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);
    const [tomorrowTasks, setTomorrowTasks] = useState([]);

    useEffect(() => {
        loadAssignedTasks();
    }, [props])

    // Tasks are called and split into 3 sections depending on due date
    // Project name gets called and associated with matching task
    function loadAssignedTasks() {   
        let overTasks = [];
        let todayTasks = [];
        let tomTasks = [];
        if (props.tasks && props.projects) {
            props.tasks.forEach(task => {
                if (task.assignedUsers.indexOf(props.currentUser._id) !== -1) {
                    if (task.status !== "completed") {
                        // Gets the project name from the task's project ID then assigns it to the task object
                        if (compareTime(task.dueDate) === 1) {
                            let proj = props.projects.filter(e => e._id === task.project);
                            if (proj[0].title) task.projectTitle = proj[0].title;
                            overTasks.push(task);
                        } else if (compareTime(task.dueDate) === 2) {
                            let proj = props.projects.filter(e => e._id === task.project);
                            if (proj[0].title) task.projectTitle = proj[0].title;
                            todayTasks.push(task);
                        } else {
                            let proj = props.projects.filter(e => e._id === task.project);
                            if (proj[0].title) task.projectTitle = proj[0].title;
                            tomTasks.push(task);
                        }
                    }  
                }

            })
        }
        setOverTasks(overTasks);
        setTodayTasks(todayTasks);
        setTomorrowTasks(tomTasks);
    }

    // Compares due date to current time
    function compareTime(x) {
        const dateB = new Date(x);
        // 1 = overdue
        if ( moment(currentDate).isAfter(dateB, "day") ) {
            return 1     
        }
        // 2 = today
        else if ( moment(currentDate).isSame(dateB, "day") ) {
            return 2
        }
        // 3 = tomorrow
        else if ( moment(currentDate).isBefore(dateB, "day") ) {
            return 3
        }
        else return null
    }

    // function getShownRows() {
    //     const tomorrowTasksShown = tomorrowTasks.filter(task => task.status !== 'completed')
    // }

    return(
        <div>
            <h3 className={`${overTasks.length === 0 ? "hide" : 'subtitle is-2'}`}>Overdue</h3>
            <table className={`${overTasks.length === 0 ? "hide" : 'table mt-3 is-striped is-hoverable'}`}>
                <THead />
                <tbody>
                {overTasks ? overTasks.map((task, i) => (
                    <ToDoRow task={task} date={moment(task.dueDate).format('MMMM Do YYYY')} count={i+1} key={task._id}/>
                )) : ""}
                </tbody>
            </table>
            <h3 className={`${todayTasks.length === 0 ? "hide" : 'subtitle is-2'}`}>Today</h3>
            <table className={`${todayTasks.length === 0 ? "hide" : 'table mt-3 is-striped is-hoverable'}`}>
                <THead />
                <tbody>
                {todayTasks ? todayTasks.map((task, i) => (
                    <ToDoRow task={task} date={moment(task.dueDate).format('MMMM Do YYYY')} count={i+1} key={task._id}/>
                ))  : ""}
                </tbody>
            </table>

            <h3 className={`${tomorrowTasks.length === 0 ? "hide" : 'subtitle is-2'}`}>Tomorrow</h3>
            <table className={`${tomorrowTasks.length === 0 ? "hide" : 'table mt-3 is-striped is-hoverable'}`}>
                <THead />
                <tbody>
                    
                {tomorrowTasks ? tomorrowTasks.map((task, i) => (
                    <ToDoRow task={task} date={moment(task.dueDate).format('MMMM Do YYYY')} count={i+1} key={task._id}/>
                )) : ""}
                </tbody>
            </table>
        </div>
    )
}

export default ToDo;