import React, { useState } from 'react'
import { addProperty, deleteProperty } from '../../../features/plans/plansSlice'
import ProItem from './ProItem'
import { useDispatch } from 'react-redux'
import { sanitizeInput } from '../../../services/utils'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import AddItemModal from '../../modal/AddItemModal'

function ProItemList({ planId, donsiderationId, optionId, pros }) {
    const dispatch = useDispatch()

    const [addItemModalShowing, setAddItemModalShowing] = useState(false)

    const [removeItemModalShowing, setRemoveItemModalShowing] = useState(false)
    const [removeItemAncestors, setRemoveItemAncestors] = useState()
    const [removeItemId, setRemoveItemId] = useState()
    const [removeItemProperty, setRemoveItemProperty] = useState()

    const showAddItemModal = () => {
        setAddItemModalShowing(true)
    }
    const showRemoveItemlModal = (ancestors = [], itemId, property) => {
        setRemoveItemAncestors(ancestors)
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

    const handleAdd = (content) => {
        const newPro = {content}
        dispatch(addProperty([planId, donsiderationId, optionId], "pro", newPro))
        hideAddItemModal()
    }

    const handleRemove = () => {
        dispatch(deleteProperty(removeItemAncestors, removeItemId, removeItemProperty))
        setRemoveItemModalShowing(false)

    }

    const removeItemModalElement = removeItemModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveItemModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addItemModalShowing ? <AddItemModal itemName="pro" confirmFunction={handleAdd} denyFunction={hideAddItemModal}  ></AddItemModal> : null
    const proItems = pros.map((pro) => <ProItem key={pro._id} pro={pro} planId={planId} donsiderationId={donsiderationId} optionId={optionId} showRemoveItemModalFunction={showRemoveItemlModal}></ProItem>)
    return (
        <div className='pro-list'>
            <div>
                <p>Pros</p>
            </div>
            <div className='option-sub-list'>
                {proItems}
            </div>
                <p onClick={showAddItemModal} className="button round hollow small">+</p>
            {removeItemModalElement}
            {addItemModalElement}
        </div>
    )
}

export default ProItemList
