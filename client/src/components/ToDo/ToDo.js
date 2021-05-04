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

    useEffect(() => {
        loadAssignedTasks();
    }, [])

    function loadAssignedTasks() {
        API.getTasks("assigned")
            .then(res => {
                res.data.tasks.map((task) => {
                    if (compareTime(task.dueDate) === 1) {
                        setOverTasks(old => [...old, task])
                    } else if (compareTime(task.dueDate) === 2) {
                        setTodayTasks(old => [...old, task])
                    } else {
                        setTomorrowTasks(old => [...old, task])
                    }
                });
            })
    }

    // Compares due date to current time

    // TODO: use moment to compare
    function compareTime(x) {
        const dateB = new Date(x);
        // 1 = overdue
        if ((currentDate.getMonth() >= dateB.getMonth())) {
            if (( currentDate.getDate() > dateB.getDate() ) || ( currentDate.getMonth() > dateB.getMonth() )) {
                return 1
            }
        }
        // 2 = today
        if ((currentDate.getMonth() === dateB.getMonth())) {
            if ( currentDate.getDate() === ( dateB.getDate() )) {
                return 2
            }
        }
        // 3 = tomorrow
        if ((currentDate.getMonth() <= dateB.getMonth())) {
            if (( currentDate.getDate() < dateB.getDate() ) || ( currentDate.getMonth() < dateB.getMonth() )) {
                return 3
            }
        }
    }

    return(
        <div>
            <h3>Overdue</h3>
            <table className="table mb-3">
                <THead />
                <tbody>
                {overTasks.map((task, i) => (
                    <ToDoRow task={task} count={i+1} key={task._id}/>
                ))}
                </tbody>
            </table>
            <h3>Today</h3>
            <table className="table mb-3">
                <THead />
                <tbody>
                {todayTasks.map((task, i) => (
                    <ToDoRow task={task} count={i+1} key={task._id}/>
                ))}
                </tbody>
            </table>

            <h3>Tomorrow</h3>
            <table className="table mt-3">
                <THead />
                <tbody>
                {tomorrowTasks.map((task, i) => (
                    <ToDoRow task={task} count={i+1} key={task._id}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ToDo;