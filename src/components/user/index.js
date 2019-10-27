import React, { Component } from 'react';
import Header from './Header';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import PropTypes from 'prop-types';

export default class UserContainer extends Component {
  render() {
    const {
      title,
      toggleComplete,
      isCompleted,
      tasks,
      toggleCheckboxChange,
      toggleEditing,
      changeText,
      removeTask,
      newTaskSubmitHandler,
      pendingTask,
      handleValueChange,
      isClicked,
      toggleAddTask
    } = this.props;
    
    return (
        <div className="todolist">
            <Header
            title={title}
            toggleComplete={toggleComplete}
            isCompleted={isCompleted} 
          />

          <TaskList
            tasks={tasks}
            toggleCheckboxChange={toggleCheckboxChange}
            toggleEditing={toggleEditing}
            changeText={changeText}
            removeTask={removeTask}
            isCompleted={isCompleted}
          />

          <AddTaskForm 
            newTaskSubmitHandler={newTaskSubmitHandler}  
            pendingTask={pendingTask}
            handleValueChange={handleValueChange}
            isClicked={isClicked}
            toggleAddTask={toggleAddTask}
          />
        </div>
    )
  }
}

UserContainer.propTypes = {
  title: PropTypes.string.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  toggleCheckboxChange: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  changeText: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  newTaskSubmitHandler: PropTypes.func.isRequired,
  pendingTask: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  toggleAddTask: PropTypes.func.isRequired,

}
