import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authslice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            Navigate('/')
        }).catch((e) => {
            console.log("Logout Error", e);
        }).finally(() => {
            console.log("Logout Success");
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn