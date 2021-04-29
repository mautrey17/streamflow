import React from "react";

export const ActiveMessage = (props) => (
  <div className="card mt-3" style={{backgroundColor: `${props.sent === 'to' ? 'blue' : '#fff'}`}}>
    <div className={`card-header ${props.sent === 'to' ? 'text-left' : 'text-right'}`} style={{color: `${props.sent === 'to' ? 'white' : 'blue'}`}}>
      <h5>{props.message}</h5>
    </div>
  </div>
);

export default ActiveMessage;