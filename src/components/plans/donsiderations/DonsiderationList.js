import React, { useState } from 'react'
import { addProperty, deleteProperty } from '../../../features/plans/plansSlice'
import { useDispatch } from 'react-redux'
import DonsiderationItem from './DonsiderationItem'
import { sanitizeInput } from '../../../services/utils'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import AddItemModal from '../../modal/AddItemModal'

function DonsiderationList({ planId, donsiderations }) {
    const dispatch = useDispatch()

    const [addItemModalShowing, setAddItemModalShowing] = useState(false)

    const [removeItemModalShowing, setRemoveItemModalShowing] = useState(false)
    const [removeItemAncestors, setRemoveItemsAncestors] = useState()
    const [removeItemId, setRemoveItemId] = useState()
    const [removeItemProperty, setRemoveItemProperty] = useState()

    const showAddItemModal = () => {
        setAddItemModalShowing(true)
    }

    const showRemoveItemModal = (ancestors = [], itemId, property) => {
        setRemoveItemsAncestors(ancestors)
        setRemoveItemId(itemId)
        setRemoveItemProperty(property)
        setRemoveItemModalShowing(true)
    }

    const hideAddItemModal = () => {
        setAddItemModalShowing(false)
    }

    const hideRemoveItemModal = () => {
        setRemoveItemModalShowing(false)
    }

    const handleAdd = (title) => {
        const newDonsideration = {title}
        dispatch(addProperty([planId], "donsideration", newDonsideration))
        .then(()=>{
            hideAddItemModal()
        })
    }

    const handleRemove = () => {
        dispatch(deleteProperty(removeItemAncestors, removeItemId, removeItemProperty))
        setRemoveItemModalShowing(false)
    }
    const removeItemModalElement = removeItemModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveItemModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addItemModalShowing ? <AddItemModal itemName="donsideration" confirmFunction={handleAdd} denyFunction={hideAddItemModal}  ></AddItemModal> : null
    const donsiderationItems = donsiderations.map((donsideration) => <DonsiderationItem donsideration={donsideration} key={donsideration._id} planId={planId} showRemoveItemModalFunction={showRemoveItemModal}></DonsiderationItem>)

    return (
        <div>
            <div className='list-header'>
                <h2 className='list-title'>Donsiderations</h2>
                <button onClick={showAddItemModal} className='button button-highlight mid'>Add Donsideration</button>
            </div>
            <div className='grid-list'>
                {donsiderationItems}
            </div>
            {removeItemModalElement}
            {addItemModalElement}
        </div>
    )
}

export default DonsiderationList
