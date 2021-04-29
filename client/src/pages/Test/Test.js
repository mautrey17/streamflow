import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import AUTH from '../../utils/AUTH';

function Test() {
  // Setting our component's initial state
  const [projects, setProjects] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);
  const [userInfo, setUserInfo] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadProjects();
    AUTH.getUser().then(res => {
      setUserInfo(res.data.user);
    });
  }, []);

  // Loads all books and sets them to books
  function loadProjects() {
    API.getProjects()
      .then(res => {
        // console.log(res.data.books);
        setProjects(res.data.projects);
      })
      .catch(err => console.log(err));
  };

  // // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.dueDate) {
      API.saveProject({
        title: formObject.title,
        dueDate: formObject.dueDate,
        owner: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            username: userInfo.username,
            id: "_" + userInfo._id
        }
      })
        .then(res => {
          formEl.current.reset();
          loadProjects();
        })
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Card title="Enter Project Information">
              <form ref={formEl}>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="dueDate"
                  placeholder="Due Date"
                />
                <FormBtn
                  disabled={!(formObject.dueDate && formObject.title)}
                  onClick={handleFormSubmit}
                >
                  Submit Book
                </FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="List of projects">
              {projects.length ? (
                <List>
                  {projects.map(projects => (
                    <ListItem key={projects._id}>
                      <Link to={"/projects/" + projects._id}>
                        <strong>
                          {projects.title} due {projects.dueDate} by {projects.owner.firstName} {projects.owner.lastName}
                        </strong>
                      </Link>
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
    );
  }


export default Test;
