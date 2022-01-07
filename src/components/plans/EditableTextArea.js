import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import GeneralModal from '../modal/GeneralModal'

function EditableTextArea({ text, tag = "p", classNames, updateFunction}) {
    const [isEditing, setIsEditing] = useState(false)
    // TODO I have two variables for the two states of text input, in the input and in the tag. Is this neccessary? would it be better to use the 'text' var that already exists and update that? 
    const [textInputContent, setTextInputContent] = useState(text)
    const [textContent, setTextContent] = useState(text)
    const [confirmOrDiscardModalShowing, setConfirmOrDiscardModalShowing] = useState(false)
    const [lastFocusedInput, setLastFocusedInput] = useState()
    // TODO not sure what this was here for, need to see why i omplemented it this way in the other editable input
    const [saving, setSaving] = useState(false)

    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }
    const validateInput = (text) => {
        // TODO do some text valdidation here
        return text
    }

    const handleInput = (event) => {
        // TODO I think I'll need to reset this when the value is discarded, but I've got spaghetti brain right now
        event.target.parentNode.dataset.replicatedValue = event.target.value
        const validText = validateInput(event.target.value)
        console.log(event.key)
    }
    const confirmTextInput = () => {
        // TODO There is a logic issue here... If I discard changes when confirming, the input box no longer has listeners for focus out or input.
        setTextContent(textInputContent)
        toggleEditing()
        hideConfirmOrDiscardModal()

        //TODO I've already forgotten why I need this saving flag...
        setSaving(false)

    }
    const confirmDiscard = () => {
        toggleEditing()
        hideConfirmOrDiscardModal()
     
    }
    const handleClick = () => {
        toggleEditing()
    }
    const handleBlur = (event) => {
        setLastFocusedInput(event.target)
          // TODO this "textHasChanged" variable is repeaetd, there should be a way to make this check consistent, Maybe move it to a function? Or not make the call at all? 
          const textHasChanged = !(event.target.value == textContent)
          if (textHasChanged) {
              const validText = validateInput(event.target.value)
              setTextInputContent(validText)
              showConfirmOrDiscardModal()
          } else {
              toggleEditing()
              hideConfirmOrDiscardModal()
          }

    }
 
    const showConfirmOrDiscardModal = (textValue) => {
        if (!confirmOrDiscardModalShowing) {
            setConfirmOrDiscardModalShowing(true)
        }
    }
    const hideConfirmOrDiscardModal = () => {
        if(isEditing){
            lastFocusedInput.focus()
        }
        setConfirmOrDiscardModalShowing(false)
    }
    const textDisplay = React.createElement(tag, { className: classNames, onClick: handleClick }, textContent)
    const textInput =  <textarea defaultValue={textContent} autoFocus onInput={handleInput} onBlur={handleBlur}></textarea> 
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
            {confirmOrDiscardModalShowing && confirmOrDiscardModal}
        </div>
    )
}

export default EditableTextArea
