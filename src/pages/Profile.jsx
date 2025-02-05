
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useEffect,useState,memo,useRef } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import user from '../assets/user.png'
import { Logout } from '../utility/functions';

 function Profile() {
    const API_URL=import.meta.env.VITE_API_URL
    const[message,set_message]=useState('')
    const[error,set_error]=useState('')
    const[profile,set_profile]=useState({})
    const[toggle_profile,set_toggled]=useState(false)
    const[toggle_order,set_toggled_order]=useState(false)
    const [prev_order]=useState(false)
    const[privacy,set_privacy]=useState(false)
    const navigate=useNavigate()
    const firstRender=useRef(true)
    const [formData,set_form]=useState({
        current_password:"",
        new_password:""
    })
    const token=localStorage.getItem('Token')
  
    async function UpdatePassword(e){
        const {current_password,new_password}=formData
        e.preventDefault();
        set_error('')
        set_message('')
        try{
        const response=await axios.patch(`${API_URL}api/users/profile`,{current_password,new_password,email:profile.email},{headers:{
            'Authorization':`Bearer ${token}`
        }})
        
       set_message(response.data.msg)
       setTimeout(()=>{
        navigate('/')
       },2000)
       
       
    }
    catch(err){
       console.log(err)
       set_error(err.response.data.msg)
    }
    }
 function handleChange(e){
    const {name,value}=e.target
    set_form({...formData,[name]:value})
} 
    async function getUserInfo(){
        try{
            const response=await axios.get(`${API_URL}api/users/profile`,{
            headers:{
            'Authorization':`Bearer ${token}`
            }
            })
          
             set_profile(response.data.user)
         }
         catch(err){
        console.log(err)
         }
         }


    useEffect(()=>{
        if(firstRender.current===true){
        getUserInfo()
       
    }
        firstRender.current=false
    },[])


    const extractName = (email) => {
        if (!email) return ''; 
        const namePart = email.split('@')[0]; 
        return namePart.replace(/\./g, ' ').trim();
    };


    function ToggledProfile(){
        set_toggled(!toggle_profile)
    }
    function ToggledPrivacy(){
        set_privacy(!privacy)
    }
  

    function ToggledOrder(){
        set_toggled_order(!toggle_order)
    }
    const name=extractName(profile.email)
   
  let input_design="w-2/3 md:w-1/3 bg-transparent border-2 p-2  shadow-md md:text-black placeholder:text-slate-400  text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
  return (
   
    <div className='min-h-screen'>
         <h1 onClick={()=>{navigate(-1)}} className='m-5  font-semibold hover:underline text-xl tracking-wide flex items-center gap-2 cursor-pointer flex-row'><IoMdArrowRoundBack/>Back</h1>
        <div className='flex flex-col  justify-center items-center m-12 '>
            <img className='w-12 mb-5' src={user}/>
            <h1 className='text-3xl font-serif font-bold'>{name}</h1>
            </div>
            <div className='m-5 flex flex-col gap-5'>
            <div onClick={ToggledProfile} className='flex flex-row items-center gap-3'>
           <h1 className='md:text-2xl cursor-pointer text-xl font-serif font-bold'>Profile Information</h1>
           
            {toggle_profile?<h1><IoIosArrowDown/></h1>:<h1> <IoIosArrowForward/></h1>}
            </div>
           {toggle_profile?<form className='flex flex-col' onSubmit={(e)=>{UpdatePassword(e)}}>
          
           {error?<h1 className=' mb-5 text-red-600 font-semibold font-serif'>{error}</h1>: 
            <h1 className=' text-green-700 font-semibold font-serif'>{message}</h1>
            }
            <div data-aos="fade-up" className='gap-3  flex items-start flex-col'>
            
            <label className='font-serif font-medium text-md' htmlFor='email'>Email:</label>

              <input onChange={(e)=>{e.target.value}} className={`${input_design}`} name='email' value={profile.email} type="email" placeholder={profile.email} disabled={true}/>
               <label className='font-serif font-medium text-md' htmlFor='current_password'>Current Password</label>
               <input onChange={handleChange} className={`${input_design}`}
               type="password" name="current_password"/>
<label className='font-serif font-medium text-md' htmlFor='current_password'>New Password</label>
               <input onChange={handleChange} className={`${input_design}`}
               type="password" name="new_password"/>
               <button className='bg-black px-11 mt-2 hover:opacity-50 py-1 text-white font-bold font-serif rounded-md'>Save</button>
             
            </div>
            </form>
            
        :null}
        <div onClick={ToggledOrder}className='flex cursor-pointer flex-row items-center gap-3 '><h1 className='md:text-2xl text-xl font-serif font-bold'>Previous Orders</h1>
        {toggle_order?<h1><IoIosArrowDown/></h1>:<h1> <IoIosArrowForward/></h1>}
        </div>
        {toggle_order?prev_order?prev_order:<h1 data-aos="fade-up"className=' text-xl font-semibold'>No Previous Orders</h1>:null}
     
        <div onClick={ToggledPrivacy} className='cursor-pointer flex flex-row items-center gap-3'><h1 className='md:text-2xl text-xl font-serif font-bold'>Privacy & Policy</h1>
        {privacy?<h1><IoIosArrowDown/></h1>:<h1> <IoIosArrowForward/></h1>}
        </div>
          {privacy?<h1 data-aos="fade-up" className =' tracking-wider leading-relaxed font-serif pb-10'>At Catalyst, we value the privacy and trust of our customers. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit or make a purchase from our online store.
            When you visit our store or make a purchase, we collect the following types of personal information:

Contact Information: This includes your name, email address, phone number, and shipping address, which we use to process your orders and communicate with you.
Payment Information: We collect payment details (such as credit card numbers or payment service provider information) to process your transactions securely.
   <span className='font-bold font-xl uppercase'>
we do not accept refunds or exchanges. All sales are final. We encourage customers to carefully review product descriptions, sizes, and other details before making a purchase. If you encounter an issue with your order, please contact us at , and we will do our best to assist you.
</span>
          </h1>:null}
        
         <div className='h-24 '> <button onClick={()=>{Logout(navigate)}} className='mt-4 bg-black flex text-white justify-center w-32 rounded-sm font-semibold px-2 py-1 font-serif  '>Sign Out</button></div>
        
        </div>


    </div>
  
  )
}
export default memo(Profile)
