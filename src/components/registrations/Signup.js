import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     }
  };

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [ name ]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, password, password_confirmation } = this.state
    let user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('https://wonder-tracker.herokuapp.com/users', { user }, { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user_id', user.id);
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    }).catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return(
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li>key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    const { name, email, password, password_confirmation} = this.state

    return (
      <>
        <Container maxWidth="sm">
          <Box
            sx={{
              pb: 1,
              pt: 3
            }}
          >
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              Signup
            </Typography>
          </Box>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              onChange={this.handleChange}
              type="text"
              value={name}
              variant="outlined"
            />
            <br/>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              onChange={this.handleChange}
              type="email"
              value={email}
              variant="outlined"
            />
            <br/>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={this.handleChange}
              type="text"
              value={password}
              variant="outlined"
            />
            <br/>
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="password_confirmation"
              onChange={this.handleChange}
              type="password"
              value={password_confirmation}
              variant="outlined"
            />
            <br/>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up
              </Button>
            </Box>
          </form>
          <Typography
          color="textSecondary"
          variant="body1"
          >
            Already have an account?
            {' '}
          <Link
            to="/login"
            variant="h6"
          >
            Login
          </Link>
        </Typography>
          <div>
          { this.state.errors ? this.handleErrors() : null }
          </div>
      </Container>
      </>
    );
  }
}
export default Signup;
