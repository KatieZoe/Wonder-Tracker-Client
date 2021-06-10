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


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: ''
    }
  }

  componentWillMount() {
  return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, password } = this.state

    let user = {
      name: name,
      email: email,
      password: password
    }
    axios.post('https://wonder-tracker.herokuapp.com/login', { user }, { withCredentials: true }).then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
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
  };

  handleErrors = () => {
    return(
      <div>
         <ul>
           {this.state.errors.map(error => {
           return <li key={error}>{error}</li>
            })}
         </ul>
     </div>
    )
  }

  render() {
    const { name, email, password } = this.state

    return (
      <>
        <Container
        maxWidth="sm"
        className="LoginForm"
          >
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
              Login
            </Typography>
          </Box>
          <form onSubmit={ this.handleSubmit }>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              onChange={ this.handleChange }
              type="text"
              value={ name }
              variant="outlined"
            />
            <br/>
            <TextField
              fullWidth
              label="email"
              margin="normal"
              name="email"
              onChange={ this.handleChange }
              type="email"
              value={ email }
              variant="outlined"
            />
            <br/>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={ this.handleChange }
              type="password"
              value={ password }
              variant="outlined"
            />
            <br/>
            <Box sx={ { py: 2 } }>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log in
              </Button>
            </Box>
          </form>
          <Typography
          color="textSecondary"
          variant="body1"
          >
            Don&apos;t have an account?
            {' '}
          <Link
            to="/signup"
            variant="h6"
          >
            Sign up
          </Link>
        </Typography>
          <div>
            { this.state.errors ? this.handleErrors() : null }
          </div>
        </Container>
      </>
    )
  }
}
export default Login;
