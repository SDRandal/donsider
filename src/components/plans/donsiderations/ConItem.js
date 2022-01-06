import React, { useState } from 'react'
import { updateProperty } from '../../../features/plans/plansSlice'
import { sanitizeInput } from '../../../services/utils'
import { useDispatch } from 'react-redux'
import { displayErrorMessage, displaySuccessMessage } from '../../../features/signals/messages'
import EditableInput from '../EditableInput'

function ConItem({ con, planId, donsiderationId, optionId, showRemoveItemModalFunction }) {

    const handleRemove = () => {
        showRemoveItemModalFunction([planId, donsiderationId, optionId], con._id, "con")
    }
   
        return (
            <div className='option-sub-item'>
                <EditableInput text={con.content} ></EditableInput><span className="delete-item-button" onClick={handleRemove}>x</span>
            </div>
        )

   
}

export default ConItem

