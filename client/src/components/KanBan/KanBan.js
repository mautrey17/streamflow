import React from 'react';
import Task from "../Task";
import { Columns, Container } from 'react-bulma-components';
import "./KanBan.css";

function KanBan(props) {


    return(
        
            <Columns.Column size="4" >
                <div className="kanban-box">
                    <h4 className="text-center ">{props.title}</h4>
                    <Task 
                        taskClick={props.taskClick}
                    />
                </div>
                
            </Columns.Column>
        
    )
}

export default KanBan;