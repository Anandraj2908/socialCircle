import React, { useState } from 'react'
import {login as authLogin} from "../store/authSlice"
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Button, Input} from "./index"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handelSubmit} = useForm()

    const [error, setError] = useState("");

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data);
            if (session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
      <div>
        <div>Logo</div>
        <h2>Sign in to your account</h2>
        <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
        {error && <p>{error}</p>}
        <form onSubmit={handelSubmit(login)}>
            <div>
                <Input 
                label="Email"
                placeholder="Enter your email"
                typr="email"
                {...register("email",
                    {required:true,
                    validate:{
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }})
                }/>
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required:true,
                })}
                />
                <Button type="submit">Log In</Button>

            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
