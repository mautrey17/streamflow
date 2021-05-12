import React from "react";

function THead() {
    return (
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Project</th>
                <th scope="col">Task</th>
                <th scope="col">Due Date</th>
                <th scope="col">Urgency</th>
                <th scope="col">Status</th>
                <th scope="col">Manager</th>
                <th>Finalize</th>
            </tr>
        </thead>
    )
}

export default THead;