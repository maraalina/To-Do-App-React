import React, { Component } from 'react';
import { createContext } from 'react';
import axios from "axios";

const todoAxios = axios.create();

// Adds the token to the request header
todoAxios.interceptors.request.use( (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const AppContext = createContext();

export class AppContextProvider extends Component {
    state = {
        todoLists: JSON.parse(localStorage.getItem('todoLists')) || [],
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        isLogged: localStorage.getItem('isLogged') || false,
        currentList: localStorage.getItem('currentList') || "",
        currentListName: localStorage.getItem('currentListName') || "",
        addTaskisClicked: false

    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    signup: this.signup,
                    signin: this.signin,
                    signout: this.signout,
                    getTasks: this.getTasks,
                    addList: this.addList,
                    addTask: this.addTask,
                    editTodo: this.editTodo,
                    deleteTodo: this.deleteTodo,
                    toggleOffIsEditing: this.toggleOffIsEditing,
                    setCurrentList: this.setCurrentList,
                    handleCurrentListTasks: this.handleCurrentListTasks,
                    toggleAddTask: this.toggleAddTask,
                    ...this.state
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }

    // Authentication methods: Sign In, Sign Up, Sign Out
    signup = async (userInfo) => {
        const url = 'http://localhost:3000/signup'
        await todoAxios.post(url, userInfo)
            .then(response => {
                const { token } = response.data;
                this.setState({
                    token,
                    isLogged: !this.state.isLogged
                })

                localStorage.setItem("token", token)
                localStorage.setItem("isLogged", !this.state.isLogged)
                
                this.getUserInfo();
                return response;
            })
            .then( () => {
                // Creates a new list for the new user
                this.addList({name: "Inbox"})
                    .then(response => {
                        this.setState({currentList: response.data.data._id, currentListName: response.data.data.name })
                        localStorage.setItem('currentListName', response.data.data.name);
                    })  
            })
    }
    
    signin = async (credentials) => {
        const url = 'http://localhost:3000/signin'
        await todoAxios.post(url, credentials)
            .then(response => {
                try {
                    console.log('Signed in')
                    const { token } = response.data;
                    this.setState({
                        token,
                        isLogged: !this.state.isLogged
                    })
                    
                    localStorage.setItem('token', token)
                    localStorage.setItem('isLogged', !this.state.isLogged)
        
                    this.getUserInfo();
                    this.getLists();
        
                    return response;
                } catch(error) {
                    console.error(error);
                }
            })
    }

    signout = () => {
        localStorage.removeItem('todoLists');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isLogged');
        localStorage.removeItem('currentList');
        localStorage.removeItem('currentListName');

        this.setState({
            todoLists: [],
            user: {},
            token: "",
            isLogged: !this.state.isLogged,
            currentList: "",
            currentListName: "",
            addTaskisClicked: false
        })
    }

    /**
     * Method that makes a request for user data
     * Updates the state property: user 
     */
    getUserInfo = async () => {
        const url = 'http://localhost:3000/api/user';
        await todoAxios.get(url)
            .then(response => {
                this.setState({ user: response.data.data })
                localStorage.setItem('user', JSON.stringify(response.data.data))   
            })
    }

    // CRUDE methods
    // Makes a GET request for the lists array
    // Inside of the method for each list another GET request is intialized
    getLists = async () => {
        const urlList = 'http://localhost:3000/api/list';
        await todoAxios.get(urlList)
            .then( response => {
                const firstList = response.data.data[0];

                // Sets the first list as current list
                if (this.state.currentList === "") {
                    this.setCurrentList(firstList._id, firstList.name)
                }

                /** 
                 * Goes through every element of the lists array and for 
                 * each element the GET request is initialized with the help of
                 * @func getTasks()
                 * Every time the request is processed and response received, the 
                 * method updates the state
                 * */
                response.data.data.forEach( list => {
                    this.getTasks(list._id)
                        .then( response => {
                            this.setState(prevState => {
                                return { todoLists: [ ...prevState.todoLists, {list: list, tasks: response}] }
                            })
                            localStorage.setItem('todoLists', JSON.stringify(this.state.todoLists))
                        })
                })
            })
    }

    /**
     * Requests all the tasks that a user has and then based on the listId
     * Creates an array coresponding to each list and returns it;
     * The returned array is handled in the @func getLists() method
     */
    getTasks = async (listId) => {
        const url = 'http://localhost:3000/api/item';
        return await todoAxios.get(url)
            .then(response => { 
                const taskArr = [];
                response.data.data.forEach( task => {
                    if (task.list === listId) {
                        taskArr.push(task)
                    }
                })
                return taskArr;
            })
    }
    
    /**
     * Makes POST request to add a new list
     * Also the state is updated in order to reflect the changes in the UI
     */
    addList = async (newList) => {
        const url = 'http://localhost:3000/api/list';
        return await todoAxios.post(url, newList)
            .then(response => {
                this.setState(prevState => {
                    return { todoLists: [ ...prevState.todoLists, {list: response.data.data, tasks: []} ]}
                });
                localStorage.setItem('todoLists', JSON.stringify(this.state.todoLists));
                return response;
            })
    }
    
    /**
     * Makes POST request to add a new task
     * Also the state is updated in order to reflect the changes in the UI
     */
    addTask = async (newTodo) => {
        const url = 'http://localhost:3000/api/item';
        await todoAxios.post(url, newTodo)
            .then( response => {
                    this.setState( prevState => {
                        return {
                            todoLists: prevState.todoLists.map( item => {
                                if (item.list._id === this.state.currentList) {
                                    return {
                                            ...item,
                                            tasks: [...item.tasks, response.data.data]
                                    }
                                } 
                                return item;
                            })
                        }
                    })
                localStorage.setItem('todoLists', JSON.stringify(this.state.todoLists));
                return response
            })
    }

     /**
     * Makes PUT request to add a new task
     * Also the state is updated in order to reflect the changes in the UI
     */
    editTodo = async (todoId, todo) => {
        // console.log(todo)
        const url = `http://localhost:3000/api/item/${todoId}`;
        await todoAxios.put(url, todo)
            .then(response => {
                this.setState(prevState => {
                    console.log(response.data)

                    /**
                     * After the request has been processesd and the response 
                     * received the state is set the following way:
                     * 1st - we need to iterate through the state array and find the object that
                     * contains the currentList which is the one that initiated the change
                     * 2nd - if we find the list, we start iterating through the tasks array
                     * of the currentList; we look for the element with the @param todoId passed
                     * to the function
                     */
                    const updatedTodoLists = prevState.todoLists.map( item => {
                            if (item.list._id === this.state.currentList) {
                                const updatedTasks = item.tasks.map( property => {
                                        if (property._id === todoId) {
                                            // console.log(response)
                                            // console.log(response.data.data)
                                            return response.data.data
                                        }
                                        return property;
                                    })
                                    // console.log(updatedTasks)
                                    return {
                                            ...item,
                                            tasks: updatedTasks
                                    }
                                } 
                            return item;
                            })
                    return {todoLists: updatedTodoLists} ;        
                    })
                    // console.log(this.state.todoLists)
                    localStorage.setItem('todoLists', JSON.stringify(this.state.todoLists));    
                return response; 
            })
    }

    // Method that sets the editing mode on for one task and turns it off for all other tasks
    toggleOffIsEditing = (todoId) => {
        this.setState(prevState => {
            const updatedTodoLists = prevState.todoLists.map(item => {
                if (item.list._id === this.state.currentList) {
                    const updatedTasks = item.tasks.map( task => {
                        if (task._id === todoId) {
                            return {...task, isEditing: !task.isEditing}
                        }
                        return {...task, isEditing: false} // setting the other task isEditing off
                    })
                    return {
                        ...item,
                        tasks: updatedTasks
                    }
                }
                return item;
            })
            return {todoLists: updatedTodoLists}
        })
    }

    // Deletes a todo from the list
    deleteTodo = async (todoId) => {
        const url = `http://localhost:3000/api/item/${todoId}`;
        await todoAxios.delete(url)
            .then(response => {
                this.setState(prevState => {
                    const updatedTodoList = prevState.todoLists.map( item => {
                        if (item.list._id === this.state.currentList) {
                            const updatedTasks = item.tasks.filter( property => {
                                    return property._id !== todoId
                                })
                                return {
                                        ...item,
                                        tasks: updatedTasks
                                }
                            } 
                        return item;
                        })
                return {todoLists: updatedTodoList} ;        
                })
                console.log(this.state.todoLists)
                localStorage.setItem('todoLists', JSON.stringify(this.state.todoLists));      
            })
    }

    // Helper Methods

    /**
     * Method that handles the change of the curretList in state
     * Is triggered in the Sidebar component when the user clicks on a list
     * and when setting the first list as default
     */
    setCurrentList = (listId, listName) => {
        this.setState({ currentList: listId, currentListName: listName })
        localStorage.setItem('currentList', listId);
        localStorage.setItem('currentListName', listName);
    }

    /** 
     * Retrieves the array of tasks for the current list 
     * @currentList (state) - id of the current list
     */
    handleCurrentListTasks = () => {
        for (let item of this.state.todoLists) {
            if (item.list._id === this.state.currentList) {
                return item.tasks
            }
        }
        return [] // ??
    }

    // toggle between adding a task mode
    toggleAddTask = () => {
        this.setState( {addTaskisClicked: !this.state.addTaskisClicked} )
        this.toggleOffIsEditing(1);
    } 
}
    
/**
 * HOC that wraps a component so it is able to consume the Context
 */
export const withContext = Component => {
    return props => {
        return (
            <AppContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component 
                                {...globalState}
                                {...props}
                            />
                        )
                    }
                }
            </AppContext.Consumer>
        )
    }
}