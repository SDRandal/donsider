import React, { useState } from 'react'
import { addProperty, deleteProperty } from '../../../features/plans/plansSlice'
import ConItem from './ConItem'
import { useDispatch } from 'react-redux'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import AddItemModal from '../../modal/AddItemModal'

function ConItemList({ cons, planId, donsiderationId, optionId }) {
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
        const newCon = { content }
        dispatch(addProperty([planId, donsiderationId, optionId], "con", newCon))
        hideAddItemModal()
    }

    const handleRemove = () => {
        dispatch(deleteProperty(removeItemAncestors, removeItemId, removeItemProperty))
        hideRemoveItemModal()
    }
    const removeItemModalElement = removeItemModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveItemModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addItemModalShowing ? <AddItemModal itemName="con" confirmFunction={handleAdd} denyFunction={hideAddItemModal}  ></AddItemModal> : null
    const conItems = cons.map((con) => <ConItem planId={planId} donsiderationId={donsiderationId} optionId={optionId} key={con._id} con={con} showRemoveItemModalFunction={showRemoveItemlModal} ></ConItem>)

    return (
        <div className='con-list'>
            <div>
                <p>Cons</p>
            </div>
            <div className='option-sub-list'>
                {conItems}
            </div>
                <p onClick={showAddItemModal} className="button round hollow small">+</p>
            {removeItemModalElement}
            {addItemModalElement}
        </div>
    )
}

export default ConItemList
