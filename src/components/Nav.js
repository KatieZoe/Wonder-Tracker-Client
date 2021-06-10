import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";

class Nav extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    let isLoggedin = localStorage.get
  }
  _handleClick = () => {
    axios
      .delete("https://wonder-tracker.herokuapp.com/logout", {
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('user_id', "");
        this.props.handleLogout(true);
        let history = useHistory();
        history.push('/login');
        // this.redirect();

      })
      .catch((error) => console.log(error));
  };

  redirect = () => {
     this.props.history.push("/signin");
  };

  render() {
    return (
      <nav className="nav">
        <div className="navlink">
          <Link to="/"> Home | </Link>
          {!this.props.loggedInStatus ? (
            <Link to="/login">Login | </Link>
          ) : null}
          {!this.props.loggedInStatus ? (
            <Link to="/signup">Sign Up  </Link>
          ) : null}
          {this.props.loggedInStatus ? (
            <Link to="/login" onClick={this._handleClick}>
              Log Out
            </Link>
          ) : null}
        </div>
      </nav>
    );
  }
}

export default Nav;
