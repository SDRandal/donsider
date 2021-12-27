import React from 'react'

function UserItem({user, stackable = false}) {
    return (
        <div className={"plan-user-icon-wrapper" + stackable ? " stackable" : ""}>
            <div className="plan-user-icon-container small">
                <img key={user._id} className="plan-user-icon" alt="plan-user" src={user.avatarUrl}></img>
            </div>

        </div>
    )
}


export default UserItem

