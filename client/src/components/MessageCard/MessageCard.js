import React from "react";

function MessageCard() {

    return(
        <div className="card mb-3">
            <div className="card-header bg-secondary" style={{color: '#fff'}}>
                <h5>Sample Card</h5>
            </div>
            <div className="card-body">
                Small blurb about message
            </div>
        </div>
    )
}

export default MessageCard;