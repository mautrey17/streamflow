import React from "react";
import Nav from "../../components/Nav";

function Note ()  {

return (
<div>
    <Nav />
    <div className="container">
   <form>
       <label>
        Note:
       </label>
       <textarea
       className="form-control"
       type="textarea"
       placeholder="Please enter notes here: " >
           
       </textarea>
   </form>
   </div>
</div>
)
}

export default Note;