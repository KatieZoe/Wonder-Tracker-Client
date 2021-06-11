import React,{ useState, useEffect } from 'react';
import axios from 'axios';import '../css/styles.css';
import {
  Button,
  TextField
} from '@material-ui/core';



export default function AddJob(props) {
  const [job, setJob] = useState();

  const handleChange = (e , name) => {
    setJob({...job, [name]: e.target.value });
  }
  const handleSubmit = () => {
    const postHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    job.user_id = props.userId;
    axios.post(`http://wonder-tracker.herokuapp.com/jobtrackers/`, job, { headers: postHeaders }).then((response) => {

    }).catch((error) => {
      console.log("error ocuured in updating user reason: ", error);
    })

    props.onCreate(false);
  }
  return (
    <>
    <TextField
      fullWidth

      label="Comapny Name"
      margin="normal"
      name="company_name"
      type="text"
      onChange={(e) => handleChange(e, "company_name")}
      value={job ? job.company_name : ""}
      variant="outlined"
    />
    <TextField
      fullWidth

      label="Job Title"
      margin="normal"
      name="job_title"
      type="text"
      onChange={(e) => handleChange(e, "job_title")}
      value={job ? job.job_title : ""}
      variant="outlined"
    />
    <TextField
      fullWidth

      label="Resume and cover letter links"
      margin="normal"
      name="job_collateral"
      type="text"
      onChange={(e) => handleChange(e, "collateral")}
      value={job ? job.collateral : ""}
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Job Description"
      margin="normal"
      name="jd"
      type="text"
      onChange={(e) => handleChange(e, "jd")}
      rows={4}
      rowsMax={8}
      value={job ? job.jd : ""}
      variant="outlined"
    />

    <TextField
      fullWidth
      label="Job Notes"
      margin="normal"
      name="job_notes"
      type="text"
      onChange={(e) => handleChange(e, "job_notes")}
      value={job ? job.job_notes : "" }
      variant="outlined"
    />
    <Button variant="contained" color="secondary" onClick={handleSubmit}>
      Submit Job
    </Button>
    </>

  )

}
