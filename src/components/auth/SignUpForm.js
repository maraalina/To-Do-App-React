import React, {Component} from 'react';
import { withContext } from '../app/AppContext';
import { withRouter } from 'react-router-dom';

class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clearInputs = () => {
        this.setState({
            email: "",
            password: ""
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.state)
            .then( () => this.props.history.push('/app/user'))
        this.clearInputs();
    }

    render() {
        return (
            <div className="auth-form">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>
                    <div>
                        <label className="label" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <input 
                        className="signUp" 
                        value="Sign Up" 
                        type="submit"
                        ></input>
                </form>
            </div>
        )
    }


        // getDataFetch = async () => {
        
    //     const url = 'http://localhost:3000/signup'

    //     const options = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json; charset=utf-8' },
    //         body: JSON.stringify(this.state),
    //     }

    //     await fetch(url, options)
    //         .then(response => response.json())
    //         .then(data => this.props.handleToken(data.token))
    //         .catch()
    // }
}

export default withRouter(withContext(SignUpForm));