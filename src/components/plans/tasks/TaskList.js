import React, { useState } from 'react'
import TaskItem from './TaskItem'
import { sanitizeInput } from '../../../services/utils'
import { useDispatch } from 'react-redux'
import { addProperty, deleteProperty } from '../../../features/plans/plansSlice'
import RemoveItemlModal from '../../modal/RemoveItemModal'
import AddItemModal from '../../modal/AddItemModal'

function TaskList({planId, tasks}) {
    const dispatch = useDispatch()

    const [addItemModalShowing, setAddItemModalShowing] = useState(false)

    const showAddItemModal = () => {
        setAddItemModalShowing(true)
    }

    const hideAddItemModal = () => {
        setAddItemModalShowing(false)
    }

    const handleAdd = (title) => {
        const newTask = {title}
        dispatch(addProperty([planId], "task", newTask))
        .then(()=>{
            hideAddItemModal()
        })
    }

    const [removeItemModalShowing, setRemoveItemModalShowing] = useState(false)
    const [removalAncestors, setRemovalAncestors] = useState()
    const [removalItemId, setRemovalItemId] = useState()
    const [removalProperty, setRemovalProperty] = useState()

    const showRemoveItemModal = (ancestors = [], itemId, property) => {
        setRemovalAncestors(ancestors)
        setRemovalItemId(itemId)
        setRemovalProperty(property)
        setRemoveItemModalShowing(true)
    }


    const hideRemoveItemModal = () => {
        setRemoveItemModalShowing(false)

    }

    const handleRemove = () => {
        dispatch(deleteProperty(removalAncestors, removalItemId, removalProperty))
        setRemoveItemModalShowing(false)

    }
    const removeItemModalElement = removeItemModalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideRemoveItemModal}  ></RemoveItemlModal> : null
    const addItemModalElement = addItemModalShowing ? <AddItemModal itemName="task" confirmFunction={handleAdd} denyFunction={hideAddItemModal}  ></AddItemModal> : null
    const taskItems = tasks.map((task) => <TaskItem planId={planId} task={task} key={task._id} showModalFunction={showRemoveItemModal}></TaskItem>)

    return (
        <div>
            <div className="list-header">
                <h2 className="list-title">Tasks</h2><button onClick={showAddItemModal} className="button button-highlight mid">Add Task</button>

            </div>
            <div className="grid-list triple">
                {taskItems}
            </div>
            {removeItemModalElement}
            {addItemModalElement}
        </div>
    )
}

export default TaskList
