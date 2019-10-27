import React from 'react';
import PropTypes from 'prop-types';

// TODO: CRUDE ACTIONS FOR TASK USING FETCH API METHODS

const Task = ({
  isEditing, 
  task, 
  changeText, 
  handleToggleEditing, 
  isChecked, 
  handleCheckboxChange, 
  removeTask 
}) => {

  if (isEditing) {
    return (
      <form>
        <input 
          className="input-form"
          type="text"
          value={task}
          onChange={changeText}
        />

        <input 
          type="button"
          value="Save"
          onClick={handleToggleEditing}
        />

        <button 
          type="button"
          className="cancel" 
          onClick={handleToggleEditing}>
          Cancel
        </button>
    </form> 
    );
  }

  return (
    <li className="task">

      <input 
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />

      <span className="task-text" onClick={handleToggleEditing}>
        {task}
      </span>

      <button
        className="remove-task" 
        onClick={removeTask}>✖  
      </button>
    </li>  
  );
}


Task.propTypes = {
    task: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    handleToggleEditing: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired
};

export default Task;