import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import ToDoRow from "../ToDoRow";
import THead from "../THead";
import moment from "moment";

function ToDo() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [overTasks, setOverTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);
    const [tomorrowTasks, setTomorrowTasks] = useState([]);
    const [overProjName, setOverProjName] = useState([]);
    const [todayProjName, setTodayProjName] = useState([]);
    const [tomProjName, setTomProjName] = useState([]);

    useEffect(() => {
        loadAssignedTasks();
    }, [])

    // Tasks are called and split into 3 sections depending on due date
    // Project name gets called and associated with matching task
    function loadAssignedTasks() {
        API.getTasks("assigned")
            .then(res => {
                API.getProjects()
                    .then(res2 => {
                        console.log(res2.data.projects)
                        if(res.data.tasks) res.data.tasks.map((task, j) => {
                            if (compareTime(task.dueDate) === 1) {
                                setOverTasks(old => [...old, task])
                                for (let i = 0; i < res2.data.projects.length; i++) {
                                    if (res2.data.projects[i]._id === res.data.tasks[j].project) {
                                        setOverProjName(old => [...old, res2.data.projects[i].title])
                                        break;
                                    }
                                }
                            } else if (compareTime(task.dueDate) === 2) {
                                setTodayTasks(old => [...old, task])
                                for (let i = 0; i < res2.data.projects.length; i++) {
                                    if (res2.data.projects[i]._id === res.data.tasks[j].project) {
                                        setTodayProjName(old => [...old, res2.data.projects[i].title])
                                        break;
                                    }
                                }
                            } else {
                                setTomorrowTasks(old => [...old, task])
                                for (let i = 0; i < res2.data.projects.length; i++) {
                                    if (res2.data.projects[i]._id === res.data.tasks[j].project) {
                                        setTomProjName(old => [...old, res2.data.projects[i].title])
                                        break;
                                    }
                                }
                            }
                        });
                    })     
            })
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

    return(
        <div>
            <h3 className="subtitle is-2">Overdue</h3>
            <table className="table mb-3 is-striped is-hoverable">
                <THead />
                <tbody>
                {overTasks ? overTasks.map((task, i) => (
                    <ToDoRow task={task} date={moment(task.dueDate).format('MMMM Do YYYY')} count={i+1} key={task._id} project={overProjName[i]}/>
                )) : ""}
                </tbody>
            </table>
            <h3 className="subtitle is-2">Today</h3>
            <table className="table mb-3 is-striped is-hoverable">
                <THead />
                <tbody>
                {todayTasks ? todayTasks.map((task, i) => (
                    <ToDoRow task={task} date={moment(task.dueDate).format('MMMM Do YYYY')} count={i+1} key={task._id} project={todayProjName[i]}/>
                ))  : ""}
                </tbody>
            </table>

            <h3 className="subtitle is-2">Tomorrow</h3>
            <table className="table mt-3 is-striped is-hoverable">
                <THead />
                <tbody>
                {tomorrowTasks ? tomorrowTasks.map((task, i) => (
                    <ToDoRow task={task} date={moment(task.dueDate).format('MMMM Do YYYY')} count={i+1} key={task._id} project={tomProjName[i]}/>
                )) : ""}
                </tbody>
            </table>
        </div>
    )
}

export default ToDo;