import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

// TODO: CRUDE ACTIONS FOR TASK USING FETCH API METHODS

const Task = ({
  isEditing, 
  task, 
  handleToggleEditing, 
  isChecked, 
  handleCheckboxChange, 
  removeTask,
  toggleOffIsEditing
}) => {

  const [text, setText] = useState(task.name)

  if (isEditing) {
    return (
      <form>
        <input 
          className="input-form"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input 
          type="button"
          value="Save"
          onClick={() => handleToggleEditing(task._id, {isEditing: !isEditing, name: text})}
        />

        <button 
          type="button"
          className="cancel" 
          onClick={() => toggleOffIsEditing(task._id)}>
          Cancel
        </button>
    </form> 
    );
  }

  return (
    <li className="task">
      <label>
        <Checkbox
          checked={isChecked}
          onChange={() => handleCheckboxChange(task._id, {isChecked: !isChecked})}
        />
      </label>
        <span className="task-text" onClick={() => toggleOffIsEditing(task._id)}>
          {task.name}
        </span>
      

      <button
        className="remove-task" 
        onClick={removeTask}>✖  
      </button>
    </li>  
  );
}


Task.propTypes = {
    // task: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    handleToggleEditing: PropTypes.func.isRequired,
};

export default Task;