import React from 'react'
import UserItem from './users/UserItem'

function UserIcons({ users }) {

    const icons = users.map((user, i) => (
        // TODO this should just be the user id
        <UserItem stackable={true} user={user} key={i}></UserItem>
    ))
    return (
        <div>
            {icons}
        </div>
    )
}

export default UserIcons
