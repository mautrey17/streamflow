import React, { useState, useEffect } from "react";
import {Col, Row} from "../../components/Grid";
import KanBan from "../../components/KanBan";
import Nav from "../../components/Nav";
import "./Project.css";

function Project() {
    //set the initial state
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [openTask, setOpenTask] = useState({});

    useEffect(() => {
        //API call here and set state for projects
    });

    return(
        <div>
            <Nav />
            <Row>
            <Col size="lg-2 md-2">
                <div className="list-group mt-3">
                    <button type="button" className="list-group-item list-group-item-action active">Project 1</button>
                    <button type="button" className="list-group-item list-group-item-action">Project 2</button>
                    <button type="button" className="list-group-item list-group-item-action">Project 3</button>
                </div>
            
            </Col>
            <Col size="lg-9">
                <h1 className="text-center">Project Name</h1>
            <div>
                <h2>Graph of Task Statuses</h2>
            </div>
            <div>
                <h2>Important user info and due dates</h2>
            </div>
            <div>
            <h2>Active Projects</h2>
                <Row>
                    
                        <KanBan 
                            title="To Do"
                        />
                        <KanBan 
                            title="In Progress"
                        />
                        <KanBan 
                            title="Completed"
                        />
                        
                </Row>
                <div>
                    <h4>Current Task</h4>
                    <form>
                    <table className="table mb-3">
                    <thead>
                    <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Task</th>
                        <th scope="col">Urgency</th>
                        <th scope="col">Status</th>
                        <th scope="col">Progress</th>
                        <th scope="col">Team</th>
                        <th scope="col">Manager</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                        <th scope="col">Project 1</th>
                        <td><input type="text" value="Finish Home Page"></input></td>
                        <td>
                            <select className="urgent">
                                <option className="low" value="low">Low</option>
                                <option className="medium" value="medium">Medium</option>
                                <option className="high" value="high">High</option>
                                <option className="urgent" value="urgent" selected>Urgent</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option className="low" value="onTrack">On Track</option>
                                <option className="medium" value="potentialDelays">Potential Delays</option>
                                <option className="medium" value="delayed">Delayed</option>
                                <option className="high" value="stuck" selected>Stuck</option>
                                <option className="low" value="finished">Finished</option>
                            </select>
                        </td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%
                                </div>
                            </div>
                        </td>
                        <td>Bob, Steven</td>
                        <td>Jill</td>
                        <td><button type="submit" className="btn btn-primary btn-sm">Update</button></td>
                    </tr>
                </tbody>
            </table>
            </form>
                </div>
                
            </div>
            </Col>
            </Row>
            </div>
    )
}

export default Project;