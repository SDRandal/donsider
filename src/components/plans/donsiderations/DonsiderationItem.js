import React from 'react'
import OptionItemList from './OptionItemList'

function DonsiderationItem({ planId, donsideration, showRemoveItemModalFunction }) {
    const handleRemove = () => {
        showRemoveItemModalFunction([planId], donsideration._id, "donsideration")
    }

    return (
        <div className='donsideration-item panel'>
            <div className='item-header'>
                <p className='item-title'>{donsideration.title} <span className="delete-item-button" onClick={handleRemove}>x</span></p>
            </div>
            <div className='subitem-list'>
                <OptionItemList options={donsideration.options} planId={planId} donsiderationId={donsideration._id}></OptionItemList>
            </div>
        </div>
    )
}


export default DonsiderationItem

