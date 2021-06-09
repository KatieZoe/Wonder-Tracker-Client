import React from 'react';
import Nav from './Nav';
import Profile from './profile/profile';
import AdminDashboard from './AdminDashboard';


const Home = (props) => {

  console.log(props.isAdmin);

  return (
    <div className='container'>
      <Nav
      loggedInStatus={ props.loggedInStatus }
      />
    <Profile user={props.user}/>
    <h1> Wonder Tracker </h1>
    <img className ="Wlogo" src="../logo.png" alt="wonder tracker logo"/>

    <br/>

      { props.isAdmin ? (
        <AdminDashboard
        user={ props }/>
      ) : null }
      {!props.isAdmin && props.loggedInStatus ? (

        <button> Student Dashboard (hide before login) </button>
      ) : null }
    </div>
  )
};
export default Home
