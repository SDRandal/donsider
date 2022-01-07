import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import GeneralModal from '../modal/GeneralModal'

function EditableInput({ text, tag = "p", classNames, inputType = 'text' }) {
    const [isEditing, setIsEditing] = useState(false)
    // TODO I have two variables for the two states of text input, in the input and in the tag. Is this neccessary? would it be better to use the 'text' var that already exists and update that? 
    const [textInputContent, setTextInputContent] = useState(text)
    const [textContent, setTextContent] = useState(text)
    const [discardModalShowing, setDiscardModalShowing] = useState(false)
    const [confirmModalShowing, setConfirmModalShowing] = useState(false)
    const [confirmOrDiscardModalShowing, setConfirmOrDiscardModalShowing] = useState(false)
    const [lastFocusedInput, setLastFocusedInput] = useState()
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
    const handleInput = (event) => {
        // TODO I think I'll need to reset this when the value is discarded, but I've got spaghetti brain right now
        event.target.parentNode.dataset.replicatedValue = event.target.value

        const validText = validateInput(event.target.value)
        console.log(event.key)
    }
    const confirmTextInput = () => {
        // TODO There is a logic issue here... If I discard changes when confirming, the input box no longer has listeners for focus out or input.
        
        toggleEditing()
        setTextContent(textInputContent)
        if (inputType === 'textarea') {
            hideConfirmOrDiscardModal()
        } else {
            hideConfirmModal()
        }


        //TODO I've already forgotten why I need this saving flag...
        setSaving(false)

    }
    const confirmDiscard = () => {
        toggleEditing()
        if (inputType === 'textarea') {
            hideConfirmOrDiscardModal()
        } else {
            hideDiscardModal()
        }
    }
    const handleClick = () => {
        toggleEditing()
    }
    const handleBlur = (event) => {
        setTextInputContent()
        if (inputType === 'textarea') {
            // TODO this "textHasChanged" variable is repeaetd, there should be a way to make this check consistent, Maybe move it to a function? Or not make the call at all? 
            const textHasChanged = !(event.target.value == textInputContent)
            if (textHasChanged) {
                const validText = validateInput(event.target.value)
                setTextInputContent(validText)
                showConfirmOrDiscardModal()
            } else {
                toggleEditing()
                hideConfirmOrDiscardModal()
            }
        } else {
            showDiscardModal(event)
        }
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
        setConfirmModalShowing(false)
    }
    const showConfirmOrDiscardModal = (textValue) => {
        if (!confirmOrDiscardModalShowing) {
            setConfirmOrDiscardModalShowing(true)
        }
    }
    const hideConfirmOrDiscardModal = () => {
        setConfirmOrDiscardModalShowing(false)
    }
    const textDisplay = React.createElement(tag, { className: classNames, onClick: handleClick }, textInputContent)
    const textInput =  <textarea defaultValue={textContent} autoFocus onInput={handleInput} onBlur={handleBlur}></textarea> 
    const discardConfirmationModal = <GeneralModal heading={"Discard changes?"} confirmText='Discard' confirmAction={confirmDiscard} denyAction={hideDiscardModal}></GeneralModal>
    const confirmModal = <GeneralModal heading={"Save changes?"} confirmAction={confirmTextInput} denyAction={hideConfirmModal}></GeneralModal>
    const otherActions = [
        {
            label: 'Discard',
            actionFunction: confirmDiscard,
            classNames: 'button-alternate mid'
        }
    ]
    const confirmOrDiscardModal = <GeneralModal heading={"Save changes?"} confirmAction={confirmTextInput} denyAction={hideConfirmOrDiscardModal} otherActions={otherActions}></GeneralModal>
    return (
        <div className={'responsive-textarea-wrapper'} > 
            {isEditing ? textInput : textDisplay}
            {/* TODO This feels sloppy, is there a better way?  */}
            {discardModalShowing && discardConfirmationModal}
            {confirmModalShowing && confirmModal}
            {confirmOrDiscardModalShowing && confirmOrDiscardModal}
        </div>
    )
}

export default EditableInput
