import React,{ useState, useEffect } from 'react';
import Nav from './Nav';
import Profile from './profile/profile';
import AdminDashboard from './AdminDashboard';
import { useHistory } from 'react-router-dom';
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
  //Checking whether user has logged in or
  const isLoggedin = localStorage.getItem('isLoggedIn');
  console.log("isloggedin : ", isLoggedin);

  if(!isLoggedin){
    history.push('/login');
  }

  useEffect(() => {
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
  const logout = () => {
    console.log("write code for logout here");
  }

  return (
    <div className='container'>
      <Nav
      loggedInStatus={ isLoggedin ? isLoggedin : true }
      />
      { props.isAdmin ? (
        <AdminDashboard
        user={ props }/>
      ) : null }
      {!props.isAdmin ? (
        <div class="dashBoard">
          <div class="sideNav">
            <div class="profile">
              <Profile user={ user ? user : props.user}/>
              <button onClick={openProfileForm}> Edit Profile</button>
            </div>
            <div class="linkDiv">
              <button className="links" onClick={openJobs}> Job Tracker </button>
              <button className="links" onClick={openTasks}> Tasks </button>
              <button className="links" onClick={logout}>Logout</button>
            </div>
          </div>
          <div class="maindiv">

            {showProfileForm &&
              <ProfileForm user={user ? user : props.user} onSubmit={closeProfileForm}/>
            }

            {showJobs &&
              <Jobtracker user={props.user} onSubmit={closeJobs}/>
            }

            {showTasks &&
              <Tasks user={props.user.id} onSubmit={closeTasks}/>
            }

          </div>
        </div>
      ): null }
    </div>
  )
};
export default Home
