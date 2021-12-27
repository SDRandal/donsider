import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProperty } from '../../../features/plans/plansSlice'
import TagItem from './TagItem'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import { deleteProperty } from '../../../features/plans/plansSlice'
import AddItemModal from '../../modal/AddItemModal'


function TagList(props) {
    // TODO passing the planId through props feels tremendously sloppy. Perhaps I just need to use context. I think using a new store slice would be overkill
    const dispatch = useDispatch()

    const [removeItemModalShowing, setRemoveItemModalShowing] = useState(false)
    const [addItemModalShowing, setAddItemModalShowing] = useState(false)

    const [removalAncestors, setRemovalAncestors] = useState()
    const [removalItemId, setRemovalItemId] = useState()
    const [removalProperty, setRemovalProperty] = useState()

    const showRemoveItemlModal = (ancestors = [], itemId, property) => {
        setRemovalAncestors(ancestors)
        setRemovalItemId(itemId)
        setRemovalProperty(property)
        setRemoveItemModalShowing(true)
    }

    const hideRemoveItemModal = () => {
        setRemoveItemModalShowing(false)

    }
    const hideAddItemModal = () => {
        setAddItemModalShowing(false)

    }

    const handleRemove = () => {
        dispatch(deleteProperty(removalAncestors, removalItemId, removalProperty))
        setRemoveItemModalShowing(false)

    }

    const handleAdd = (name) => {
            const newTag = { name }
            dispatch(addProperty([props.planId], "tag", newTag))
                .then()
                .catch((err) => { console.log(err) })
    }

    const showAddModal =()=>{
        setAddItemModalShowing(true)
    }

    const removeItemModalElement = removeItemModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveItemModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addItemModalShowing ? <AddItemModal itemName="tag" confirmFunction={handleAdd} denyFunction={hideAddItemModal}  ></AddItemModal> : null
    const planTags = props.tags.map((tag) => <TagItem planId={props.planId} tag={tag} key={tag._id} showModalFunction={showRemoveItemlModal}></TagItem>)

    return (
        <div className="tag-list-container flex-start">
            <div>{planTags}</div>
            <p onClick={showAddModal} className="button round">+</p>
            {removeItemModalElement}
            {addItemModalElement}
        </div>
    )
}

export default TagList
