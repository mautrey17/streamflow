import API from "../../utils/API";
import React, { useState, useEffect, useRef } from "react";
import { Input, TextArea, FormBtn, NewBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import "../Notes/notes.css"

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

  //load one note and set to notes per note ID
  function loadNote (id) {
    API.getNote(id)
    .then(res => {
      setFormObject(res.data.note)
      formEl.current[0].defaultValue=res.data.note.title
      formEl.current[1].defaultValue=res.data.note.note
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
  function handleNewFormSubmit(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setFormObject({[name]: value})
    formEl.current[0].defaultValue=''
    formEl.current[1].defaultValue=''
  }

  function handleFormSubmit(event){
    event.preventDefault();
    if (formObject._id) {
      API.updateNote(
        formObject._id,
        {
        title: formObject.title,
        note: formObject.note
        }
      )
      .then(res => {
        console.log('updated',formObject);
        formEl.current[0].defaultValue=formObject.title
        formEl.current[1].defaultValue=formObject.note  
        formEl.current.reset();
        loadNotes();
      })
      .catch(err => console.log(err));
    } else if (formObject.title && formObject.note){
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
                // value={formObject.note}
              />
              <NewBtn
                onClick={handleNewFormSubmit}
              >
                New Note
              </NewBtn>
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
                    <button onClick={() => loadNote(note._id)}>
                      {note.title}
                    </button>
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
