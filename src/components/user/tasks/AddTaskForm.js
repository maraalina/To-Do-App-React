import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withContext } from '../../app/AppContext'

const AddTaskForm  = ({
    addTaskisClicked,
    toggleAddTask,
    currentList,
    addTask
}) => {
    
    const [pendingTask, setInput] = useState("")
    
    const handleSubmit = e => {
        e.preventDefault();
        if (pendingTask === '') {
            console.log("Can't have an empty task")
        } else {
        addTask({name: pendingTask, list: currentList})
        setInput("");
        }
    }

    if (addTaskisClicked) {
        return (    
            <form onSubmit={handleSubmit} autoComplete="off">
                <input className="input-form"
                    type="text"
                    value={pendingTask}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add a new task"
                />

                <input 
                    type="submit"
                    value="Add Task"
                />

                <button type="button" className="cancel" onClick={toggleAddTask}>
                    Cancel
                </button>
            </form>   
        )
    }

    return (
        <span className="action" onClick={toggleAddTask}>
            <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" data-svgs-path="sm1/plus.svg">
                    <path fillRule="currentColor evenodd" d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"></path>
                </svg>
            </span> Add task
        </span>);  
}

AddTaskForm.propTypes = {
    addTaskisClicked:PropTypes.bool.isRequired
}

export default withContext(AddTaskForm);