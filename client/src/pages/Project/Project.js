import React, { useState, useEffect } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import BarGraph from "../../components/BarGraph";
import KanBan from "../../components/KanBan";
import Nav from "../../components/Nav";
import { Columns, Container } from 'react-bulma-components'
import "./Project.css";
import API from "../../utils/API";
import AddProjectModal from "../../components/AddProjectModal";

function Project() {
    //set the initial state
    const [projects, setProjects] = useState([]);
    const [projectTasks, setProjectTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [openTask, setOpenTask] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadProjects();
    }, []);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

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

        console.log(filteredTask);
        console.log(users);

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

        
        console.log(filteredUsers);
        
        setOpenTask({...openTask,
            title: filteredTask[0].title,
            urgency: filteredTask[0].urgency,
            status: filteredTask[0].status,
            owner: filteredTask[0].owner.username,
            team: filteredUsers,
            manager: manager[0].username
        });

        console.log(openTask);
    }

    function setCurrentProject(e) {
        e.preventDefault();
        let i = e.currentTarget.value;

        if (projects) {
            setSelectedProject({...selectedProject,
                title: projects[i].title, 
                id: projects[i]._id
            });

            let taskArray = [];
            tasks.map(task => {
                if (projects[i]._id === task.project) {
                    taskArray.push(task);
                }
            })
            setProjectTasks(taskArray);
        }
    }

    return (
        <div>
            <Columns>
                <Columns.Column size="2">
                    <div className="block ml-3">
                        <aside className="menu">
                            <p className="menu-label">Active Projects</p>
                            <ul className="menu-list">
                                {projects ? projects.map((proj, i) => (
                                    <li
                                        key={proj.id}
                                        onClick={setCurrentProject}
                                        value={i}
                                    >
                                        <a>{proj.title}</a>
                                    </li>
                                )) : ""}
                                <AddProjectModal 
                                    modalIsOpen={modalIsOpen}
                                    closeModal={closeModal}
                                    openModal={openModal}
                                />
                                {users.map(user => (
                                    <li>{user.firstName}</li>
                                ))}
                            </ul>
                        </aside>
                    </div>


                </Columns.Column>
                <Columns.Column>
                    <h1 className="has-text-centered title is-1">{selectedProject ? selectedProject.title : "Project Name"}</h1>
                    <div className="block">
                        <h2 className="subtitle is-2">Graph of Task Statuses</h2>
                        <PieChart
                            data={[
                                { title: 'To Do', value: 10, color: 'red' },
                                { title: 'In Progress', value: 15, color: 'yellow' },
                                { title: 'Completed', value: 20, color: 'green' },
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
                                    <p>Task Name</p>
                                </div>
                            </Columns.Column>
                            <Columns.Column size="3">
                                <div className='card'>
                                    <h5>Urgent: </h5>
                                    <p>Task Name</p>
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
                                            <th>Progress</th>
                                            <th>Team</th>
                                            <th>Manager</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input className="input" type="text" value={openTask.title}></input></td>
                                            <td>
                                                <div className="select is-primary">
                                                    <select className="urgent" value={openTask.urgency}>
                                                        <option className="low" value="low">Low</option>
                                                        <option className="medium" value="medium">Medium</option>
                                                        <option className="high" value="high">High</option>
                                                        <option className="urgent" value="urgent" selected>Urgent</option>
                                                    </select>
                                                </div>

                                            </td>
                                            <td>
                                                <div className="select is-primary">
                                                    <select value={openTask.status}>
                                                        <option className="high" value="toDo">To Do</option>
                                                        <option className="medium" value="inProgress">In Progress</option>
                                                        <option className="low" value="completed">Completed</option>
                                                    </select>
                                                </div>

                                            </td>
                                            <td>
                                                {/* <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%
                                </div>
                            </div> */}
                                                <progress className="progress is-info" value="25" max="100">25%</progress>
                                            </td>
                                            <td>
                                                {openTask.team ? openTask.team.map((user, i) => (
                                                    (i ? ", " : "") + user.username
                                                )) : ""}
                                            </td>
                                            <td>{openTask.manager}</td>
                                            <td><button type="submit" className="button is-primary ">Update</button></td>
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