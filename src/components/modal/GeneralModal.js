import React, { useState } from 'react'

function GeneralModal({ heading, subtext, confirmAction, denyAction, confirmText = 'confirm', denyText = "cancel", otherActions =[] }) {

    const otherActionButtons = otherActions.map((action, i)=>{
        return <button key={i} className={"button " + action.classNames} onClick={action.actionFunction}>{action.label}</button>
    })

    return (
        <div className="modal-container">
            <div className="modal">
                <h3 className="modal-heading">{heading}</h3>
                {subtext && <div>{subtext}</div>}
                <div className="modal-button-container">
                    <button className="button button-highlight mid" onClick={confirmAction}>{confirmText}</button>
                    <button className="button button-alternate mid" onClick={denyAction}>{denyText}</button>
                    {otherActionButtons}
                </div>

            </div>

        </div>)
}

export default GeneralModal
