import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePlan } from '../../../features/plans/plansSlice'
import { displayErrorMessage, displaySuccessMessage } from '../../../features/signals/messages'
import { sanitizeInput } from '../../../services/utils'

function GoalInput(props) {
    const [goalText, setGoalText] = useState(props.text)
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()

    const switchToEditing = () => {
        setEditing(true)
    }

    const handleBlur = ()=> {
        // TODO I should have a confimation modal pop up here
        setEditing(false)
    }

    const handleKeydown = (event) => {
        const sanitizedInput = sanitizeInput(event.target.value)
        if (event.key === 'Enter' && sanitizedInput) {
            setGoalText(sanitizedInput)
            const updateObject = {goal: sanitizedInput }
            dispatch(updatePlan(props.planId, "goal",updateObject))
                .then(() => {
                    displaySuccessMessage(event.target, "Plan updated!")
                    setEditing(false)
                }).catch((err) => {
                    displayErrorMessage(event.target, err)
                })
        }

    }

    const paragraphText = <p onClick={switchToEditing}>{goalText}</p>
    const textInput = <input defaultValue={goalText} onBlur={handleBlur} onKeyPress={handleKeydown} name="goal"></input>
    const goalContent = editing ? textInput : paragraphText
    if (!goalText) {
        return <p>"No goal for this plan yet."</p>
    }
    return(
        <div className='subtext small-margin-bottom'>
            {goalContent}
        </div>
    )
}
export default GoalInput

