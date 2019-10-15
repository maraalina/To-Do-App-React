import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task'

const TaskList = props =>
    <ul>
        
        {props.tasks
            .filter( task => !props.isCompleted || !task.isChecked)
            .map((task, index) => 
            <Task
                key={index}
                task={task.text}
                isChecked={task.isChecked}
                isEditing={task.isEditing}
        
                handleCheckboxChange={ () => props.toggleCheckboxChange(task.id)}
                handleToggleEditing={() => props.toggleEditing(task.id)}
                changeText={e => props.changeText(e.target.value, task.id)}
                removeTask={() => props.removeTask(task.id)}
            />
        )}
    </ul>

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    toggleCheckboxChange: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    isCompleted: PropTypes.bool.isRequired
};

export default TaskList;