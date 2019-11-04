import React from 'react';
import Task from './Task'
import { withContext } from '../../app/AppContext'

const TaskList = ({
    addTaskisClicked,
    toggleAddTask,
    handleCurrentListTasks,
    editTodo,
    deleteTodo,
    toggleOffIsEditing
}) => {

    const handleChange = (todoId, todo) => {
        // will toggle between true and false isChecked and isEditing
        editTodo(todoId, todo);
        console.log(todo)
    }

    const toggleEditing = (todoId) => {
        toggleOffIsEditing(todoId);
        if (addTaskisClicked) {
            toggleAddTask()
        }
    }

    let tasks = handleCurrentListTasks();
    
    return (
    <React.Fragment>
        {tasks
            // !false - instead of false there was a bool that was used to toggle between showing or
            // hiding the checked tasks, removed the functionality for now, will reimplement in another
            // way
            .filter( task => !false || !task.isChecked)
            .map( task => {
                return (
                    <Task
                        key={task._id}
                        task={task}
                        isChecked={task.isChecked}
                        isEditing={task.isEditing}

                        handleCheckboxChange={handleChange}
                        handleToggleEditing={handleChange}
                        toggleOffIsEditing={toggleEditing}
                        removeTask={() => deleteTodo(task._id)}
                    />)
            }
        )}
    </React.Fragment>
)}

export default withContext(TaskList);