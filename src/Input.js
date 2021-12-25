import React,{useState} from 'react'
import "./App.css";
import { Paper} from "@material-ui/core";
function Input({task,handleTempTask,handleDelete,handleUpdate}) {
    const [input, setinput] = useState(task.task);
    return (
        <div>
            {
                    <Paper
                        key={task._id}
                        className="flex task_container"
                    >
                        <button
                            checked={task.completed}
                            onClick={() => handleUpdate(task._id)}
                           className={task.completed?"checked":"un-checked"}
                        />
                        <form
                         onSubmit={(e)=>{e.preventDefault();
                             handleTempTask(input,task._id)}}
                        >
                          <input
                    variant="outlined"
                    className={
                                task.completed
                                    ? "task line_through"
                                    : "task"
                            }
                    size="small"
                    value={input}
                    required={true}
                    onChange={(e)=>{             
                    setinput(e.target.value);
                    }}

                />
                </form>
                        <button
                            onClick={() =>handleDelete(task._id)}
                            className='destroy'
                        >x
                        </button>
                    </Paper>
            }
        </div>
    )
}

export default Input
