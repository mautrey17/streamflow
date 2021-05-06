import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Nav from "../../components/Nav";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function Note ()  {
// Setting our component's initial state
    const [notes, setNotes] = useState([]);
    const [formObject, setFormObject] = useState({});
    const formEl = useRef(null);
  
// Load all books and store them with setBooks
    useEffect(() => {
        // loadNotes();
        API.getNotes();
    }, []);

// TODO: - getting list of notes
    function loadNotes() {
        API.getNotes()
        .then(res => {
            // console.log(res.data.books);
            setNotes(res.data.notes);
        })
        .catch(err => console.log(err));
    };

//       - creating new notes
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('notes',notes)
        if (notes.title && notes.body) {
            API.saveNote({
                title: notes.title,
                body: notes.body
            })
            .then(res => {
            formEl.current.reset();
            loadNotes();
            })
            .catch(err => console.log(err));
        }
    };

//       - updatiing notes
//       - deleting notes
    function deleteNote(id) {
        API.deleteNote(id)
        .then(res => loadNotes())
        .catch(err => console.log(err));
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNotes({ ...notes, [name]: value })
        console.log('notes', notes)
    }

return (
<div>
    <Nav />
    <div className="container">
        <div className='row'>
            <form>
                <label>title</label>
                <input 
                    onChange={handleInputChange}
                    type='text'
                    name='title'
                />
                <br></br>
                <label>note</label>
                <input
                    onChange={handleInputChange} 
                    type='textarea'
                    name='body'
                />
                <br></br>
                <button
                    onClick={handleFormSubmit}
                >Save Note</button>
            </form>
        </div>
        <div className="row">
            <div className="md-6 sm-2">
                <h1>first col</h1>
                {notes === null ? (
                    <h3>No Notes to Display - Notes = NULL</h3>
                ):(
                    (notes.length) ? (
                        <div>
                            {notes.map(note => (
                                <ListItem key={note._id}>
                                <Link to={"/notes/" + note._id}>
                                    <strong>
                                    {note.title}
                                    </strong>
                                </Link>
                                <DeleteBtn onClick={() => deleteNote(note._id)} />
                                </ListItem>
                            ))}
                        </div>
                    ):(
                        <h3>No Notes to Display</h3>
                    )
                )}
            </div>
            <div className="md-6 sm-10">
                <h1>2nd col</h1>
            </div>
        </div>
        {/* <form>
            <label>
                Note:
            </label>
            <textarea
                className="form-control"
                type="textarea"
                placeholder="Please enter notes here: " >
            </textarea>
        </form> */}
    </div>
</div>
)
}

export default Note;