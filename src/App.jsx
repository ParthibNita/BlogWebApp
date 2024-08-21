import React, { useState, useEffect } from 'react'
import authService  from './appwrite/auth'
import {useDispatch} from 'react-redux'
import './App.css'
import { login, logout } from './features/authSlice'
import {  Header,Footer } from './components'

function App() {

  const  [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getAccountStatus()
    .then((userData)=>{
      if(userData) {
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO:{/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
