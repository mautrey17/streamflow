import React from "react";
import {Col, Row} from "../../components/Grid";
import KanBan from "../../components/KanBan"

function Project() {

    return(
        <div className="container">
            <div>
                <h1>Graph of Task Statuses</h1>
            </div>
            <div>
                <h1>Important user info and due dates</h1>
            </div>
            <div>
            <h1>Active Projects</h1>
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
                
            </div>
        </div>
    )
}

export default Project;