import React from "react";

export const ActiveMessage = (props) => (
  <div className="card mt-3" style={{backgroundColor: `${props.sent === 'to' ? 'blue' : '#fff'}`}}>
    <div className={`card-header bg-secondary ${props.sent === 'to' ? 'text-left' : 'text-right'}`} style={{color: `${props.sent === 'to' ? 'blue' : '#fff'}`}}>
      <h5>{props.message}</h5>
    </div>
  </div>
);

export default ActiveMessage;