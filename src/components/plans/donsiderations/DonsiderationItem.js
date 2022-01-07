import React from 'react'
import OptionItemList from './OptionItemList'
import EditableInput from '../EditableInput'
import {useDispatch} from 'react-redux'
import { updateProperty } from '../../../features/plans/plansSlice'



function DonsiderationItem({ planId, donsideration, showRemoveItemModalFunction }) {

    const dispatch = useDispatch()

    const handleRemove = () => {
        showRemoveItemModalFunction([planId], donsideration._id, "donsideration")
    }

    const handleTitleUpdate = (title)=>{
        const donsiderationUpdateObject = {title}
        dispatch(updateProperty([planId], donsideration._id, donsiderationUpdateObject, "donsideration"))
    }

    return (
        <div className='donsideration-item panel'>
            <div className='item-header'>
                <EditableInput updateFunction={handleTitleUpdate} classNames={"item-title"} text={donsideration.title}></EditableInput><span className="delete-item-button" onClick={handleRemove}>x</span>
            </div>
            <div className='subitem-list'>
                <OptionItemList options={donsideration.options} planId={planId} donsiderationId={donsideration._id}></OptionItemList>
            </div>
        </div>
    )
}


export default DonsiderationItem

