import React from 'react'
import EditableInput from '../EditableInput'
import { useDispatch } from 'react-redux'
import { updateProperty } from '../../../features/plans/plansSlice'


function ProItem({ pro, planId, optionId, donsiderationId, showRemoveItemModalFunction }) {

    const dispatch = useDispatch()

    const handleRemove = () => {
        showRemoveItemModalFunction([planId, donsiderationId, optionId], pro._id, "pro")
    }

    const handleProContentUpdate = (content) =>{
        const proUpdateObject = {content}
        dispatch(updateProperty([planId, donsiderationId, optionId], pro._id, proUpdateObject, "pro"))
    }

    return (
        <div className='option-sub-item'>
            <EditableInput updateFunction={handleProContentUpdate} text={pro.content}></EditableInput><span className="delete-item-button" onClick={handleRemove}>x</span>
        </div>
    )
}

export default ProItem

