import React from 'react';
import PropTypes from 'prop-types';

const Task = (props) => {
  if (props.isEditing) {
    return (
      <div>
        <input className="input-form"
            value={props.children}
            onChange={props.handleTextEdits}
        />

        <input 
            type="submit"
            value="Save"
        />

        <button type="button" className="cancel" onClick={props.handleToggleEditing}>
            Cancel
        </button>
      </div> 
    );
  }

  return (
    <span className="task-text" onClick={props.handleToggleEditing}>
      {props.children}
    </span>
  );
}

Task.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    handleTextEdits: PropTypes.func.isRequired
};

export default Task;