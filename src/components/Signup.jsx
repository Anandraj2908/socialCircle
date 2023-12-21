import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input} from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handelSubmit} = useForm()
    const [error, setError] = useState("");

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default Signup
