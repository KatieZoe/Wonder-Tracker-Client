import React,{ useState, useEffect} from 'react';
import Profile from './profile/profile';
import AdminDashboard from './AdminDashboard';
import ProfileForm from './profile/profileForm';
import Jobtracker from './jobs/jobtracker';
import Tasks from './tasks/tasks.js';
import './css/styles.css';
import axios from 'axios';
import {Button} from '@material-ui/core';
const Home = (props) => {

  const [showProfileForm, setShowProfileForm] = useState(props.showProfileForm ? props.showProfileForm : false);
  const [showTasks, setShowTasks] = useState(props.showTasks ? props.showTasks : false);
  const [showJobs, setShowJobs] = useState(props.showJobs ? props.showJobs : true);
  const [user, setUser] = useState(props.user);



  useEffect(() => {
    console.log("showProfileForm changed");
    axios(`https://wonder-tracker.herokuapp.com/users/${props.user.id}`).then((response) => {
      console.log(response.data)
      setUser(response.data.user)
    })
    .catch((error) => {
      console.log("error in retriving user", error)
    })
  },[showProfileForm]);

  const openProfileForm = () => {
    setShowProfileForm(true);
    setShowJobs(false);
    setShowTasks(false);
  }

  const closeProfileForm = () => {
    setShowProfileForm(false);
    setShowJobs(true);
  }

  const openJobs = () => {
    setShowTasks(false);
    setShowJobs(true);
  }

  const closeJobs = () => {
    setShowJobs(false);
  }

  const openTasks = () => {
    setShowJobs(false);
    setShowProfileForm(false);
    setShowTasks(true);
  }

  const closeTasks = () => {
    setShowTasks(false);
    setShowJobs(true);
  }


  return (
    <div className='container'>

      { props.isAdmin ? (
        <AdminDashboard
        user={ props }/>
      ) : null }
      {!props.isAdmin ? (
        <div className="dashBoard">
          <div className="sideNav">
            <div className="profile">
              <Profile user={ user ? user : props.user}/>
              <Button variant="contained" color="secondary" onClick={openProfileForm}>
                Edit Profile
              </Button>
            </div>
            <div class="linkDiv">
              <button className="links" onClick={openJobs}> Job Tracker </button>
              <button className="links" onClick={openTasks}> Tasks </button>
            </div>
          </div>
          <div className="mainDiv">
            {showProfileForm &&
              <ProfileForm user={user ? user : props.user} onSubmit={closeProfileForm}/>
            }
            { showJobs && <Jobtracker user={props.user} onSubmit={closeJobs}/> }

            { showTasks && <Tasks user={props.user} onSubmit={closeTasks}/> }
          </div>

          </div>
        ) : null }

    </div>
  )
};
export default Home


// <div className="WelcomeMessage">
// <h1> Welcome to Wonder Tracker </h1>
// <p> The student outcomes tracker created especially for the GA outcomes program </p>
// </div>
