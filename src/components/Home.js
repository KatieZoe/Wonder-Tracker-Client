import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Home = () => {

  return (
    <div className='container'>
    <Nav />

      <h1> Wonder Tracker </h1>
      <img src="../logo.png" />
    </div>
  )
};
export default Home
