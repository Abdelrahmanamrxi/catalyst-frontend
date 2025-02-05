import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"




const CheckAdmin = ({children}) => {
    const API_URL=import.meta.env.VITE_API_URL
    const[isAdmin,set_admin]=useState(false)
    const navigate=useNavigate()
    const CheckAdmin=async()=>{
        try{
            const response=await axios.get(`${API_URL}api/dashboard/auth`,{withCredentials:true})
            if(response.data.isAdmin){
                set_admin(response.data.isAdmin)
            }
            if(response.data.isAdmin===false){
                navigate('/auth',{state:{message:'UNAUTHORIZED ACCESS Please Log In to Continue'}})
            }
            else if(isAdmin===true){
                navigate('/admin')
            }
        }
        catch(err){
            set_admin(false)
            navigate('/auth',{state:{message:'UNAUTHORIZED ACCESS Please Log In to Continue'}})
        }
     
    }
    
    useEffect(()=>{
        CheckAdmin()
    },[isAdmin])

  return (
    <>
   {children}
   </>
  )
}

export default CheckAdmin
