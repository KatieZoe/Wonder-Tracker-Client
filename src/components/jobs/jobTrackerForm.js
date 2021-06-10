import React,{ useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';

export default function JobTrackerForm(props) {
  const[job, setJob] = useState(props.job);
  const handleChange = (e, name) => {
    setJob({...job, [name]: e.target.value });

  }

  const updateJobDetails = () => {
    const postHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    console.log('job', job);
    axios.put(`https://wonder-tracker.herokuapp.com/jobtrackers/${props.job.id}`, job, { headers: postHeaders }).then((response) => {

    }).catch((error) => {
      console.log("error ocuured in updating user reason: ", error);
    })

    props.onUpdate(false);
  }
  return(
    <>
      <TextField
        fullWidth

        label="Comapny Name"
        margin="normal"
        name="company_name"
        type="text"
        onChange={(e) => handleChange(e, "company_name")}
        value={job.company_name ? job.company_name : props.job.company_name}
        variant="outlined"
      />
      <TextField
        fullWidth

        label="Job Title"
        margin="normal"
        name="job_title"
        type="text"
        onChange={(e) => handleChange(e, "job_title")}
        value={job.job_title ? job.job_title : props.job.job_title}
        variant="outlined"
      />
      <TextField
        fullWidth

        label="Resume and cover letter links"
        margin="normal"
        name="job_collateral"
        type="text"
        onChange={(e) => handleChange(e, "collateral")}
        value={job.collateral ? job.collateral : props.job.collateral}
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
        value={job.jd ? job.jd : props.job.jd}
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Job Notes"
        margin="normal"
        name="job_notes"
        type="text"
        onChange={(e) => handleChange(e, "job_notes")}
        value={job.job_notes ? job.job_notes : props.job.job_notes }
        variant="outlined"
      />
      <Button variant="contained" color="secondary" onClick={updateJobDetails}>
        Update
      </Button>
    </>
  )
}
