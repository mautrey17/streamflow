import React from "react";

function ProjectCard() {

    return(
        <div className="card mb-3">
            <div className="card-header bg-secondary" style={{color: '#fff'}}>
                <h5>Project Name</h5>
            </div>
            <div className="card-body">
                Information about each project
            </div>
        </div>
    )
}

export default ProjectCard;