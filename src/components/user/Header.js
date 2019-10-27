import React from 'react';
import PropTypes from 'prop-types';

import CompletedTasks from './CompletedTasks'

// TODO: GET USER

const Header = ({ 
  title, 
  toggleComplete, 
  isCompleted 
}) => {

    return (
          <header>
            <h1>{ title }</h1>
            <CompletedTasks
              toggleComplete={ toggleComplete }
              isCompleted={ isCompleted } 
            />
          </header>
        );
  }

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired
}

export default Header;