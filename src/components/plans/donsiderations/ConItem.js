import React, { useState } from 'react'
import { updateProperty } from '../../../features/plans/plansSlice'
import { sanitizeInput } from '../../../services/utils'
import { useDispatch } from 'react-redux'
import { displayErrorMessage, displaySuccessMessage } from '../../../features/signals/messages'



function ConItem({ con, planId, donsiderationId, optionId, showModalFunction }) {

    const handleRemove = () => {
        showModalFunction([planId, donsiderationId, optionId], con._id, "con")
    }
   
        return (
            <div className='option-sub-item'>
                <p>{con.content}<span className="delete-item-button" onClick={handleRemove}>x</span></p>
            </div>
        )

   
}

export default ConItem

