import React from 'react'

export default function Profile(props) {
    const { user } = props;
    return (
        <div className='profile'>
            <h1>{user.last_name + " " + user.first_name} </h1>
        </div>
    )
}
