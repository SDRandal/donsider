import React from 'react'

function TagDisplayItem({tag}) {
    return (
        <div className="tag-item display">
            {tag.name}
        </div>
    )
}

export default TagDisplayItem
