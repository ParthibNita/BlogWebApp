import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'

function LogoutBtn() {
  //add a loading state
  const dispatch = useDispatch()

  const LogoutHandler = ()=>{
    authService.logout()
    .then(()=>{
      dispatch(logout())
    })
    .catch((error)=>{
      console.log('Error logging out', error);
    })
  }

  return (
    <div>
      <button
      onClick={LogoutHandler}
      >
        Logout
      </button>
    </div>
  )
}

export default LogoutBtn