import React,{useEffect, useState} from 'react'
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    deleteCompleted,
} from "./services/taskServices";
import { Paper } from "@material-ui/core";
import Input from './Input';
import "./App.css";
function App() {

    const [tasks, setTasks] = useState([{}]);
    const [button,setButton]=useState("All");
    const [trigger,setTrigger]=useState(false);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentasks, setCurrentTask] = useState("");
    const [activeLength,setactiveLength]=useState(0);

    async function getData(){
       
        
        let { data } =await getTasks();
        setTasks([])
        setTasks(data);
        let completedTasks=[],activeTasks=[]
data.forEach((task)=>{
            if(task.completed){
               completedTasks.push(task);
                
            }else{
                activeTasks.push(task);
            }
        });
        console.log(completedTasks)
        setCompletedTasks([])
        setActiveTasks([])
        setCompletedTasks(completedTasks);
        setActiveTasks(activeTasks);
        setactiveLength(activeTasks.length);
    };
    useEffect(() => {
    
        getData();

    }
    , []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = tasks;
        try {
            console.log(currentasks);
            const { data } = await addTask({ task: currentasks });
            originalTasks.push(data);
            setCurrentTask("");
            setTrigger(!trigger);
        } catch (error) {
            console.log(error);
        }
    };
    const handleTempTask=async(task,id)=>{
try{
        await updateTask(id,{
    task:task,
});
setTrigger(!trigger);
}catch(error){
    console.log(error);
}
;
    }
    
  const handleUpdate = async (currentTask) => {
        const originalTasks = tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed; 
            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });
            setTrigger(!trigger);
        } catch (error) {

            console.log(error);
        }
    };
    const handleDelete = async (currentTask) => {
        console.log(currentTask)
        const originalTasks = tasks;
        try {
          originalTasks.filter(
                (task) => task._id !== currentTask
            );
            
            await deleteTask(currentTask);
            setTrigger(!trigger);
        } catch (error) {
            console.log(error);
        }
    };
    const DeleteCompletedTask = async () => {
        try {
           
            const task=await deleteCompleted();
            console.log(task.data.message);
            setTrigger(!trigger);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
       console.log("triggered");
    }
    , [trigger]);
    return (
        <div className="App flex">
        <Paper elevation={3} className="container">
            <div className="heading">todos</div>
            <form
                onSubmit={handleSubmit}
                className="flex"
                style={{ margin: "0 0" }}
            >
                <input
                    variant="outlined"
                    size="small"
                    value={currentasks}
                    className="inputText"
                    required={true}
                    onChange={(e)=>{setCurrentTask(e.target.value)}}
                    placeholder="What needs to be done?"
                />
            </form>
            <div className='task-container'>
                {button==="All" && tasks.map((task,index) => (
                <Input 
                    task={task}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    handleTempTask={handleTempTask}
                />))
                }
                {button==="Active"&&activeTasks.map((task,index) => ( <Input 
                    task={task}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    handleTempTask={handleTempTask}
                />
                    ))}
                    {button==="Completed"&&completedTasks.map((task,index) => (
                        <Input 
                    task={task}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    handleTempTask={handleTempTask}
                />))}
            </div>
            {tasks.length?<div><span className='active_length'>{activeLength} items left</span>
        <button
                   className={button==="All"?'selected-button':'status-buttons'}
                   onClick={()=>{setButton("All")}}
                >
                    All
                </button>
                <button
                   className={button==="Active"?'selected-button':'status-buttons'}
                    onClick={()=>{setButton("Active")}}
                >
                   Active
                </button>
                <button
                   className={button==="Completed"?'selected-button':'status-buttons'}
                    onClick={()=>{setButton("Completed")}}
                >
                Completed
                </button>
                {completedTasks.length>0?<button
                    className='clear-completed'
                    onClick={DeleteCompletedTask}
                >
               Clear Completed
                </button>:null}</div>:null}
        </Paper>
       
    </div>
    )
}

export default App
