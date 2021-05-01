import React from 'react';
import {Col} from "../Grid";
import Task from "../Task"
import "./KanBan.css";

function KanBan(props) {


    return(
        
            <Col size="md-3" >
                <div className="kanban-box">
                    <h4 className="text-center ">{props.title}</h4>
                    <Task />
                </div>
                
            </Col>
        
    )
}

export default KanBan;