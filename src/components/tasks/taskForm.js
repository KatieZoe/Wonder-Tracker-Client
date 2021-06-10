import React,{ useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';

export default function JobTrackerForm(props) {
  const[task, setTask] = useState(props.task);
  
  const handleChange = (e, name) => {
    setTask({...task, [name]: e.target.value });

  }

  const updateTaskDetails = () => {
    const postHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    console.log('task', task);
    axios.put(`http://wonder-tracker.herokuapp.com/tasks/${props.task.id}`, task, { headers: postHeaders }).then((response) => {

    }).catch((error) => {
      console.log("error ocuured in updating user reason: ", error);
    })

    props.onUpdate(false);
  }
  return(
    <>
      <TextField
        fullWidth
        label="Task"
        margin="normal"
        name="name"
        type="text"
        onChange={(e) => handleChange(e, "name")}
        value={task.name ? task.name : props.task.name}
        variant="outlined"
      />
      <TextField
        fullWidth

        label="Due Date"
        margin="normal"
        name="due_date"
        type="text"
        onChange={(e) => handleChange(e, "due_date")}
        value={task.due_date ? task.due_date : props.task.due_date}
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Notes"
        margin="normal"
        name="notes"
        type="text"
        onChange={(e) => handleChange(e, "jd")}
        rows={4}
        rowsMax={8}
        value={task.notes ? task.notes : props.task.notes}
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Task Url"
        margin="normal"
        name="task_url"
        type="text"
        onChange={(e) => handleChange(e, "task_url")}
        value={task.task_url ? task.task_url : props.task.task_url }
        variant="outlined"
      />
      <Button variant="contained" color="secondary" onClick={updateTaskDetails}>
        Update
      </Button>
    </>
  )
}
