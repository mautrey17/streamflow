import API from "../../utils/API";
import React, { useState, useEffect, useRef } from "react";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import "../Notes/notes.css"
import Nav from "../../components/Nav";


function Note ()  {
// Setting our component's initial state
//     const [notes, setNotes] = useState([]);
//     const [formObject, setFormObject] = useState({});
//     const formEl = useRef(null);
  
// // Load all books and store them with setBooks
//     useEffect(() => {
//         // loadNotes();
//         API.getNotes();
//     }, []);


// // TODO: - getting list of notes
//     function loadNotes() {
//         API.getNotes()
//         .then(res => {
//             // console.log(res.data.books);
//             setNotes(res.data.notes);
//         })
//         .catch(err => console.log(err));
//     };

// //       - creating new notes
//     function handleFormSubmit(event) {
//         event.preventDefault();
//         console.log('notes',notes)
//         if (notes.title && notes.body) {
//             API.saveNote({
//                 title: notes.title,
//                 body: notes.body
//             })
//             .then(res => {
//             formEl.current.reset();
//             loadNotes();
//             })
//             .catch(err => console.log(err));
//         }
//     };

// //       - updatiing notes
// //       - deleting notes
//     function deleteNote(id) {
//         API.deleteNote(id)
//         .then(res => loadNotes())
//         .catch(err => console.log(err));
//     }

//     function handleInputChange(event) {
//         const { name, value } = event.target;
//         setNotes({ ...notes, [name]: value })
//         console.log('notes', notes)
//     }

//set initial state 
const [notes, setNotes] = useState([])
const [formObject, setFormObject] = useState({})
const formEl = useRef(null);
//load notes and stores in setNotes 

useEffect(() => {
    loadNotes();
}, [])

//load all notes and set to notes
function loadNotes () {
    API.getNotes()
    .then(res => {
        setNotes(res.data.notes)
    }).catch(err => console.log(err));
};

//Delete notes 
function deleteNote(id) {
    API.deleteNote(id)
    .then(res => loadNotes())
    .catch(err => console.log(err));
}


//handles note input change by updating state 
function handleInputChange(event){
const { name, value } = event.target;
setFormObject({...formObject, [name]: value})
};

//when the form is submitted api saveNotes method to save book data 

function handleFormSubmit(event){
    event.preventDefault();
    if (formObject.title && formObject.note){
        API.saveNote({
            title: formObject.title,
            note: formObject.note
        })
        .then(res => {
            formEl.current.reset();
            loadNotes();
        })
        .catch(err => console.log(err));
    }
}

//removed {/* <div> 
//      <Nav />
//      <div className="container">
//          <div className='row'>
//              <form>
//                  <label>title</label>
//                  <input 
//                      onChange={handleInputChange}
//                      type='text'
//                      name='title'
//                  />
//                  <br></br>
//                  <label>note</label>
//                  <input
//                      onChange={handleInputChange} 
//                      type='textarea'
//                      name='body'
//                  />
//                  <br></br>
//                  <button
//                      onClick={handleFormSubmit}
//                  >Save Note</button>
//              </form>
//          </div>
//          <div className="row">
//              <div className="md-6 sm-2">
//                  <h1>first col</h1>
//                  {notes === null ? (
//                      <h3>No Notes to Display - Notes = NULL</h3>
//                  ):(
//                      (notes.length) ? (
//                          <div>
//                              {notes.map(note => (
//                                  <ListItem key={note._id}>
//                                  <Link to={"/notes/" + note._id}>
//                                      <strong>
//                                      {note.title}
//                                      </strong>
//                                  </Link>
//                                  <DeleteBtn onClick={() => deleteNote(note._id)} />
//                                  </ListItem>
//                              ))}
//                          </div>
//                      ):(
//                          <h3>No Notes to Display</h3>
//                      )
//                  )}
//              </div>
//              <div className="md-6 sm-10">
//                  <h1>2nd col</h1>
//              </div>
//          </div>
         
//      </div>
//  </div> */}
 
     
//      <Container fluid>
//          <Row>
//            <Col size="md-6">
//              <Card title="What's on your mind?">
//                <form ref={formEl}>
//                  <Input
//                    onChange={handleInputChange}
//                    name="title"
//                    placeholder="Title (required)"
//                  />
//                  <TextArea
//                    onChange={handleInputChange}
//                    name="note"
//                    placeholder="Enter your notes here (Required)"
//                  />
//                  <FormBtn
//                    disabled={!(formObject.note && formObject.title)}
//                    onClick={handleFormSubmit}
//                  >
//                    Save Note
//                  </FormBtn>
//                </form>
//                </Card>
//            </Col>
//            <Col size="md-6 sm-12">
//              <Card title="Previous Notes">
//                {notes.length ? (
//                  <List>
//                    {notes.map(note => (
//                      <ListItem key={note._id}>
//                        <Link to={"/notes/" + note._id}>
//                          <strong>
//                            {note.title} by {note.note}
//                          </strong>
//                        </Link>
//                        <DeleteBtn onClick={() => deleteNote(note._id)} />
//                      </ListItem>
//                    ))}
//                  </List>
//                ) : (
//                  <h3>No Results to Display</h3>
//                )}
//              </Card>
//            </Col>
//          </Row>
//        </Container>
 

return (
    <Container fluid>
        <Row>
          <Col size="md-6">
            <Card title="What's on your mind?">
              <form ref={formEl}>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <TextArea
                  onChange={handleInputChange}
                  name="note"
                  placeholder="Enter your notes here (Required)"
                />
                <FormBtn
                  disabled={!(formObject.note && formObject.title)}
                  onClick={handleFormSubmit}
                >
                  Save Note
                </FormBtn>
              </form>
              </Card>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="Previous Notes">
              {notes.length ? (
                <List>
                  {notes.map(note => (
                    <ListItem key={note._id}>
                      <Link to={"/notes/" + note._id}>
                        <strong>
                          {note.title} by {note.note}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => deleteNote(note._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

)
              }

export default Note;
