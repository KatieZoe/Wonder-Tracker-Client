import React, { Component } from 'react';
import axios from 'axios';
import MediaCard from '../components/Material-UI/MediaCard';
import InsetDividers from '../components/Material-UI/InsetDividers';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.user,
      cohorts: [],
      students: {},
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
        this.setState({ selectedCohort: c, showCohort: true});
        console.log(this.state.selectedCohort)
      }
    })
    axios.get(`http://localhost:3001/cohorts/${this.state.selectedCohort.id}`).then((response) => {
      this.setState({ students: response.data })
      console.log(this.state.students);
    })
  };

  render() {
    return (
      <div className="AdminDashboardContainer">
      <h1>Admin Dashboard</h1>


        { this.state.cohorts.map((c)=> (
        <MediaCard key={ c.id } cohort={ c } onClick={ this.findStudents }/>
      ))}

      <InsetDividers />


      </div>
    )
  }
}
export default AdminDashboard
