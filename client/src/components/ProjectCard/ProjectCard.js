import React, { useEffect, useState } from "react";
import { Columns } from 'react-bulma-components';
import { PieChart } from "react-minimal-pie-chart";
import "./ProjectCard.css"


function ProjectCard(props) {
    const [project, setProject] = useState({});
    const [status, setStatus] = useState({
        toDo: 0,
        inProgress: 0,
        completed: 0
    });

    useEffect(() => {
        setProject(props.project);

        let toDo = 0;
        let inProgress = 0;
        let completed = 0;

        for (let e = 0; e < props.tasks.length; e++) {
            if (props.tasks[e].project === props.project._id) {
                switch (props.tasks[e].status) {
                    case "toDo":
                        toDo++;
                        break;
                    case "inProgress":
                        inProgress++
                        break
                    case "completed":
                        completed++
                        break
                    default:
                        break
                }
            }
        }

        setStatus({
            toDo: toDo,
            inProgress: inProgress,
            completed: completed
        })
    }, [props])

    function loadPage() {
        window.open(window.location.origin + "/project/" + props.i, "_self");
    }

    return (
        <Columns.Column size="4" onClick={loadPage} className="projectCard">
            <div className="box mb-3">
                <h5 className="has-text-centered title is-4">{project.title}</h5>
                <div className="">
                    <PieChart
                        data={[
                            { title: 'To Do', value: status.toDo, color: '#DD1E2f' },
                            { title: 'In Progress', value: status.inProgress, color: '#ebb035' },
                            { title: 'Completed', value: status.completed, color: '#218559' },
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