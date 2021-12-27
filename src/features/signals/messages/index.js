function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function removeMessage(messageElement) {
    messageElement.remove()
}

export const displayErrorMessage = (anchorElement, errorMessage)=>{
    const errorMessageElement = document.createElement("p")
    errorMessageElement.classList.add("error-message")
    errorMessageElement.innerText = errorMessage
    insertAfter(errorMessageElement, anchorElement)  
    setTimeout(()=>{
        removeMessage(errorMessageElement)
    }, 3000)
}
export const displaySuccessMessage = (anchorElement, successMessage)=>{
    const successMessageElement = document.createElement("p")
    successMessageElement.classList.add("success-message")
    successMessageElement.innerText = successMessage
    insertAfter(successMessageElement, anchorElement)  
    setTimeout(()=>{
        removeMessage(successMessageElement)
    }, 3000)
}