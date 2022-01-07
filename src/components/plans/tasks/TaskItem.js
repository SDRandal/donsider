import React from 'react'
import TaskProgressBar from '../TaskProgressBar'
import StepList from './StepList'
import EditableInput from '../EditableInput'
import {useDispatch} from 'react-redux'
import { updateProperty } from '../../../features/plans/plansSlice'

function TaskItem({task, planId, showModalFunction}) {

    const dispatch = useDispatch()

    const handleRemove = (event)=>{
        // TODO Should really have a confirmation modal here
        showModalFunction([planId], task._id,"task")

    }
    const handleTitleUpdate = (title) =>{
        const taskUpdateObject = {title}
        dispatch(updateProperty([planId], task._id, taskUpdateObject,"task"))
    }
    return (
        <div className="task-item panel">
            <EditableInput updateFunction={handleTitleUpdate} classNames={'item-title xsmall-margin-bottom'} text={task.title} ></EditableInput><span className="delete-item-button" onClick={handleRemove}>x</span>

            <p className={"task " + task.priority}>{task.priority}</p>   

            {task.steps.length > 0 ? <TaskProgressBar steps={task.steps}></TaskProgressBar> : <p>No steps yet</p>}

            <StepList planId={ planId} task={task} steps={task.steps}></StepList> 
                    
        </div>
    )
}


export default TaskItem

