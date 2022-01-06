import React from 'react'
import EditableInput from '../EditableInput'

function ProItem({ pro, planId, optionId, donsiderationId, showRemoveItemModalFunction }) {

    const handleRemove = () => {
        showRemoveItemModalFunction([planId, donsiderationId, optionId], pro._id, "pro")
    }
    return (
        <div className='option-sub-item'>
            <EditableInput text={pro.content}></EditableInput><span className="delete-item-button" onClick={handleRemove}>x</span>
        </div>
    )
}

export default ProItem

