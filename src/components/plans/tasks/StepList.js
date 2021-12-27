import React, { useState } from 'react'
import StepItem from './StepItem'
import { useDispatch } from 'react-redux'
import { sanitizeInput } from '../../../services/utils'
import { addProperty, deleteProperty } from '../../../features/plans/plansSlice'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import AddItemModal from '../../modal/AddItemModal'


function StepList({ planId, task, steps }) {

    const dispatch = useDispatch()
    const [newStepName, setNewStepName] = useState("")

    const validateInput = (event) => {
        // TODO do some validation here
        const textInput = setNewStepName(event.target.value)
        return textInput
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const sanitizedInput = sanitizeInput(newStepName)
        if (sanitizedInput) {
            const newStep = { title: sanitizedInput }
            dispatch(addProperty([planId, task._id], "step", newStep))
                .then()
                .catch((err) => { console.log(err) })
        }
    }


    const [removeModalShowing, setRemoveModalShowing] = useState(false)
    const [removalAncestors, setRemovalAncestors] = useState()
    const [removalItemId, setRemovalItemId] = useState()
    const [removalProperty, setRemovalProperty] = useState()
    
    const [addModalShowing, setAddModalShowing] = useState(false)

    const showRemoveItemlModal = (ancestors = [], itemId, property) => {
        setRemovalAncestors(ancestors)
        setRemovalItemId(itemId)
        setRemovalProperty(property)
        setRemoveModalShowing(true)
    }
    const showAddModal = ()=>{
        setAddModalShowing(true)
    }
    const hideRemoveModal = () => {
        setRemoveModalShowing(false)
    }
    const hideAddModal = () => {
        setAddModalShowing(false)
    }

    const handleRemove = () => {
        dispatch(deleteProperty(removalAncestors, removalItemId, removalProperty))
        setRemoveModalShowing(false)

    }

    const handleAdd = (title)=>{
        const newStep = {title, status: false}
        dispatch(addProperty([planId, task._id], "step", newStep))
        .then(()=>{
            hideAddModal()
        })
    }
    const removeItemModalElement = removeModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addModalShowing ? <AddItemModal itemName="step" confirmFunction={handleAdd} denyFunction={hideAddModal}  ></AddItemModal> : null
    const stepItems = steps.map((step) => <StepItem planId={planId} taskId={task._id} key={step._id} step={step} showModalFunction={showRemoveItemlModal} ></StepItem>)



    return (
        <div className="step-item-list">
            <div>
                {stepItems}
            </div>
            <div className="flex-center">
                <p onClick={showAddModal} className="button round">+</p>
            </div>
            {removeItemModalElement}
            {addItemModalElement}

        </div>
    )
}

export default StepList
