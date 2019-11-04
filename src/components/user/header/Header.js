import React from 'react';
import { withContext } from '../../app/AppContext'

// import CompletedTasks from './CompletedTasks'

const Header = ({ currentListName, isCompleted, toggleComplete }) => {

    return (
          <header>
            <h2 className='user-current-list'>{ currentListName }</h2>
            {/* <CompletedTasks 
              isCompleted={isCompleted}
              toggleComplete={toggleComplete}
            /> */}
          </header>
        );
  }

export default withContext(Header);