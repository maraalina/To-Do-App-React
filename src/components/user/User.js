import React, { Component } from 'react';
import Header from './header/Header';
import TaskList from './tasks/TaskList';
import AddTaskForm from './tasks/AddTaskForm';
import Sidebar from './tasks/sidebar/Sidebar'
import MediaQuery from '../layout/MediaQuery';

export default class User extends Component {

  render() {
    return (
        <div className="user">
          
            <MediaQuery 
              desktop={
                <div className="user__container">
                
                  <div className="side-bar">
                    <Sidebar />
                  </div>

                  <div className="todolist"> 
                    <Header />
                    <TaskList />
                    <AddTaskForm />
                  </div>

                </div>
              }

              mobile={
                <div className="user__container">
                  <div className="todolist__mobile"> 
                      <Header />
                      <TaskList />
                      <AddTaskForm />
                  </div>
                </div>
              }
            />
        </div>
    )
  }
}
