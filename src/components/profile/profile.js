import React from 'react';

export default function Profile(props){



  return(
    <>
      <img src={props.user.image_url} alt={props.user.name} width="250px" height="250px"></img>
      <h1>Name: {props.user.name} </h1>
      <p>Email: {props.user.email} </p>
      <p>Linkedin: {props.user.linkedin_url}</p>
      <p>Github: {props.user.github_url}</p>
    </>
  )
}
