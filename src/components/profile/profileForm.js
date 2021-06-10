import React,{ useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';

export default function ProfileForm(props) {

  const[user, setUser] = useState(props.user);
  const handleChange = (e, name) => {
    console.log("handle al changes to the user");
    console.log("NAME", name);
    //setUser({}{[name]: e.target.value});
    setUser({...user, [name]: e.target.value });
    console.log(user);
    // setUser(user => [...user, {[name]: e.target.value}])
    // history.push('/profile');


  }
  const handleSubmit = (event) => {
    event.preventDefault()
    //let id = history.location.state.user.id;

    const postHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    axios.put(`http://wonder-tracker.herokuapp.com/users/${props.user.id}`, {user}, { headers: postHeaders }).then((response) => {
      let user = response.data;
      console.log("updated user information", user);
    }).catch((error) => {
      console.log("error ocuured in updating user reason: ", error);
    })
    props.onSubmit(false);
  }
  return(

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
          <h1>Edit Profile</h1>
        </Typography>
      </Box>
      <form onSubmit={ handleSubmit }>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          onChange={(e) => handleChange(e, "name")}
          type="text"
          value={user.name ? user.name : "" }
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onChange={(e) => handleChange(e, "email")}
          type="text"
          value={user.email ? user.email : ""}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Linkedin"
          margin="normal"
          name="linkedin_url"
          onChange={(e) => handleChange(e, "linkedin_url")}
          type="text"
          value={user.linkedin_url ? user.linkedin_url : ""}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Github"
          margin="normal"
          name="github_url"
          onChange={(e) => handleChange(e, "github_url")}
          type="text"
          value={user.github_url ? user.github_url : ""}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Image URL"
          margin="normal"
          name="image_url"
          onChange={(e) => handleChange(e, "image_url")}
          type="text"
          value={user.image_url ? user.image_url : ""}
          variant="outlined"
        />
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </form>
    </Container>


  )
}
