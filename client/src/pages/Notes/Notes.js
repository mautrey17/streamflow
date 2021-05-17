import API from "../../utils/API";
import React, { useState, useEffect, useRef } from "react";
import { Input, TextArea, FormBtn, NewBtn } from "../../components/Form";
import { Columns } from 'react-bulma-components'
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import "./notes.css"


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
    <div style={{height:"90vh"}}>
      <div className="block">
      <h1 className="mt-3 title is-1 has-text-centered">Saved Notes</h1>
      </div>
    <Columns>
            <Columns.Column size="8">
            <div className="block ml-6 mt-3">
              <div className="box background">
                <form ref={formEl}>
                  <div className="field">
                    <label className="title is-3 mb-2">Title:</label>
                    <div className="control">
                      <input
                        className="input"
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Title (required)"
                      ></input>
                    </div>
                  </div>

                  <div className="field">
                    <label className="title is-3 mb-2">Note:</label>
                    <div className="control">
                      <textarea
                        className="textarea is-large"
                        onChange={handleInputChange}
                        name="note"
                        placeholder="Enter your notes here (Required)"
                      ></textarea>
                    </div>
                    
                  </div>
                  
                  {/* <TextArea
                    onChange={handleInputChange}
                    name="note"
                    placeholder="Enter your notes here (Required)"
                    // value={formObject.note}
                  /> */}
                  <div class="field">
                    <div class="buttons is-centered">
                    <button 
                        class="button is-link"
                        onClick={handleNewFormSubmit}
                      >
                        <span class="icon is-small">
                          <i class="fas fa-search-plus"></i>
                        </span>
                        <span>New Note</span>
                      </button>
                      <button 
                        class="button is-success"
                        disabled={!(formObject.note && formObject.title)}
                        onClick={handleFormSubmit}
                      >
                        <span class="icon is-small">
                          <i class="fas fa-check"></i>
                        </span>
                        <span>Save Note</span>
                      </button>
                    </div>
                  </div>
                </form>
                </div>
                </div>
            </Columns.Column>
            <Columns.Column size="4">
            <div className="block mx-3 mt-3">
              <div className="box background">
                {notes.length ? (
                 <div className="">
                    
                    {notes.map(note => (
                      <article className="message is-medium is-info">
                      <div className="message-header ">
                      <p onClick={() => loadNote(note._id)} className="" style={{ cursor: "pointer" }}>{note.title}</p>
                      <button onClick={() => deleteNote(note._id)} className="delete"></button>
                      </div>
                    </article>
                    ))}
                  </div>
                ) : (
                  <h3 className="title is-3">No Results to Display</h3>
                )}
                </div>
              </div>
            </Columns.Column>


    </Columns>
    </div>
  )
}

export default Note;
