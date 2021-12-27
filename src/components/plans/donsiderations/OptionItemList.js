import React, { useState } from 'react'
import { addProperty, deleteProperty } from '../../../features/plans/plansSlice'
import { useDispatch } from 'react-redux'
import OptionItem from './OptionItem'
import { sanitizeInput } from '../../../services/utils'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import AddItemModal from '../../modal/AddItemModal'

function OptionItemList({ planId, donsiderationId, options }) {

    const dispatch = useDispatch()

    const [addItemModalShowing, setAddItemModalShowing] = useState(false)

    const [removeItemModalShowing, setRemoveItemModalShowing] = useState(false)
    const [removalAncestors, setRemovalAncestors] = useState()
    const [removalItemId, setRemovalItemId] = useState()
    const [removalProperty, setRemovalProperty] = useState()

    const showAddItemModal = () => {
        setAddItemModalShowing(true)
    }

    const showRemoveItemlModal = (ancestors = [], itemId, property) => {
        setRemovalAncestors(ancestors)
        setRemovalItemId(itemId)
        setRemovalProperty(property)
        setRemoveItemModalShowing(true)
    }

    const hideAddItemModal = () => {
        setAddItemModalShowing(false)
    }

    const hideRemoveItemModal = () => {
        setRemoveItemModalShowing(false)

    }

    const handleAdd = (content) => {
        const newOption = { content }
        dispatch(addProperty([planId, donsiderationId], "option", newOption))
        hideAddItemModal()
    }
    const handleRemove = () => {
        dispatch(deleteProperty(removalAncestors, removalItemId, removalProperty))
        setRemoveItemModalShowing(false)

    }
    const removeItemModalElement = removeItemModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveItemModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addItemModalShowing ? <AddItemModal itemName="option" confirmFunction={handleAdd} denyFunction={hideAddItemModal}  ></AddItemModal> : null

    const optionItems = options.map((option) => <OptionItem option={option} key={option._id} pros={option.pros} cons={option.cons} planId={planId} donsiderationId={donsiderationId} showModalFunction={showRemoveItemlModal}></OptionItem>)



    return (
        <div>
            <div className='subitem-header'>
                <p className='item-subtitle'>Options</p>
            </div>

            <div className='subitem-list'>
                <div className='grid-list double'>
                    {optionItems}
                    <div onClick={showAddItemModal} className='inline-add-panel '>
                        <p>Add a new Option</p>
                        <p className="button round">+</p>

                    </div>
                </div>

            </div>
            {removeItemModalElement}
            {addItemModalElement}
        </div>
    )
}

export default OptionItemList
