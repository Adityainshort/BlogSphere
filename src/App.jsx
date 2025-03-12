import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authslice"
import { Footer, Header, Loader } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((e) =>dispatch(logout()))
    .finally(() => setLoading(false))
  }, [dispatch])
  
  return !loading ? (
    <div className='content-between w-full  min-h-screen flex flex-col flex-wrap justify-between bg-gray-400'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
    </div>
  ) : 
  (<div className=''><Loader/></div>)
}
export default App