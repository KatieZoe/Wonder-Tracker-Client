import React,{ useState } from 'react';
import Profile from './profile/profile';
import AdminDashboard from './AdminDashboard';
import ProfileForm from './profile/profileForm';
import Jobtracker from './jobs/jobtracker';
import Tasks from './tasks/tasks.js';
import './css/styles.css';


const Home = (props) => {

  const [showProfileForm, setShowProfileForm] = useState(props.showProfileForm ? props.showProfileForm : false);
  const [showTasks, setShowTasks] = useState(props.showTasks ? props.showTasks : false);
  const [showJobs, setShowJobs] = useState(props.showJobs ? props.showJobs : false);
  const [user] = useState(props.user);

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
    setShowTasks(true);
  }

  const closeTasks = () => {
    setShowTasks(false);
  }


  return (
    <div className='container'>
        { props.isAdmin ? ( <AdminDashboard user={ props }/> ) : null }

        { !props.isAdmin ?  (
          <div className="dashBoard">
            <div className="sideNav">
              <div className="profile">
                <Profile user={user ? user : props.user}/>
                <button onClick={openProfileForm}> Edit Profile</button>
              </div>
              <div className="linkDiv">
                <button className="links" onClick={openJobs}> Job Tracker </button>
                <button className="links" onClick={openTasks}> Tasks </button>
              </div>
            </div>

            <div className="maindiv">
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


// <div className="WelcomeMessage">
// <h1> Welcome to Wonder Tracker </h1>
// <p> The student outcomes tracker created especially for the GA outcomes program </p>
// </div>
