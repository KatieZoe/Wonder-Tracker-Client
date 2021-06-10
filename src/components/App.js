import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from '../components/Home'
import Login from '../components/registrations/Login'
import Signup from '../components/registrations/Signup';
import ProfileForm from './profile/profileForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      isAdmin: false
    };
  }

  componentDidMount() {
    this.loginStatus();
    this.checklogin();
  };

  loginStatus = () => {
    axios.get('https://wonder-tracker.herokuapp.com/logged_in', { withCredentials: true }).then(response => {
      if(response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    }).catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
      isAdmin: data.user.admin
    })
  };

  handleLogout = () => {

    this.setState({
      isLoggedIn: false,
      user:{}
    })
  };
  checklogin = () => {
    const userLogginStatus = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('user_id');
    if(userId){
      axios.get(`https://wonder-tracker.herokuapp.com/users/${userId}`).then(response => {
        this.setState({
          isLoggedIn: userLogginStatus,
          user:response.data.user
        })
      }).catch(error => console.log('No user found:', error))
    }
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
            exact path ='/'
            render={ props => (
              <Home { ...props }
              loggedInStatus={ this.state.isLoggedIn }
              isAdmin={ this.state.isAdmin }
              user={ this.state.user }/>
            )}
            />
            <Route
            exact path ='/login'
            render={ props => (
              <Login {...props}
              handleLogin={ this.handleLogin }
              loggedInStatus={ this.state.isLoggedIn } />
              )}
              />
            <Route
            exact path ='/signup'
            render={props => (
              <Signup {...props} handleLogin={ this.handleLogin }
              loggedInStatus={ this.state.isLoggedIn } />
              )}
            />
          <Route path="/profileform">
            <ProfileForm/>
          </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
