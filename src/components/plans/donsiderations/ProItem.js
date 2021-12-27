import React from 'react'

function ProItem({ pro, planId, optionId, donsiderationId, showRemoveItemModalFunction }) {

    const handleRemove = () => {
        showRemoveItemModalFunction([planId, donsiderationId, optionId], pro._id, "pro")
    }
    return (
        <div className='option-sub-item'>
            <p>{pro.content}<span className="delete-item-button" onClick={handleRemove}>x</span></p>
        </div>
    )
}

export default ProItem

