import React from 'react';
import PropTypes from 'prop-types';

const AddTaskForm  = props => {
    if (props.isClicked) {
        return (
            <form onSubmit={props.newTaskSubmitHandler}>
                <input className="input-form"
                    type="text"
                    value={props.pendingTask}
                    onChange={props.handleValueChange}
                    placeholder="Add a new task"
                />

                <input 
                    type="submit"
                    value="Save"
                />

                <button type="button" className="cancel" onClick={props.toggleAddTask}>
                    Cancel
                </button>

            </form>   
        )
    }

    return (
        <span className="action" onClick={props.toggleAddTask}>
            <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" data-svgs-path="sm1/plus.svg">
                    <path fillRule="currentColor" fill-rule="evenodd" d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"></path>
                </svg>
            </span>Add task
        </span>);  
}

AddTaskForm.propTypes = {
    newTaskSubmitHandler: PropTypes.func.isRequired,
    pendingTask: PropTypes.string.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    isClicked:PropTypes.bool.isRequired
}

export default AddTaskForm;