import React from 'react'
import UserItem from '../users/UserItem'
import { getInterval } from '../../../services/utils'
function NoteItem({ planId, note, showModalFunction }) {
    const noteContent = note.content ? note.content : "No note content"

    const timeDiff = getInterval(note.time)
    const handleRemove = () => {
        showModalFunction([planId], note._id, "note")
    }
    return (
        <div className='panel'>
            <div className='item-heading'>
                <div className='flex-start'>
                    <UserItem user={{ _id: note.user }}></UserItem>
                    <div className='time-difference'>{timeDiff}</div>

                </div>
            </div>
            <div className='padded-content'>{noteContent}<span className="delete-item-button" onClick={handleRemove}>x</span></div>
        </div>
    )
}


export default NoteItem

