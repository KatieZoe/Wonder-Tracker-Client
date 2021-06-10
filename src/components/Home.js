import React,{ useState, useEffect } from 'react';
import Profile from './profile/profile';
import Nav from './Nav';
import AdminDashboard from './AdminDashboard';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import ProfileForm from './profile/profileForm';
import Jobtracker from './jobs/jobtracker';
import Tasks from './tasks/tasks.js';
import './css/styles.css';


const Home = (props) => {

  const [showProfileForm, setShowProfileForm] = useState(props.showProfileForm ? props.showProfileForm : false);
  const [showTasks, setShowTasks] = useState(props.showTasks ? props.showTasks : false);
  const [showJobs, setShowJobs] = useState(props.showJobs ? props.showJobs : false);
  const [user, setUser] = useState(props.user);
  let history = useHistory()

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
    setShowTasks(true);
  }

  const closeTasks = () => {
    setShowTasks(false);
  }

  return (
    <div className='container'>

      <Nav isLoggedIn={ props.loggedInStatus}/>

      { props.isAdmin ? ( <AdminDashboard user={ props }/> ) : null }

      { !props.isAdmin ?  (
        <div class="dashBoard">
          <div class="sideNav">
            <div class="profile">
              <Profile user={user ? user : props.user}/>
              <button onClick={openProfileForm}> Edit Profile</button>
            </div>
            <div class="linkDiv">
              <button className="links" onClick={openJobs}> Job Tracker </button>
              <button className="links" onClick={openTasks}> Tasks </button>
            </div>
          </div>

          <div class="maindiv">
            { showProfileForm && <ProfileForm user={props.user.id} onSubmit={closeProfileForm}/> }

            { showJobs && <Jobtracker user={props.user} onSubmit={closeJobs}/> }

            { showTasks && <Tasks user={props.user.id} onSubmit={closeTasks}/> }
          </div>

        </div>
      ) : null }

    </div>
  )
};
export default Home
