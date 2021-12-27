import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './plansHeader.css'
import FilterDropdown from './filters/FilterDropdown'
import SearchInput from './filters/SearchInput'
import SortDropdown from './filters/SortDropdown'
import { addPlan } from '../../features/plans/plansSlice'

function PlansHeader({ title }) {
    const dispatch = useDispatch()

    const [addNewPlanModalShowing, setShowAddNewPlanModal] = useState(false)

    const [newPlanTitle, setNewPlanTitle] = useState("")



    let form;
    const handleSubmit = (event) => {
        event.preventDefault()
        // form.validateAll()
        dispatch(addPlan({ title: newPlanTitle }))
        setNewPlanTitle("")
        event.target.querySelector("input").value = ""
        setShowAddNewPlanModal(false)
    }
    const onInputChange = (event) => {
        setNewPlanTitle(event.target.value)
    }

    const showAddNewPlanModal = () => {
        setShowAddNewPlanModal(true)
    }

    const hideAddNewPlanModal = () => {
        setShowAddNewPlanModal(false)
    }

    const addPlanModal =
        <div className="modal-container">
            <div className="modal">
                <h3 className="modal-heading">Enter a name for your new plan</h3>
                <form className="add-new-plan-modal-form" ref={(component) => { form = component }} onSubmit={handleSubmit}>
                    <input autoFocus type="text" id="newInput" name="title" value={newPlanTitle} onChange={onInputChange} />
                    <div className="modal-button-container">
                        <button className="button button-highlight mid">Add New Plan</button>
                        <span className="button button-alternate mid" onClick={hideAddNewPlanModal}>Cancel</span>
                    </div>

                </form>
            </div>
        </div>

    return (
        <div className="plans-header">
            <div>
                <h1>Plans</h1>
            </div>
            <div className="filter-sort-buttons">
                <FilterDropdown></FilterDropdown>
                <SortDropdown></SortDropdown>
            </div>
            <SearchInput></SearchInput>
            <div onClick={showAddNewPlanModal} className="button button-highlight mid">
Add new plan
            </div>
            {addNewPlanModalShowing && addPlanModal}
        </div>
    )
}

export default PlansHeader
