import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import GeneralModal from '../modal/GeneralModal'

function EditableInput({ text, tag = "p", classNames }) {
    const [isEditing, setIsEditing] = useState(false)
    const [textInputContent, setTextInputContent] = useState(text)
    const [discardModalShowing, setDiscardModalShowing] = useState(false)
    const [confirmModalShowing, setConfirmModalShowing] = useState(false)
    const [lastFocusedInput, setLastFocusedInput] = useState()
    const [saving, setSaving] = useState(false)


    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }

    const validateInput = (text) => {
        // TODO do some text valdidation here
        return text
    }

    const handleInput = (event) => {

        const validText = validateInput(event.target.value)
        if (event.key === 'Enter') {
            setSaving(true)
            setTextInputContent(validText)
            showConfirmModal()
        }
    }

    const confirmTextInput = () => {
        // TODO There is a logic issue here... If I discard changes when confirming, the input box no longer has listeners for focus out or input.
        toggleEditing()
        hideConfirmModal()
        setSaving(false)

    }

    const confirmDiscard = () => {
        toggleEditing()
        hideDiscardModal()
    }

    const handleClick = () => {
        toggleEditing()
    }

    // TODO I have found myself repeating this modal pattern alot, maybe it's time to move this to a global state? and just have a handful of modal elements? 
    const showDiscardModal = (event) => {
        // TODO when a button outside of the input is clicked, the discard changes modal should show up, but then the button click should still register
    
        const textHasChanged = !(event.target.value == textInputContent)
        if (!saving) {
            if (!textHasChanged) {
                toggleEditing()
            }else{
                setDiscardModalShowing(true)
                setLastFocusedInput(event.target)

            }

        }
    }
    const hideDiscardModal = () => {
        setDiscardModalShowing(false)
        if (!saving) {
            lastFocusedInput.focus()

        }
    }
    const showConfirmModal = () => {
        setConfirmModalShowing(true)
    }
    const hideConfirmModal = () => {
        setConfirmModalShowing(false)
    }

    const textDisplay = React.createElement(tag, { className: classNames, onClick: handleClick }, textInputContent)


    const textInput = <input defaultValue={textInputContent} autoFocus type='text' onKeyPress={handleInput} onBlur={showDiscardModal}></input>

    const discardConfirmationModal = <GeneralModal heading={"Discard changes?"} confirmText='Discard' confirmAction={confirmDiscard} denyAction={hideDiscardModal}></GeneralModal>
    const confirmModal = <GeneralModal heading={"Save changes?"} confirmAction={confirmTextInput} denyAction={hideConfirmModal}></GeneralModal>
    return (
        <div>
            {isEditing ? textInput : textDisplay}
            {discardModalShowing && discardConfirmationModal}
            {confirmModalShowing && confirmModal}
        </div>
    )
}

export default EditableInput
