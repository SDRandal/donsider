import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import NoteItem from './NoteItem'
import { addProperty, deleteProperty } from '../../../features/plans/plansSlice'
import { sanitizeInput } from '../../../services/utils'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import AddItemModal from '../../modal/AddItemModal'

function NoteItemList({ notes, planId, }) {
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

    const hideAddItemModal = ()=>{
        setAddItemModalShowing(false)
    }

    const hideRemoveItemModal = () => {
        setRemoveItemModalShowing(false)

    }

    const handleAdd = (content) => {
        const user = ""
        const newNote = {content, user}
        dispatch(addProperty([planId], "note", newNote))
        hideAddItemModal()
    }
    const handleRemove = () => {
        dispatch(deleteProperty(removeItemAncestors, removeItemId, removeItemProperty))
        hideRemoveItemModal()

    }
    const removeItemModalElement = removeItemModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveItemModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addItemModalShowing ? <AddItemModal inputType="textarea" modalHeading='Enter a new note' itemName="note" confirmFunction={handleAdd} denyFunction={hideAddItemModal}  ></AddItemModal> : null
    const noteItems = notes.map((note) => <NoteItem key={note._id} note={note} planId={planId} showModalFunction={showRemoveItemlModal}></NoteItem>)

// TODO Might want to add some sorting functionality here, by most recent by default
    return (
        <div>
            <div className='list-header'>
                <h2 className="list-title">Notes</h2><button onClick={showAddItemModal} className="button button-highlight mid">Add Note</button>

            </div>
            <div>
                {noteItems}
            </div>
            {removeItemModalElement}
            {addItemModalElement}
        </div>
    )
}

export default NoteItemList
