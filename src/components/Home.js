import React,{ useState } from 'react';
import Profile from './profile/profile';
import AdminDashboard from './AdminDashboard';
import ProfileForm from './profile/profileForm';
import Jobtracker from './jobs/jobtracker';
import Tasks from './tasks/tasks.js';
import { Button } from '@material-ui/core'
import './css/styles.css';


const Home = (props) => {

  const [showProfileForm, setShowProfileForm] = useState(props.showProfileForm ? props.showProfileForm : false);
  const [showTasks, setShowTasks] = useState(props.showTasks ? props.showTasks : false);
  const [showJobs, setShowJobs] = useState(props.showJobs ? props.showJobs : false);
  const [user, setUser] = useState(props.user);

  console.log(props.loggedInStatus)

  const openProfileForm = () => {
    setShowProfileForm(true);
  }

  const closeProfileForm = () => {
    setShowProfileForm(false);
  }

  const openJobs = () => {
    setShowJobs(true);
  }

  const closeJobs = () => {
    setShowJobs(false);
  }

  const openTasks = () => {
    setShowJobs(false);
    setShowTasks(true);
  }

  const closeTasks = () => {
    setShowTasks(false);
  }


  return (
    <div className='container'>

      { props.isAdmin ? (  <AdminDashboard user={ props }/> ) : null }

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
