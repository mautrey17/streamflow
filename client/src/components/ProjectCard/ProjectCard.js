import React from "react";
import { Columns, Container } from 'react-bulma-components';
import { PieChart } from "react-minimal-pie-chart";


function ProjectCard(props) {

    return(
        <Columns.Column size="4">
            <div className="box mb-3">
            
                <h5 className="has-text-centered title is-4">Project Name</h5>
            
            <div className="">
                <PieChart
                    data={[
                        { title: 'To Do', value: 10, color: '#DD1E2f' },
                        { title: 'In Progress', value: 15, color: '#ebb035' },
                        { title: 'Completed', value: 20, color: '#218559' },
                    ]}
                    lineWidth={66}
                    radius={15}
                    center={[50, 15]}
                    viewBoxSize={[100, 30]}
                    startAngle={270}
                    paddingAngle={2}

                    
                />
            </div>
            </div>
        </Columns.Column>
    )
}

export default ProjectCard;