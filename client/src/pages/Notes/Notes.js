
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