import React from 'react';
import Nav from './Nav';

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
        <button> Shae Dashboard (hide before login)</button>
      ) : null }
      {!props.isAdmin ? (
        <button> Student Dashboard (hide before login) </button>
      ) : null }
    </div>
  )
};
export default Home
