import React from 'react';
import PropTypes from 'prop-types';

const Task = ({
  isEditing, 
  children, 
  handleToggleEditing, 
  handleTextEdits
}) => {
  
  if (isEditing) {
    return (
      <div>
        <input className="input-form"
            value={children}
            onChange={handleTextEdits}
        />

        <input 
            type="submit"
            value="Save"
        />

        <button type="button" className="cancel" onClick={handleToggleEditing}>
            Cancel
        </button>
      </div> 
    );
  }

  return (
    <span className="task-text" onClick={handleToggleEditing}>
      {children}
    </span>
  );
}

Task.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    handleTextEdits: PropTypes.func.isRequired
};

export default Task;