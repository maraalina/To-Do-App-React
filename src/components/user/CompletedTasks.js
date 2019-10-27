import React from 'react';
import PropTypes from 'prop-types';

// TODO: CHECK OR UNCHECK USING API METHODS

const CompletedTasks = ({ toggleComplete, isCompleted })=> {
    return (
        <label className="hide-tasks">
            <input 
            type="checkbox"
            onChange={toggleComplete}
            checked={isCompleted}
            /> Hide Completed tasks
        </label>
    );
}

CompletedTasks.propTypes = {
    toggleComplete: PropTypes.func.isRequired,
    isCompleted: PropTypes.bool.isRequired    
}

export default CompletedTasks;
