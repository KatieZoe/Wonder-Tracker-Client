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
      showCohort: false,
      studentProfile: {},
      showStudent: false
    }
    this.findStudents = this.findStudents.bind(this)
    this.showStudentProfile = this.showStudentProfile.bind(this);
    this.checkStudent = this.checkStudent.bind(this);
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
        return this.setState({ selectedCohort: c })
      }
    })
    axios.get(`https://wonder-tracker.herokuapp.com/cohorts/user/${this.state.selectedCohort.id}`).then((response) => {
      this.setState({ students: response.data.users, showCohort: true })
      console.log(this.state.students);
    })
  };

  checkStudent() {
    this.setState({ showStudent: true });
  }

  showStudentProfile(props) {
    this.setState({ studentProfile: props });
    this.checkStudent();
  }

  render() {
    return (
      <div className="AdminDashboardContainer">
      <h1>Admin Dashboard</h1>
        { this.state.cohorts.map((c) => (
        <MediaCard key={ c.id } cohort={ c } onClick={ this.findStudents }/>
        ))}

        <br/>
        <br/>

        { this.state.showCohort ? (
          <VerticalTabs
          students={ this.state.students }
          onClick={ this.showStudentProfile }/>
        ) : null }


        { this.state.showStudent ? (
          <div className="ViewStudent">
          <img src={this.state.studentProfile.image_url} width='300px'/>
          <h1> {this.state.studentProfile.name} </h1>
      
          </div>
        ) : null }

      </div>
    )
  }
}
export default AdminDashboard
