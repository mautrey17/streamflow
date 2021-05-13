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
import EditProjectModal from "../../components/EditProjectModal";
import moment from "moment";
import Select from "react-select";
import AUTH from '../../utils/AUTH';

function Project() {
    //set the initial state
    const [projects, setProjects] = useState([]);
    const [projectTasks, setProjectTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [openTask, setOpenTask] = useState({});
    const [selectedProject, setSelectedProject] = useState({});
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editModalIsOpen, setEditIsOpen] = useState(false);
    const [taskModalIsOpen, setTaskIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        loadProjects();
        AUTH.getUser().then(res => {
            setCurrentUser(res.data.user);
        });
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
    function openEditModal() {
        setEditIsOpen(true);
    }
    function closeEditModal() {
        setEditIsOpen(false);
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
            .then(API.getAllTasks()
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

    // Selecting a project on the left will take it's ID and load the information and tasks related to that project
    function setCurrentProject(e) {
        e.preventDefault();
        let i = e.currentTarget.value;
        let taskArray = [];

        // Loads tasks only associated with the project ID
        tasks.map(task => {
            if (projects[i]._id === task.project) {
                taskArray.push(task);
            }
        });
        setProjectTasks(taskArray);

        let filteredUsers = [];
        for (let e = 0; e < projects[i].assignedUsers.length; e++) {
            users.map(user => {
                if (user._id === projects[i].assignedUsers[e]) {
                    filteredUsers.push(user);
                }
            })
        };

        setSelectedProject({
            ...selectedProject,
            title: projects[i].title,
            id: projects[i]._id,
            dueDate: projects[i].dueDate,
            assignedUsers: projects[i].assignedUsers,
            owner: projects[i].owner,
            usernames: filteredUsers,
            selected: i
        });
    }

    // Moment function to show tasks relating to current week
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

    // Updates task to the database along with the current page without needing to reload
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

    function statusStyle(x) {
        switch (x) {
            case "toDo":
                return "has-background-danger";
            case "inProgress":
                return "has-background-warning-light";
            case "completed":
                return "has-background-success-light";
            default:
                return "";
        }
    }

    function urgentStyle(x) {
        switch (x) {
            case "low":
                return "has-background-link-light";
            case "medium":
                return "has-background-success-light";
            case "high":
                return "has-background-danger-light ";
            case "urgent":
                return "has-background-danger";
            default:
                return "";
        }
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
                                    ariaHideApp={false}
                                    users={users}
                                    currentUser={currentUser}
                                />
                                <AddTaskModal
                                    modalIsOpen={taskModalIsOpen}
                                    closeModal={closeTaskModal}
                                    openModal={openTaskModal}
                                    ariaHideApp={false}
                                    users={users}
                                    projects={projects}
                                    currentUser={currentUser}
                                />
                            </ul>
                        </aside>
                    </div>
                </Columns.Column>
                <Columns.Column size="9">
                    <div className="block">
                        <h1 className="has-text-centered title is-1 mt-3">
                            {selectedProject.title ?
                                <>
                                    {selectedProject.title}

                                    {/* Shows edit icon only if logged in user is the project owner */}
                                    {selectedProject.owner.id === currentUser._id &&
                                        <EditProjectModal
                                            project={selectedProject}
                                            users={users}
                                            modalIsOpen={editModalIsOpen}
                                            closeModal={closeEditModal}
                                            openModal={openEditModal}
                                            ariaHideApp={false}
                                            currentUser={currentUser}
                                        />
                                    }

                                </>
                                : projects.length === 0 ? "No projects found, please create one"
                                    : "Please select a project"
                            }
                        </h1>
                    </div>

                    {/* tiles start here */}

                    <div class="tile is-ancestor mt-4">
                        <div class="tile is-vertical is-8">
                            <div class="tile">
                                <div class="tile is-parent is-vertical">
                                    <article class="tile is-child notification is-danger">
                                        <div className='content is-medium'>
                                            <h5 className="title is-3">Urgent: </h5>
                                            <ul>
                                                {projectTasks && projectTasks.map(task => {
                                                    return (
                                                        task.urgency === "urgent" && <li>{task.title}</li>
                                                    )
                                                }
                                                )}
                                            </ul>
                                        </div>
                                    </article>
                                    <article class="tile is-child notification is-warning">
                                        <div className='content is-medium'>
                                            <h5 className="title is-3">This Week: </h5>
                                            <ul>
                                                {projectTasks && projectTasks.map(task => {
                                                    return (
                                                        compareWeek(task) && <li>{task.title}</li>
                                                    )
                                                }
                                                )}
                                            </ul>
                                        </div>
                                    </article>
                                </div>
                                <div class="tile is-parent">
                                    <article class="tile is-child notification is-info">
                                        <div className="block">
                                            <h2 className="title is-3 mb-5">Project Progress</h2>
                                            <PieChart
                                                data={[
                                                    { title: 'To Do', value: projectTasks.filter(e => { return e.status === "toDo" }).length, color: '#DD1E2f' },
                                                    { title: 'In Progress', value: projectTasks.filter(e => { return e.status === "inProgress" }).length, color: '#ebb035' },
                                                    { title: 'Completed', value: projectTasks.filter(e => { return e.status === "completed" }).length, color: '#218559' },
                                                ]}
                                                lineWidth={66}
                                                radius={30}
                                                center={[50, 30]}
                                                viewBoxSize={[100, 60]}
                                                startAngle={270}
                                                paddingAngle={2}
                                            />
                                            {/* <BarGraph /> */}
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child notification is-primary">
                                    <p class="title">Manager</p>
                                    <p class="subtitle">Aligned with the right tile</p>
                                    <div class="content">

                                    </div>
                                </article>
                            </div>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child notification is-success">
                                <div class="content is-medium">
                                    <p class="title">Team Members</p>
                                    <ul>
                                        {selectedProject.usernames && selectedProject.usernames.map((member) => {
                                            return (
                                                <li>{member.username}</li>
                                            )
                                        }
                                        )}
                                    </ul>
                                    <div class="content">

                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    {/* kanBan tiles */}
                    <div className="box px-3 has-background-primary">
                        <div class="tile is-ancestor">
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title has-text-centered">To Do</p>
                                    <KanBan
                                        key="todo_tasks"
                                        title="To Do"
                                        taskClick={taskClick}
                                        tasks={projectTasks}
                                        handleSelectedTask={handleSelectedTask}
                                        users={users}
                                    />
                                </article>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title has-text-centered">In Progress</p>
                                    <KanBan
                                        key="inProgress_tasks"
                                        title="In Progress"
                                        taskClick={taskClick}
                                        tasks={projectTasks}
                                        handleSelectedTask={handleSelectedTask}
                                        users={users}
                                    />
                                </article>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title has-text-centered">Completed</p>
                                    <KanBan
                                        key="completed_tasks"
                                        title="Completed"
                                        taskClick={taskClick}
                                        tasks={projectTasks}
                                        handleSelectedTask={handleSelectedTask}
                                        users={users}
                                    />
                                </article>
                            </div>
                        </div>
                    </div>


                    <div>

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
                                            <td className={urgentStyle(openTask.urgency)}>
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
                                            <td className={statusStyle(openTask.status)}>
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