import React, { useState, useEffect } from "react";
import {Col, Row} from "../../components/Grid";
import ProjectCard from "../../components/ProjectCard";
import ToDo from "../../components/ToDo"
import Nav from "../../components/Nav";
import AddProjectModal from "../../components/AddProjectModal";
import AddTaskModal from "../../components/AddTaskModal";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


function Dashboard() {
  //set the initial state
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [taskModalIsOpen, setTaskIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }
  function openTaskModal() {
    setTaskIsOpen(true);
  }
  function closeTaskModal(){
    setTaskIsOpen(false);
  }

  useEffect(() => {
      //API call here and set state for projects
  });

    return(
        <div>
            <Row>
            <Col size="md-2 sm-2">
                <h2>Project Menu</h2>
                <div>
                    <AddProjectModal 
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        openModal={openModal}
                    />
                    <AddTaskModal 
                        modalIsOpen={taskModalIsOpen}
                        closeModal={closeTaskModal}
                        openModal={openTaskModal}
                    />
                </div>
            
            </Col>
            <Col size="md-9 sm-9">
            <h1 className="text-center">Current Projects</h1>
            <ProjectCard />
            <ProjectCard />
            <div className="mt-4">
                <h1 className="text-center">Upcoming Tasks</h1>
                <ToDo />
            </div>
            
            </Col>
            
            </Row>
        </div>
    )
}

export default Dashboard;