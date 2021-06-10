import React from "react";

export default function Profile(props){
  return(
    <div>

      <h3> {props.user.name}</h3>

  return(
    <>
      <img className="profilePic" src={props.user.image_url} alt={props.user.name} width="250px" height="250px"></img>
      <h3>Name: {props.user.name} </h3>
      <h3>Email: {props.user.email} </h3>
      <h5>Linkedin: {props.user.linkedin_url}</h5>
      <h5>Github: {props.user.github_url}</h5>
    </>
  )
}
