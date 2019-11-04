import React, {Component} from 'react';
import { withContext } from '../app/AppContext';
import { withRouter } from 'react-router-dom';

// SIGN IN FORM
// INITIATES A PUT REQUEST TO THE SERVER
// REQUIRED TO HAVE {Bearer token_key} in the header
// EMAIL AND PASSWORD REQUIRED

class SignInForm extends Component {

    state = {
        email: '',
        password: ''
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
        this.props.signin(this.state)
            .then( () => this.props.history.push('/app/user'))
        this.clearInputs();
    }

    render() {
        return (
            <div className="auth-form">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>
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
                    <input className="signIn"value="Sign In" type="submit"></input>
                </form>
            </div>
        )
    }
}

export default withRouter(withContext(SignInForm));