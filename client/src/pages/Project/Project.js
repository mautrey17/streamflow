import React, { useState, useEffect } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import BarGraph from "../../components/BarGraph";
import KanBan from "../../components/KanBan";
import Nav from "../../components/Nav";
import { Columns, Container } from 'react-bulma-components';
import "./Project.css";

function Project() {
    //set the initial state
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [openTask, setOpenTask] = useState({});

    useEffect(() => {
        //API call here and set state for projects
    });

    const taskClick = (() => {
        alert('passed successfully')
    })

    return(
        <div>
            <Columns>
            <Columns.Column size="2">
                <div className="block ml-3">
                    <aside className="menu">
                        <p className="menu-label">Active Projects</p>
                        <ul className="menu-list">
                            <li><a>Project 1</a></li>
                            <li><a>Project 1</a></li>
                            <li className="has-text-info"><a>Add a Project</a></li>
                        </ul>
                    </aside>
                </div>
                
            
            </Columns.Column>
            <Columns.Column>
                <h1 className="has-text-centered title is-1">Project Name</h1>
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
                            title="To Do"
                            taskClick={taskClick}
                        />
                        <KanBan 
                            title="In Progress"
                            taskClick={taskClick}
                        />
                        <KanBan 
                            title="Completed"
                            taskClick={taskClick}
                        />
                        
                </Columns>
                <div>
                    <h4 className="subtitle is-4">Current Task</h4>
                    <form>
                    <table className="table mb-3">
                    <thead>
                    <tr>
                        <th>Project</th>
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
                        
                        <th >Project 1</th>
                        <td><input className="input" type="text" value="Finish Home Page"></input></td>
                        <td>
                            <div className="select is-primary">
                                <select className="urgent">
                                    <option className="low" value="low">Low</option>
                                    <option className="medium" value="medium">Medium</option>
                                    <option className="high" value="high">High</option>
                                    <option className="urgent" value="urgent" selected>Urgent</option>
                                </select>
                            </div>
                            
                        </td>
                        <td>
                            <div className="select is-primary">
                                <select>
                                    <option className="low" value="onTrack">On Track</option>
                                    <option className="medium" value="potentialDelays">Potential Delays</option>
                                    <option className="medium" value="delayed">Delayed</option>
                                    <option className="high" value="stuck" selected>Stuck</option>
                                    <option className="low" value="finished">Finished</option>
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
                        <td>Bob, Steven</td>
                        <td>Jill</td>
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