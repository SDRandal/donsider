import React from 'react'

function RemoveItemModal({ confirmFunction, denyFunction, itemName = "item" }) {


    return (
        <div className="modal-container">
            <div className="modal">
                <p>Are you sure you want to remove this {itemName}?</p>
                <div className="modal-button-container">
                    <button className="button modal-confirm-button mid" onClick={confirmFunction}>Yes</button>
                    <button className=" button modal-deny-button mid" onClick={denyFunction}>No</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveItemModal
