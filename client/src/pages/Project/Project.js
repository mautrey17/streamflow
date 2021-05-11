import React, { useState, useEffect, useRef } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import BarGraph from "../../components/BarGraph";
import KanBan from "../../components/KanBan";
import Nav from "../../components/Nav";
import { Columns, Container } from 'react-bulma-components'
import "./Project.css";
import API from "../../utils/API";
import AddProjectModal from "../../components/AddProjectModal";
import AddTaskModal from "../../components/AddTaskModal";
import moment from "moment";
import Select from "react-select";

function Project() {
    //set the initial state
    const [projects, setProjects] = useState([]);
    const [projectTasks, setProjectTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [openTask, setOpenTask] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [users, setUsers] = useState([]);
    const [taskModalIsOpen, setTaskIsOpen] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function openTaskModal() {
        setTaskIsOpen(true);
    }
    function closeTaskModal() {
        setTaskIsOpen(false);
    }

    // Calls 3 APIs (Projects, Tasks, Users) and loads them into 3 arrays
    function loadProjects() {
        API.getProjects()
            .then(res => {
                if (res.data.projects) {
                    res.data.projects.map(proj => {
                        setProjects(old => [...old, proj]);
                    })
                }
            })
            .then(API.getTasks()
                .then(res2 => {
                    if (res2.data.tasks) {
                        res2.data.tasks.map(task => {
                            setTasks(old => [...old, task]);
                        })
                    }
                })
            )
            .then(API.getUsers()
                .then(res3 => {
                    if (res3.data) {
                        console.log(res3.data);
                        res3.data.map(user => {
                            setUsers(old => [...old, user]);
                        })
                    }
                })
            )
    }

    function taskClick(e) {
        console.log("aa");
    }

    function handleSelectedTask(e) {
        e.preventDefault();
        let id = e.target.getAttribute("value")

        let filteredTask = tasks.filter(e => {
            return e._id === id
        })

        let filteredUsers = [];
        for (let i = 0; i < filteredTask[0].assignedUsers.length; i++) {
            users.map(user => {
                if (user._id === filteredTask[0].assignedUsers[i]) {
                    filteredUsers.push(user);
                }
            })
        };

        let manager = users.filter(e => {
            return e._id === filteredTask[0].owner.id;
        });


        setOpenTask({
            ...openTask,
            i: projectTasks.findIndex(task => task._id === filteredTask[0]._id),
            id: filteredTask[0]._id,
            title: filteredTask[0].title,
            urgency: filteredTask[0].urgency,
            status: filteredTask[0].status,
            owner: filteredTask[0].owner,
            team: filteredUsers,
            manager: manager[0].username
        });
    }

    function setCurrentProject(e) {
        e.preventDefault();
        let i = e.currentTarget.value;
        let taskArray = [];

        tasks.map(task => {
            if (projects[i]._id === task.project) {
                taskArray.push(task);
            }
        });
        setProjectTasks(taskArray);

        setSelectedProject({
            ...selectedProject,
            title: projects[i].title,
            id: projects[i]._id,
            selected: i
        });
    }

    function compareWeek(x) {
        if (moment(x.dueDate).isSame(new Date(), "week")) return true
        else return false
    }

    function handleUrgencyChange(x) {
        setOpenTask({
            ...openTask,
            urgency: x.value
        });
    }
    function handleStatusChange(x) {
        setOpenTask({
            ...openTask,
            status: x.value
        });
    }
    function handleTaskTitleChange(e) {
        setOpenTask({
            ...openTask,
            title: e.target.value
        })
        console.log(openTask);
    }

    function statusLabel(x) {
        switch (x) {
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

    function updateTask(e) {
        e.preventDefault();
        let assignedUsersId = [];
        openTask.team.map(user => {
            assignedUsersId.push(user._id)
        })

        API.updateTask(openTask.id, {
            title: openTask.title,
            status: openTask.status,
            urgency: openTask.urgency,
            assignedUsers: assignedUsersId
        })

        setProjectTasks(projectTasks.map(task => {
            if (task._id !== openTask.id) return task
            return {
                ...task,
                title: openTask.title,
                status: openTask.status,
                urgency: openTask.urgency,
                assignedUsers: assignedUsersId
            }
        }))
        setTasks(tasks.map(task => {
            if (task._id !== openTask.id) return task
            return {
                ...task,
                title: openTask.title,
                status: openTask.status,
                urgency: openTask.urgency,
                assignedUsers: assignedUsersId
            }
        }))
    }

    return (
        <div>
            <Columns>
                <Columns.Column size="2">
                    <div className="block ml-3 menu-parent">
                        <aside className="menu">
                            <p className="menu-label">Active Projects</p>
                            <ul className="menu-list">
                                {projects ? projects.map((proj, i) => (
                                    <li
                                        key={proj.id}
                                        onClick={setCurrentProject}
                                        value={i}
                                        className={selectedProject.selected === i ? "has-background-success-light" : ""}
                                    >
                                        <a>{proj.title}</a>
                                    </li>
                                )) : ""}
                                <AddProjectModal
                                    modalIsOpen={modalIsOpen}
                                    closeModal={closeModal}
                                    openModal={openModal}
                                />
                                <AddTaskModal
                                    modalIsOpen={taskModalIsOpen}
                                    closeModal={closeTaskModal}
                                    openModal={openTaskModal}
                                />
                            </ul>
                        </aside>
                    </div>
                </Columns.Column>
                <Columns.Column>
                    <h1 className="has-text-centered title is-1 mt-3">
                        {selectedProject.title ?
                            <>
                                {selectedProject.title} <i className="fas fa-edit" />
                            </>
                            : projects.length === 0 ? "No projects found, please create one"
                                : "Please select a project"}
                    </h1>
                    <div className="block">
                        <h2 className="subtitle is-2">Graph of Task Statuses</h2>
                        <PieChart
                            data={[
                                { title: 'To Do', value: projectTasks.filter(e => { return e.status === "toDo" }).length, color: 'red' },
                                { title: 'In Progress', value: projectTasks.filter(e => { return e.status === "inProgress" }).length, color: 'yellow' },
                                { title: 'Completed', value: projectTasks.filter(e => { return e.status === "completed" }).length, color: 'green' },
                            ]}
                            lineWidth={66}
                            radius={15}
                            center={[50, 15]}
                            viewBoxSize={[100, 30]}
                            startAngle={270}
                            paddingAngle={2}
                        />
                        {/* <BarGraph /> */}
                    </div>
                    <div className="block">
                        <h2 className="subtitle is-2">Important user info and due dates</h2>
                        <Columns>
                            <Columns.Column size="one-fifth"></Columns.Column>
                            <Columns.Column size="3">
                                <div className='card'>
                                    <h5>This Week: </h5>
                                    {projectTasks && projectTasks.map(task => {
                                        return (
                                            compareWeek(task) && <p>{task.title}</p>
                                        )
                                    }
                                    )}
                                </div>
                            </Columns.Column>
                            <Columns.Column size="3">
                                <div className='card'>
                                    <h5>Urgent: </h5>
                                    {projectTasks && projectTasks.map(task => {
                                        return (
                                            task.urgency === "urgent" && <p>{task.title}</p>
                                        )
                                    }
                                    )}
                                </div>
                            </Columns.Column>
                        </Columns>
                    </div>
                    <div>
                        <h2 className="subtitle is-2">Active Tasks</h2>
                        <Columns className="mr-6">

                            <KanBan
                                key="todo_tasks"
                                title="To Do"
                                taskClick={taskClick}
                                tasks={projectTasks}
                                handleSelectedTask={handleSelectedTask}
                            />
                            <KanBan
                                key="inProgress_tasks"
                                title="In Progress"
                                taskClick={taskClick}
                                tasks={projectTasks}
                                handleSelectedTask={handleSelectedTask}
                            />
                            <KanBan
                                key="completed_tasks"
                                title="Completed"
                                taskClick={taskClick}
                                tasks={projectTasks}
                                handleSelectedTask={handleSelectedTask}
                            />

                        </Columns>
                        <div>
                            <h4 className="subtitle is-4">Current Task</h4>
                            <form>
                                <table className="table mb-3">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Urgency</th>
                                            <th>Status</th>
                                            <th>Team</th>
                                            <th>Manager</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    className="input"
                                                    type="text"
                                                    value={openTask.title}
                                                    onChange={handleTaskTitleChange}
                                                    disabled={!openTask.id}
                                                >
                                                </input>
                                            </td>
                                            <td>
                                                {/* <select className="urgent" value={openTask.urgency}>
                                                        <option className="low" value="low">Low</option>
                                                        <option className="medium" value="medium">Medium</option>
                                                        <option className="high" value="high">High</option>
                                                        <option className="urgent" value="urgent" selected>Urgent</option>
                                                    </select> */}
                                                <Select
                                                    value={{
                                                        value: openTask.urgency,
                                                        label: (openTask.urgency ? openTask.urgency[0].toUpperCase() + openTask.urgency.substring(1) : "")
                                                    }}
                                                    options={[
                                                        { value: "low", label: "Low" },
                                                        { value: "medium", label: "Medium" },
                                                        { value: "high", label: "High" },
                                                        { value: "urgent", label: "Urgent" }
                                                    ]}
                                                    onChange={handleUrgencyChange}
                                                    menuPlacement="top"
                                                    isDisabled={!openTask.id}
                                                />

                                            </td>
                                            <td>
                                                {/* <div className="select is-primary">
                                                    <select value={openTask.status}>
                                                        <option className="high" value="toDo">To Do</option>
                                                        <option className="medium" value="inProgress">In Progress</option>
                                                        <option className="low" value="completed">Completed</option>
                                                    </select>
                                                </div> */}
                                                <Select
                                                    value={{
                                                        value: openTask.status,
                                                        label: (openTask.status ? statusLabel(openTask.status) : "")
                                                    }}
                                                    options={[
                                                        { value: "toDo", label: "To Do" },
                                                        { value: "inProgress", label: "In Progress" },
                                                        { value: "completed", label: "Completed" }
                                                    ]}
                                                    onChange={handleStatusChange}
                                                    menuPlacement="top"
                                                    isDisabled={!openTask.id}
                                                />
                                            </td>
                                            <td>
                                                {openTask.team ? openTask.team.map((user, i) => (
                                                    (i ? ", " : "") + user.username
                                                )) : ""}
                                            </td>
                                            <td>{openTask.manager}</td>
                                            <td>
                                                <button
                                                    type="submit"
                                                    className="button is-primary"
                                                    onClick={updateTask}
                                                    disabled={!openTask.id}
                                                >
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </Columns.Column>
            </Columns>
        </div>
    )
}

export default Project;