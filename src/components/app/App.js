import React from 'react';
import UserContainer from '../user';
import SignUpForm from '../auth/SignUpForm';
import SignInForm from '../auth/SignInForm';
import Header from '../layout/Header';
import ProtectedRoute from '../auth/ProtectedRoute';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// THERE SHOULD BE A GLOBAL NOTIFICATION SYSTEM 

class App extends React.Component {

  render() {
    return (
        <div className="wrapper">
          <Header />

          <Switch>
            <Route path='/signin' component={SignInForm} />
            <Route path='/signup' component={SignUpForm} />

            <ProtectedRoute path="/app/user">
              <UserContainer title="Welcome" /> 
            </ProtectedRoute>

            <Route exact path="/" render={() => <Redirect to="/app/user"/>}/>   
          </Switch>
        </div>
    );
  }
}

export default App;
