
import React from 'react';
import {Col, Row} from "../../components/Grid";
import ProjectCard from "../../components/ProjectCard";
import ToDo from "../../components/ToDo"
// import Nav from "../../components/Nav"

function Dashboard() {


    return(
        <div>
            {/* <Nav /> */}
            
            <Row>
            <Col size="md-2 sm-2">
                <h2>Project Menu</h2>
                <div>
                    <button>Add Project</button>
                </div>
                <div>
                    <button>Add Project</button>
                </div>
            
            </Col>
            <Col size="md-9 sm-9">
            <h1 className="text-center">Current Projects</h1>
            <ProjectCard />
            <ProjectCard />
            <div className="mt-4">
                <h1 className="text-center">Upcoming Tasks</h1>
                <ToDo />
            </div>
            
            </Col>
            
            </Row>
        </div>
    )
}

export default Dashboard;