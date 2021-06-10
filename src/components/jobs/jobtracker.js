import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import '../css/styles.css';
export default function Jobtracker(props) {

  const [jobsApplied, setJobsApplied] = useState([{
    "collateral": "1provided resume and cover letter url",
    "company_name": "1Alpha",
    "created_at": "2021-06-09T05:08:36.777Z",
    "id": 1,
    "jd": "Need of junior developer but should work as most senior developer, and should work 24*7 tech stack: entire technology ,salary: should work for free",
    "job_notes": "Moved to another round and asked me to build their project as assesment",
    "job_title": "Junior web developer",
    "status": 1,
    "updated_at": "2021-06-09T05:08:36.777Z",
    "user_id": 5
  }]);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log(props.userId);
      const jobs = await axios(`http://localhost:3001/jobtrackers/user/5`);
      console.log("jobs from server bassed on user",jobs);
       //jobsApplied = jobs.data.jobtracker;
      setJobsApplied(jobs.data.jobtracker );
    };

    fetchJobs();
  }, []);

  return(
    <div className="jobTracker">
      <p>Jobs tracker Page</p>
      {jobsApplied.map((job) => {
        return(
          <div>
            <p>Name: {job.company_name}</p>
            <p>Title: {job.job_title}</p>
          </div>
        )
      })}
      <h1>This is end of jobTracker</h1>
    </div>
  )

}
