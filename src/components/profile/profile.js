import React, {useState} from "react";
//import useFetch from "./useFetch";

// {"user":{"id":1,"name":"Bhavya Govind","email":"ba@ga.com","password_digest":"$2a$12$lYY.h6BsEAN11/1cgY8aPOnKmV2n9G..J26fBv69FJZA2sVRKqxq2","admin":true,"image_url":"https://miro.medium.com/fit/c/1360/1360/0*6YrUAN2jxVKwGC_-.","linkedin_url":"www.linkedin.com","github_url":"www.github.com","student_status":true,"cohort_id":1,"created_at":"2021-06-08T00:12:32.051Z","updated_at":"2021-06-08T00:12:32.051Z"}}

export default function Profile(props){
  return(
    <div>
      
      <h1>{props.user.name}</h1>

    </div>
  )

}
