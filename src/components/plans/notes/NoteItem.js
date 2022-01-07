import React from 'react'
import UserItem from '../users/UserItem'
import { getInterval } from '../../../services/utils'
import EditableTextArea from '../EditableTextArea'
import { useDispatch } from 'react-redux'
import { updateProperty } from '../../../features/plans/plansSlice'

function NoteItem({ planId, note, showModalFunction }) {

    const dispatch = useDispatch()

    const noteContent = note.content ? note.content : "No note content"

    const timeDiff = getInterval(note.time)
    const handleRemove = () => {
        showModalFunction([planId], note._id, "note")
    }

    const handleNoteContentUpdate = (content)=>{
        const noteUpdateObject = {content, edited: true}
        dispatch(updateProperty([planId], note._id, noteUpdateObject, "note"))
    }

    return (
        <div className='panel note-item'>
            <div className='item-heading'>
                <div className='flex-start'>
                    <UserItem user={{ _id: note.user }}></UserItem>
                    <div className='time-difference'>{timeDiff}</div>

                </div>
            </div>
            <div className='padded-content'><EditableTextArea updateFunction={handleNoteContentUpdate} text={noteContent}></EditableTextArea><span className="delete-item-button" onClick={handleRemove}>x</span></div>
            <div>{note.edited && "edited"}</div>
        </div>
    )
}


export default NoteItem

