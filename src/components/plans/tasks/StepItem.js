import React from 'react'
import { useDispatch } from 'react-redux'
import { StepDescription } from 'semantic-ui-react'
import { updateProperty } from '../../../features/plans/plansSlice'
import EditableInput from '../EditableInput'

function StepItem({step, planId, taskId, showModalFunction}) {
    const dispatch = useDispatch()
    const title = step.title
    const handleChange = (event)=>{
        const stepUpdateObject = {_id: step._id, status: event.target.checked}
        dispatch(updateProperty([planId, taskId],step._id, stepUpdateObject, "step", ))
    } 

    const handleTextChange = (title)=>{
        const stepUpdateObject = { title}
        dispatch(updateProperty([planId, taskId],step._id, stepUpdateObject, "step", ))
    }

    const handleRemove = ()=>{
        showModalFunction([planId, taskId], step._id, "step")
    }
    return (
        <div className={"micro-margin-bottom step-item flex-align-vertical-center " + (step.status === "Completed"? "active":"inactive")}>
            <input id={step._id} type="checkbox" onChange={handleChange} checked={step.status} />
            <EditableInput updateFunction={handleTextChange} classNames={'input-label'} text={title} tag='label'></EditableInput><span className="delete-item-button" onClick={handleRemove}>x</span>
        </div>
    )
}


export default StepItem

