import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import TaskForm from './taskForm';

export default function Tasks(props) {

  const [tasks, setTasks] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  const [taskId, setTaskId] = useState(null);

  useEffect( async() => {

    const fetchTasks = async () => {
      console.log(props.userId);
      const tasks = await axios(`https://wonder-tracker.herokuapp.com/tasks/user/${props.user.id}`);
        console.log("Tasks from server bassed on user",tasks);
        setTasks(tasks.data.tasks);

    };

    fetchTasks();
  },[]);
  const editTaskDetails = (taskId) => {
    setShowEditForm(true);
    setIsAddTask(false);
    setTaskId(taskId);
  }
  const updateTasks = async () => {
    setShowEditForm(false);
    const tasks = await axios(`https://wonder-tracker.herokuapp.com/tasks/user/${props.user.id}`);      setTasks(tasks.data.tasks);
  }
  return(
    <>
      {tasks.map((task) => {
        return(
          <>
            {!showEditForm ? (
              <div>
                <h1>{task.name}</h1>
                <p>Due date: {task.due_date}</p>
                <p>Document Link: {task.task_url}</p>
                <p>Additional Notes: {task.notes}</p>

                  <Button variant="contained" color="secondary" onClick={() => editTaskDetails(task.id)}>
                    Edit
                  </Button>
              </div>
            ) : taskId === task.id ? (
              <TaskForm task={task} onUpdate={updateTasks}/>
            ) : null
          }

        </>
        )})
      }
    </>
  )
}
