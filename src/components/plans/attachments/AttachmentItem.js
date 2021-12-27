import React, { useState } from 'react'
import axios from 'axios'
import { getRequestHeaders } from '../../../features/auth/authSlice'


function AttachmentItem({planId, attachmentId, displayName, showModalFunction}) {
    let linkLoaded = false

    const [sourceLink, setSourceLink] = useState("https://d1c99iomjiepbv.cloudfront.net/public/images/default-file-icon.png")

    if(!linkLoaded){
    axios.get("http://localhost:8080/api/plan/attachment/" + planId + "/" + attachmentId, { headers: getRequestHeaders() })
        .then((response) => {
            setSourceLink(response.data.link)
            linkLoaded = true
        })
        .catch((error) => {
            console.log("Failed")
            console.log(error.response.status)

        })
    }
    const handleRemove = () => {
        showModalFunction([planId], attachmentId, 'attachment')
    }

    return (
        <div className='panel'>
            <img alt="" src={sourceLink} />
            <p>{displayName}<span className="delete-item-button" onClick={handleRemove}>x</span></p>
        </div>
    )
}


export default AttachmentItem

