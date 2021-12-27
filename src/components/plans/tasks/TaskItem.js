import React from 'react'
import TaskProgressBar from '../TaskProgressBar'
import StepList from './StepList'

function TaskItem({task, planId, showModalFunction}) {

    const handleRemove = (event)=>{
        // TODO Should really have a confirmation modal here
        showModalFunction([planId], task._id,"task")

    }
    return (
        <div className="task-item panel">
            <p className="item-title xsmall-margin-bottom">{task.title} </p><span className="delete-item-button" onClick={handleRemove}>x</span>

            <p className={"task " + task.priority}>{task.priority}</p>   

            {task.steps.length > 0 ? <TaskProgressBar steps={task.steps}></TaskProgressBar> : <p>No steps yet</p>}

            <StepList planId={ planId} task={task} steps={task.steps}></StepList> 
                    
        </div>
    )
}


export default TaskItem

