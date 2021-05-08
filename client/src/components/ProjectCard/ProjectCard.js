import React from "react";
import { Columns, Container } from 'react-bulma-components';


function ProjectCard() {

    return(
        <Columns.Column size="4">
            <div className="card mb-3">
            <div className="card-header">
                <h5 className="title">Project Name</h5>
            </div>
            <div className="card-body">
                Information about each project
            </div>
            </div>
        </Columns.Column>
    )
}

export default ProjectCard;