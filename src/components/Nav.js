import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Nav extends Component {


  _handleClick = () => {
    axios
      .delete("https://wonder-tracker.herokuapp.com/logout", {
        withCredentials: true,
      })
      .then((response) => {
        this.props.handleLogout();
        this.redirect();
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
          {!this.props.isLoggedIn ? (
            <Link to="/login">Login | </Link>
          ) : null}
          {!this.props.isLoggedIn ? (
            <Link to="/signup">Sign Up | </Link>
          ) : null}
          {this.props.isLoggedIn ? (
            <Link to="/logout" onClick={this._handleClick}>
              Log Out
            </Link>
          ) : null}
        </div>
      </nav>
    );
  }
}

export default Nav;
