import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate,useLocation } from "react-router-dom"
import Error from "../layout/Error"

export default function AdminAuth() {
const API_URL=import.meta.env.VITE_API_URL  
const[admin,set_admin]=useState({
  email:'',
  password:''
})
const [error,set_error]=useState('')
const location=useLocation()
const navigate=useNavigate()


  function handleChange(e){
    const {name,value}=e.target
    set_admin({...admin,[name]:value})
  }
  async function handleSubmit(e){
    e.preventDefault()
    try{
    set_error('')
    const response=await axios.post(`${API_URL}api/dashboard/auth`,{admin},{withCredentials:true})
    if(response.data.login){
      navigate('/admin')
    }
    
    }
    catch(err){
      set_error(err.response.data.msg)
    }
  }
  useEffect(()=>{
    if(location.state?.message){
      set_error(location.state.message)
    }
  },[location.pathname])
  
  
  return (
    <div className='flex items-center h-screen justify-center'> 
        <div className='flex flex-col  justify-center  border-2 border-slate-600  rounded-lg sm:w-1/2 md:w-1/2 w-full m-3'>
         <div className='flex justify-center m-5 items-center  flex-col'>
           <h1 className='font-bold text-4xl font-serif'>catalyst</h1>
           <h1 className='mt-2 md:text-lg text-sm font-sans font-semibold'>Log-In To Start Tracking your Website</h1>
           <h1>{<Error message={error} />}</h1>
           </div>
           <div className='justify-center flex flex-col  m-5'>
            <form  onChange={handleChange} onSubmit={(e)=>{handleSubmit(e)}}>
           <label htmlFor="email" className="text-black  mt-5 md:text-black block mb-2">Email</label>
              <input 
                name="email"
                type='email'
                className="md:w-full px-5 bg-transparent border-2 w-full  shadow-md md:text-black placeholder:text-slate-400 text-black  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="john@example.com"
              />
            
           <label htmlFor="password" className="text-black  mt-5 md:text-black block mb-2">Password</label>
              <input 
                name="password"
                type='password'
                className="md:w-full px-5 bg-transparent border-2 w-full  shadow-md md:text-black placeholder:text-slate-400 text-black  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="Type here.."
              />
               <button className='mt-6  bg-black border-2 w-full item rounded-md hover:opacity-85 font-serif font-bold px-16 py-2 text-white'> Log In</button>
               </form>
           </div>
        </div>
    
      
    </div>
  )
}
