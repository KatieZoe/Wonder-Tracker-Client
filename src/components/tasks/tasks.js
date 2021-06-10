import React,{ useState, useEffect } from 'react';
import axios from 'axios';

export default function Tasks(props) {

  const [tasks, setTasks] = useState([]);

  useEffect( async() => {

    const fetchTasks = async () => {
      console.log(props.userId);
      const tasks = await axios(`http://localhost:3001/tasks/user/8`);
        console.log("jobs from server bassed on user",tasks);
        // jobs.data.jobtracker.map()
    };

    fetchTasks();
  },[]);

  return(
    <>
      {tasks.map((task) => {
        <p>{task.company_name}</p>
      })}
    </>
  )
}
