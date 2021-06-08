import React from 'react';
import Nav from './Nav';
import AdminDashboard from './AdminDashboard';

const Home = (props) => {

  console.log(props.isAdmin);

  return (
    <div className='container'>
    <Nav
    loggedInStatus={ props.loggedInStatus }
    />
      <h1> Wonder Tracker </h1>
      <img src="../logo.png" alt="wonder tracker logo"/>

      <br/>
      { props.isAdmin ? (
        <AdminDashboard />
      ) : null }
      {!props.isAdmin ? (
        <button> Student Dashboard (hide before login) </button>
      ) : null }
    </div>
  )
};
export default Home
