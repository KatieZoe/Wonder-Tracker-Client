import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import '../css/styles.css';
import {
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import JobTrackerForm from './jobTrackerForm';

export default function Jobtracker(props) {

  const [jobsApplied, setJobsApplied] = useState([]);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log(props.userId);
      const jobs = await axios(`http://wonder-tracker.herokuapp.com/jobtrackers/user/${props.user.id}`);
      console.log("jobs from server bassed on user",jobs);
       //jobsApplied = jobs.data.jobtracker;
      setJobsApplied(jobs.data.jobtracker );
    };

    fetchJobs();
  }, [isEditEnabled,jobId]);
  const editJobDetails = (jobId) => {
    setIsEditEnabled(true);
    setJobId(jobId)
  }
  const hideJobForm = () => {
    setIsEditEnabled(false);
  }

  return(
    <div className="jobTracker">
      <h2>Jobs tracker Page</h2>
      {jobsApplied.map((job, index) => {
        return(
          <>
            {!isEditEnabled ?  (
              <div class="jobDiv">
                <p><span>Name: </span> {job.company_name}</p>
                <p><span>Title: </span> {job.job_title}</p>
                <p><span>Resume and coverletter:</span> {job.job_collateral}</p>
                <p><span>Job Description: </span> {job.jd}</p>
                <p><span>Job Notes: </span> {job.job_notes}</p>
                <Button variant="contained" color="primary" onClick={() => editJobDetails(job.id)}>
                  Edit Job
                </Button>
              </div>

            ): jobId === job.id ? (
              <JobTrackerForm job={job} onUpdate={hideJobForm}/>
            ) : ''}

          </>

        )
      })}

    </div>
  )

}
