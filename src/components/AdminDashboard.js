import React, { Component } from 'react';
import axios from 'axios';
import MediaCard from '../components/Material-UI/MediaCard';
import VerticalTabs from '../components/Material-UI/VerticalTabs';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.user,
      cohorts: [],
      students: [],
      selectedCohort: {},
      showCohort: false
    }
    this.findStudents = this.findStudents.bind(this)
  }

  componentDidMount() {
    axios.get('https://wonder-tracker.herokuapp.com/cohorts').then((response) => {
      this.setState({ cohorts: response.data.cohort });
      console.log(this.cohorts)
    });
  };

  findStudents(props) {
    this.state.cohorts.map((c) => {
      if(c.id === props) {
        return( this.setState({ selectedCohort: c }))
      }
    })
    axios.get(`https://wonder-tracker.herokuapp.com/cohorts/user/${this.state.selectedCohort.id}`).then((response) => {
      this.setState({ students: response.data.users, showCohort: true })
      console.log(this.state.students);
    })
  };

  render() {
    return (
      <div className="AdminDashboardContainer">
      <h1>Admin Dashboard</h1>
        { this.state.cohorts.map((c) => (
        <MediaCard key={ c.id } cohort={ c } onClick={ this.findStudents }/>
        ))}
        <br/>
        { this.state.showCohort ? (
          <VerticalTabs students={ this.state.students }/>
        ) : null }
      </div>
    )
  }
}
export default AdminDashboard


// { this.state.students.map((s) (
//     <p> s.name </p>
//   ))}
