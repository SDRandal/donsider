import React from 'react'

function TagItem({planId, tag, showModalFunction}) {

    const handleRemove = () => {
        showModalFunction([planId], tag._id, "tag")
    }

    return (
        <div className="tag-item" onClick={handleRemove}>
            {tag.name}
        </div>
    )
}


export default TagItem

