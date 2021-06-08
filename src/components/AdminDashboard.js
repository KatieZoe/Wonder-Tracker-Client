import React, { Component } from 'react';
import axios from 'axios';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.user,
      cohorts: []
    }
  }

  componentDidMount() {
    axios.get('https://wonder-tracker.herokuapp.com/cohorts').then((response) => {
      this.setState({ cohorts: response.data.cohort });
    });
  };

  render() {
    return (
      <div>
        <h1> Admin Dashboard </h1>
        { this.state.cohorts.map((c)=> (
            <div className="cohort" key={ c.id }> { c.cohort_number }</div>
          )) }
          <br/>
      </div>
    )
  }


}
export default AdminDashboard
