import React, { Component } from 'react';
import Header from './header/Header';
import TaskList from './tasks/TaskList';
import AddTaskForm from './tasks/AddTaskForm';
import Sidebar from './tasks/Sidebar'

export default class User extends Component {

  render() {
    return (
        <div className="user">
          <div className="user__container">

            <Sidebar />

            <div className="todolist"> 
              <Header />
              <TaskList />
              <AddTaskForm />
            </div>

          </div>
        </div>
    )
  }
}
