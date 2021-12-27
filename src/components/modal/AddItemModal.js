import React, { useState } from 'react'
import { sanitizeInput } from '../../services/utils'

function AddItemModal({ confirmFunction, denyFunction, itemName = "item", modalHeading = "Enter a name for your new item", inputType = "input" }) {

    const [newItemName, setNewItemTitle] = useState("")


    const handleAdd = () => {
        const sanitizedInput = sanitizeInput(newItemName)
        confirmFunction(newItemName)
    }

    const handleKeyPress = ({ code }) => {
        if (code === "Enter") {
            handleAdd()
        }

    }

    const validateInput = ({ target }) => {
        // TODO do some validating of input
        setNewItemTitle(target.value)
    }

    const modalInput = inputType === "textarea" ? <textarea onChange={validateInput} onKeyPress={handleKeyPress}>{newItemName}</textarea> : <input type="text" value={newItemName} onChange={validateInput} onKeyPress={handleKeyPress} />
    return (
        <div className="modal-container">
            <div className="modal">
                <h3 className="modal-heading">{modalHeading}</h3>
                {modalInput}
                <div className="modal-button-container">
                    <button className="button button-highlight mid" onClick={handleAdd}>Add {itemName}</button>
                    <button className="button button-alternate mid" onClick={denyFunction}>Cancel</button>
                </div>

            </div>

        </div>
    )
}

export default AddItemModal
