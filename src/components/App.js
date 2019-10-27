import React from 'react';
import UserContainer from './user';

// TODO: DO SOMETHING ABOUT THESE METHODS
// APP SHOULD INCLUDE A DEFAULT LAYOUT
// HEADER SHOULD BE THE SAME FOR ALL THE PAGES
// THERE SHOULD BE ROUTING
// THERE SHOULD BE GLOBAL NOTIFICATION SYSTEM 

class App extends React.Component {

  state = {
    isCompleted: false,
    addTaskisClicked: false,
    pendingTask: "",
    tasks : []
  }

  // Counter
  prevTaskId = 0;

  // Generates id's for each object in tasks array
  newTaskId = () => {
    const id = this.prevTaskId;
    this.prevTaskId += 1;
    return id;
  }
  
  /**
   * This method is used to create two functions that share the same logic:
   * toggleCheckboxChange() and toggleEditing().
   * Both methods have to update the state, more specifically the booleans: isChecked and isEditing - of the
   * components that initiated an event: onChange and onClick respectively
   */
  toggleTaskProperty = (property, id) => {
    this.setState( prevState => { 
      return {
        tasks: prevState.tasks.map( task => {
          if (id === task.id) {
            return {
              ...task,
              [property]: !task[property]
            }
          }
          return task;
        }),
      };
    });
  }

  toggleEditingAt = (property, id) => {
    this.setState( prevState => { 
      return {
        tasks: prevState.tasks.map( task => {
          if (id === task.id) {
            return {
              ...task,
              [property]: !task[property]
            }
          }
          return {
            ...task,
            [property]: false
          };
        }),
        addTaskisClicked: false 
      };
    });
  }

  // Updates the state of the "isChecked" property
  toggleCheckboxChange = (id) =>
    this.toggleTaskProperty("isChecked", id)

  // Updates the state of the "isEditing" property
  toggleEditing = (id) => 
    this.toggleEditingAt("isEditing", id)

  toggleAddTask = () => {
    this.setState( prevState => { 
      return {
        tasks: prevState.tasks.map( task => {
            return {
              ...task,
              isEditing: false
            }  
  }),
  addTaskisClicked: !this.state.addTaskisClicked
  }})
}

  // Updates the state of the Completed Tasks checkbox
  toggleComplete = () =>
    this.setState({ isCompleted: !this.state.isCompleted});

  // Updates the value of the input field
  handleValueChange = (e) =>
    this.setState({ pendingTask: e.target.value});

  // Removes a {task} from tasks array in state
  removeTask = (id) => {
    this.setState( prevState => { 
      return {
        tasks: prevState.tasks.filter(task => task.id !== id)
      };
    });
  } 

  // Updates the state in response to the event initiated by the submit button
  newTaskSubmitHandler = (e) => {
    e.preventDefault();
    const id = this.newTaskId();
    this.setState( prevState => {
      return {
        tasks: [
          // this merges the existing array in state with the new element created
          ...prevState.tasks,
          {
            text: prevState.pendingTask,
            isChecked: false,
            isEditing: false,
            id
          }
        ],
        pendingTask: ''
      }}
    );
  }

  // Updates the "text" property of a particular task based on the id provided
  changeText = (text, id) => {
    this.setState( prevState => { 
      return {
        tasks: prevState.tasks.map( task => {
          if (id === task.id) {
            return {
              ...task,
              text
            }
          }
          return task;
        })
      }
    });  
  }

  render() {
    return (
                <UserContainer 
                  title="To Do List"
                  toggleComplete={this.toggleComplete}
                  isCompleted={this.state.isCompleted} 
                  tasks={this.state.tasks}
                  toggleCheckboxChange={this.toggleCheckboxChange}
                  toggleEditing={this.toggleEditing}
                  changeText={this.changeText}
                  removeTask={this.removeTask}
                  newTaskSubmitHandler={this.newTaskSubmitHandler}  
                  pendingTask={this.state.pendingTask}
                  handleValueChange={this.handleValueChange}
                  isClicked={this.state.addTaskisClicked}
                  toggleAddTask={this.toggleAddTask}
                /> 
    );
  }
}

export default App;
