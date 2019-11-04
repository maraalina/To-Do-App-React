import React from 'react';
import { withContext } from '../../app/AppContext'

const List = ({item, arr, handleTasksDisplay, currentList, todoLists}) => {
    let current = false;

    if (currentList === item.list._id) {
        current = true;
    }

    return (
        <li onClick={() => handleTasksDisplay(item.list._id, item.list.name)}>
            <div className={current ? 'current list': 'list'}>
                {item.list.name}
                <span className='tasks-count'>{item.tasks.length}</span>
            </div>
        </li>);
}

export default withContext(List);