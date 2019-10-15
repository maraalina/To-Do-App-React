import React from 'react';
import PropTypes from 'prop-types';

import CompletedTasks from './CompletedTasks'

// TODO: GET USER

const Header = props => {
    return (
          <header>
            <h1>{ props.title }</h1>
            <CompletedTasks
              toggleComplete={props.toggleComplete}
              isCompleted={props.isCompleted} 
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