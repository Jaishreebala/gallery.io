import React from 'react'
import { Redirect } from 'react-router-dom'

function Feed({ isLoggedIn }) {
    return (

        <div>
            {!isLoggedIn ? <Redirect to="/login" /> : ""}
        </div>
    )
}

export default Feed
