import React from 'react';
import PropTypes from 'prop-types';

const Task = (props) => {
  if (props.isEditing) {
    return (
      <form>
        <input 
          className="input-form"
          type="text"
          value={props.task}
          onChange={props.changeText}
        />

        <input 
          type="button"
          value="Save"
          onClick={props.handleToggleEditing}
        />

        <button 
          type="button"
          className="cancel" 
          onClick={props.handleToggleEditing}>
          Cancel
        </button>
    </form> 
    );
  }

  return (
    <li className="task">

      <input 
        type="checkbox"
        checked={props.isChecked}
        onChange={props.handleCheckboxChange}
      />

      <span className="task-text" onClick={props.handleToggleEditing}>
        {props.task}
      </span>

      <button
        className="remove-task" 
        onClick={props.removeTask}>✖  
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