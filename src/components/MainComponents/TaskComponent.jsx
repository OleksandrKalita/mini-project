import { useState } from "react";
import { useChangeTaskStatusMutation } from "../../redux/taskApi";

export const TaskComponent = ({task}) => {
    const [changeTask, {isError}] = useChangeTaskStatusMutation();
    const [isChecked, setIsChecked] = useState(task.status==="pending"?false:true);
    return (
        <div className="task-container">
            <div className="task-text">{task.text}</div>

                {
                    task.type === "task" ? 
                    <input type="checkbox" name="" id="" 
                    checked={isChecked} onChange={e => {
                        setIsChecked(!isChecked);
                        changeTask({taskId: task._id,status: !isChecked})
                    }}/> :
                    <div className="exp-time">{task.expiredTime}</div>
                }
            </div>   
    );
}