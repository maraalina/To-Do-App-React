import React, { Component } from 'react';
import List from './List';
import { withContext } from '../../app/AppContext';

class Sidebar extends Component {

    state = { 
        name: "",
        active: false
    }

    toggleClass = () => {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === '') {
            console.log("Provide a name for your list")
        } else {
        this.props.addList(this.state)
            .then( () => {
                this.clearInputs();
            })
            .catch(err => console.error(err.response.data.message))
        }
    }
    
    clearInputs = () => {
        this.setState({
            name: ""
        })
    }

    handleTasksDisplay = (listId, listName) => {
        this.props.setCurrentList(listId, listName);
    }

    render() {
        return (
            <div className="side-bar">
                <div className="side-bar__container">
                    <ul>
                        {this.props.todoLists.map( (item, i, arr) => {
                            return (
                               <List
                                    key={item.list._id}
                                    item={item}
                                    arr={arr}
                                    handleTasksDisplay={this.handleTasksDisplay}
                               >
                               </List>
                            )}
                        )}
                    </ul>

                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input className="input-form"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Add a new todo list"
                        />

                        <input 
                            type="submit"
                            value="Save"
                        />
                    </form>   
                </div>
            </div>
        )
    }
} 

export default withContext(Sidebar);