import React, { useState, useEffect } from "react";
import {Col, Row} from "../../components/Grid";
import { Columns, Container } from 'react-bulma-components'
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
            <Columns>
            <Columns.Column size="2">
                <div className="block ml-3">
                    <aside className="menu">
                        <p className="menu-label">Project Menu</p>
                        <ul className="menu-list">
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
                        </ul>
                    </aside>
                </div>
            </Columns.Column>
            <Columns.Column size="9">
            <h1 className="text-center">Current Projects</h1>
            <Columns>
            <ProjectCard />
            <ProjectCard />
            </Columns>
            <div className="mt-4">
                <h1 className="text-center">Upcoming Tasks</h1>
                <ToDo />
            </div>
            
            </Columns.Column>
            
            </Columns>
        </div>
    )
}

export default Dashboard;