import React, { useState } from 'react'
import AttachmentItem from './AttachmentItem'
import { useDispatch } from 'react-redux'
import { uploadFile, deleteProperty } from '../../../features/plans/plansSlice'
import RemoveItemlModal from '../../modal/RemoveItemModal'

function AttachmentItemList({ planId, attachments }) {
    const dispatch = useDispatch()

    const validateInput = () => {

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        validateInput()
        const fd = new FormData()
        fd.append("file", event.target.files[0])
        dispatch(uploadFile(planId, fd))
    }

    const [modalShowing, setModalShowing] = useState(false)
    const [removalAncestors, setRemovalAncestors] = useState()
    const [removalItemId, setRemovalItemId] = useState()
    const [removalProperty, setRemovalProperty] = useState()

    const showRemoveItemlModal = (ancestors = [], itemId, property) => {
        setRemovalAncestors(ancestors)
        setRemovalItemId(itemId)
        setRemovalProperty(property)
        setModalShowing(true)
    }

    const hideModal = () => {
        setModalShowing(false)

    }

    const handleRemove = () => {
        dispatch(deleteProperty(removalAncestors, removalItemId, removalProperty))
        setModalShowing(false)

    }

    const modalElement = modalShowing ? <RemoveItemlModal confirmFunction={handleRemove} denyFunction={hideModal}  ></RemoveItemlModal> : null

    const attachmentItems = attachments.map((attachment) => <AttachmentItem fileType={attachment.fileType} key={attachment._id} attachmentId={attachment._id} displayName={attachment.displayName} srcLink={attachment.temp} planId={planId} showModalFunction={showRemoveItemlModal}></AttachmentItem>)
    return (
        <div>
            <div className='list-header'>
                <h2>Attachments</h2>
                <label className='button button-highlight mid' htmlFor='file-input'>Upload Attachment</label>
                <input className='file-input' id='file-input' onChange={handleSubmit} type="file" name="attachment-file" />
            </div>
            <div className='attachments grid-list quad'>
                {attachmentItems}
            </div>
            {modalElement}
        </div>
    )
}

export default AttachmentItemList
