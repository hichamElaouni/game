import React, { useEffect } from 'react'
import Login from './Auth/Login'

export default function Dashboard(props) {
  const { setAuth, auth, setUser, user } = props;


  return (
    <>
      {/* <div className='formLogin'>
          <Login setAuth={setAuth} setUser={setUser} user={user} />
        </div>  */}
      <div>
        <h1>Dashboard</h1>
      </div>

    </>
  )
}

