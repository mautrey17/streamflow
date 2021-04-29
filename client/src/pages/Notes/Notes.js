import React from "react";

function Note ()  {

return (
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
)
}

export default Note;