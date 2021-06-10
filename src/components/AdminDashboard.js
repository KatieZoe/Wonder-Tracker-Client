import React, { Component } from 'react';
import axios from 'axios';
import MediaCard from '../components/Material-UI/MediaCard'


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.user,
      cohorts: [],
      students: {}
    }
    this.findStudents = this.findStudents.bind(this)
  }

  componentDidMount() {
    axios.get('https://wonder-tracker.herokuapp.com/cohorts').then((response) => {
      this.setState({ cohorts: response.data.cohort });
      console.log(this.cohorts)
    });
    axios.get('https://wonder-tracker.herokuapp.com/users').then((response) => {
      this.setState({ students: response.data.users })
    })
  };

  findStudents(props) {
  console.log(this.state.students);
  console.log(props)
  }

  render() {
    return (
      <div>
      <h1>Admin Dashboard</h1>
        { this.state.cohorts.map((c)=> (
        <MediaCard key={ c.id } cohort={ c } onClick={ this.findStudents }/>
      ))}
      </div>
    )
  }
}
export default AdminDashboard
