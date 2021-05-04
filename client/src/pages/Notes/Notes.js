import React from "react";
import Nav from "../../components/Nav";

function Note ()  {

// TODO: - getting list of notes
//       - render list of notes
//       - creating new notes
//       - updatiing notes
//       - deleting notes

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