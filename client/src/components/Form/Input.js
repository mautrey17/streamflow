import React from "react";

export const Input = props => (
  <div className="field mb-3">
    <label className="label">{props.label}</label>
    <div className="control">
    <input type="text" className="input" {...props} />
    </div>
  </div>
);
