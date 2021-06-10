import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import '../css/styles.css';
import {
  Button
} from '@material-ui/core';
import JobTrackerForm from './jobTrackerForm';
import {Link} from 'react-router-dom';
import AddJob from './addJob';


export default function Jobtracker(props) {

  const [jobsApplied, setJobsApplied] = useState([]);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isAddJob, setIsAddJob] = useState(false);

  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {

      const jobs = await axios(`https://wonder-tracker.herokuapp.com/jobtrackers/user/${props.user.id}`);
      console.log("jobs from server bassed on user",jobs);
       //jobsApplied = jobs.data.jobtracker;
      setJobsApplied(jobs.data.jobtracker );
    };

    fetchJobs();
  }, []);
  const editJobDetails = (jobId) => {
    setIsEditEnabled(true);
    setIsAddJob(false);
    setJobId(jobId);
  }
  const hideJobForm = () => {
    setIsEditEnabled(false);
  }
  const addJob = () => {
    setIsAddJob(true);
  }
  const updateJobs = async () => {
    setIsAddJob(false);
    setIsEditEnabled(false);
    const jobs = await axios(`http://wonder-tracker.herokuapp.com/jobtrackers/user/${props.user.id}`);
    setJobsApplied(jobs.data.jobtracker );
  }
  return(
    <div className="jobTracker">
      <h2>Jobs tracker Page</h2>
        <Button variant="contained" color="secondary" onClick={addJob}>
          Add Job
        </Button>
        {
          isAddJob ? <AddJob userId={props.user.id} onCreate={updateJobs}/> : null
        }
      {jobsApplied.map((job, index) => {
        return(
          <>
            {!isEditEnabled ?  (
              <div class="jobDiv">
                <p><span>Name: </span> {job.company_name}</p>
                <p><span>Title: </span> {job.job_title}</p>
                <p><span>Resume and coverletter:</span> <Link href={job.job_collateral}> click to view</Link></p>
                <p><span>Job Description: </span> <Link href={job.jd}> {job.jd}</Link></p>
                <p><span>Job Notes: </span> {job.job_notes}</p>
                <Button variant="contained" color="secondary" onClick={() => editJobDetails(job.id)}>
                  Edit Job
                </Button>
              </div>

            ): jobId === job.id ? (
              <JobTrackerForm job={job} onUpdate={updateJobs}/>
            ) :   null
          }
          </>

        )
      })}



    </div>
  )

}
