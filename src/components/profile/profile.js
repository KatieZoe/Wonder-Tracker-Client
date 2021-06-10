import React from "react";

export default function Profile(props){

  return(
    <div className="profileDiv">
      <img className="profilePic" src={props.user.image_url} alt={props.user.name} width="250px" height="250px"></img>
      <p><span>Name:</span> {props.user.name} </p>
      <p><span>Email:</span> {props.user.email} </p>
      <p><span>Linkedin:</span> {props.user.linkedin_url}</p>
      <p><span>Github:</span> {props.user.github_url}</p>
    </div>
  )
}
