import React, { useState } from 'react'

function GeneralModal({ heading, subtext, confirmAction, denyAction, confirmText = 'confirm', denyText = "cancel" }) {


    return (
        <div className="modal-container">
            <div className="modal">
                <h3 className="modal-heading">{heading}</h3>
                {subtext && <div>{subtext}</div>}
                <div className="modal-button-container">
                    <button className="button button-highlight mid" onClick={confirmAction}>{confirmText}</button>
                    <button className="button button-alternate mid" onClick={denyAction}>{denyText}</button>
                </div>

            </div>

        </div>)
}

export default GeneralModal
