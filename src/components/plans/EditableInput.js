import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import GeneralModal from '../modal/GeneralModal'

function EditableInput({ text, tag = "p", classNames, inputType = 'text', updateFunction }) {
    const [isEditing, setIsEditing] = useState(false)
    // TODO I have two variables for the two states of text input, in the input and in the tag. Is this neccessary? would it be better to use the 'text' var that already exists and update that? 
    const [textInputContent, setTextInputContent] = useState(text)
    const [textContent, setTextContent] = useState(text)
    const [discardModalShowing, setDiscardModalShowing] = useState(false)
    const [confirmModalShowing, setConfirmModalShowing] = useState(false)
    const [lastFocusedInput, setLastFocusedInput] = useState()

    // TODO So this was placed here so that the discard menu didn't pop up when the confirm changes modal took focus when the modal buttons were clicked. 
    const [saving, setSaving] = useState(false)

    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }
    const validateInput = (text) => {
        // TODO do some text valdidation here
        return text
    }
    const handleKeyPress = (event) => {
        console.log(event.key)
        const validText = validateInput(event.target.value)

        if (event.key === 'Enter') {
            setSaving(true)
            setTextInputContent(validText)
            showConfirmModal(validText)
        }

    }

    const confirmTextInput = () => {
        // TODO There is a logic issue here... If I discard changes when confirming, the input box no longer has listeners for focus out or input.

        toggleEditing()
        setTextContent(textInputContent)
        updateFunction(textInputContent)
        hideConfirmModal()
    }
    const confirmDiscard = () => {
        toggleEditing()
        hideDiscardModal()

    }
    const handleClick = () => {
        toggleEditing()
    }
    const handleBlur = (event) => {
        showDiscardModal(event)
    }
    // TODO I have found myself repeating this modal pattern alot, maybe it's time to move this to a global state? and just have a handful of modal elements? 
    const showDiscardModal = (event) => {
        // TODO when a button outside of the input is clicked, the discard changes modal should show up, but then the button click should still register

        const textHasChanged = !(event.target.value == textInputContent)
        if (!saving) {
            if (!textHasChanged) {
                toggleEditing()
            } else {
                if (!discardModalShowing) {
                    setDiscardModalShowing(true)
                    setLastFocusedInput(event.target)
                }

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

        if (!confirmModalShowing) {
            setConfirmModalShowing(true)

        }
    }
    const hideConfirmModal = () => {
        setSaving(false)
        setConfirmModalShowing(false)
    }

    const textDisplay = React.createElement(tag, { className: classNames, onClick: handleClick }, textInputContent)
    const textInput = <input defaultValue={textContent} autoFocus type='text' onKeyPress={handleKeyPress} onBlur={handleBlur}></input>
    const discardConfirmationModal = <GeneralModal heading={"Discard changes?"} confirmText='Discard' confirmAction={confirmDiscard} denyAction={hideDiscardModal}></GeneralModal>
    const confirmModal = <GeneralModal heading={"Save changes?"} confirmAction={confirmTextInput} denyAction={hideConfirmModal}></GeneralModal>
    return (
        <div className={inputType === 'textarea' ? 'responsive-textarea-wrapper' : ''}>
            {isEditing ? textInput : textDisplay}
            {/* TODO This feels sloppy, is there a better way?  */}
            {discardModalShowing && discardConfirmationModal}
            {confirmModalShowing && confirmModal}
        </div>
    )
}

export default EditableInput
