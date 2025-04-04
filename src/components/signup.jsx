import React,{useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login as authlogin} from '../store/authslice'
import {Button as Mybutton , Input ,Logo} from './index'
import { useForm } from 'react-hook-form'
import authservice from '../appwrite/auth'


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const {register,handleSubmit,formState: {errors}}= useForm();
    const onsubmit = async(data)=>{
        setLoading(true);
        setError("")
        try {
            const sesion  = await authservice.createAccount(data.email , data.password ,data.name);
            if(sesion){
                const user = await authservice.getCurrentUser();
                if(user){
                    dispatch(authlogin({userData:user}));
                }
                navigate("/")
            }else{
                setError("Account creation failed")
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    }

  return (
      <div
      className='flex items-center justify-center w-full'
      >
          <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
          <div className="mb-2 flex justify-center">
                      <span className="inline-block w-full max-w-[100px]">
                          <Logo width="100%" />
                      </span>
  
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Create Your account</h2>
          <p className="mt-2 text-center text-base text-black/60">
                      Already Have an Account?&nbsp;
                      <Link
                          to="/login"
                          className="font-medium text-primary transition-all duration-200 hover:underline"
                      >
                          login
                      </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(onsubmit)} className='mt-8'>
              <div className='space-y-5'>
                  <Input
                  label="Name: "
                  placeholder="Enter your name"
                  {...register("name", {
                      required: true,
                  })}
                  />
                  <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                      required: true,
                      validate: {
                          matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      }
                  })}
                  />
                  <Input
                  label="Password: "
                  type="password"
                  placeholder="Create your password"
                  {...register("password", {
                      required: "Password is required",
                      minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long",
                      },
                  })}
                  />
                  {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                  {(loading)?(
                    <Mybutton
                    type="loading"
                  ></Mybutton>
                  ):(
                    <Mybutton
                  type="submit"
                  >Sign up</Mybutton>
                  )}
                  
              </div>
          </form>
          </div>
      </div>
    )
  }

export default Signup