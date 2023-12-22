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
      <div>
        <div>Logo</div>
        <h2>Sign Up to your account</h2>
        <p>Already have an account? <Link to="/signup">Log In</Link></p>
        {error && <p>{error}</p>}
        <form onSubmit={handelSubmit(create)}>
            <div>
                <Input
                    label="Full name:"
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                />
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
                <Button type="submit">Sign Up</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
