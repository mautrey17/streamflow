import React from 'react';
import {Col} from "../Grid";
import Task from "../Task"
import "./KanBan.css";

function KanBan(props) {


    return(
        
            <Col size="md-4" >
                <div className="kanban-box">
                    <h4 className="text-center ">{props.title}</h4>
                    <Task 
                        taskClick={props.taskClick}
                    />
                </div>
                
            </Col>
        
    )
}

export default KanBan;