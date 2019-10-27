import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task'

// TODO: GET ALL TASKS

const TaskList = ({ 
    tasks, 
    isCompleted,
    toggleCheckboxChange, 
    toggleEditing, 
    changeText, 
    removeTask
}) =>
 
    <React.Fragment>
        {tasks
            .filter( task => !isCompleted || !task.isChecked)
            .map((task, index) => 
            <Task
                key={index}
                task={task.text}
                isChecked={task.isChecked}
                isEditing={task.isEditing}
        
                handleCheckboxChange={ () => toggleCheckboxChange(task.id)}
                handleToggleEditing={() => toggleEditing(task.id)}
                changeText={e => changeText(e.target.value, task.id)}
                removeTask={() => removeTask(task.id)}
            />
        )}
    </React.Fragment>

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    toggleCheckboxChange: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    isCompleted: PropTypes.bool.isRequired
};

export default TaskList;