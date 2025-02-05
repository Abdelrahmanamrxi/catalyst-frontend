import { useEffect, useState } from "react"
import { MdOutlinePayment } from "react-icons/md";
import { DecodeJWT } from "../utility/functions";
import Error from "../layout/Error";
import  img from '../assets/check.png'
import { CartContext } from "../Context/ContextCart";
import { useContext } from "react";
import  axios from 'axios'
import Loading from "../layout/Loading";
import { useCallback } from "react";
import { useNavigate,Link,useLocation } from "react-router-dom";
import { ScrollTop} from "../utility/functions";
import { FaArrowLeft } from "react-icons/fa";
export default function Checkout() {
  const API_URL=import.meta.env.VITE_API_URL
  const [paypal,set_paypal]=useState(false)
  const[error,set_error]=useState("")
  const[message_success,set_message]=useState('')
  const location=useLocation();
  const {set_cart}=useContext(CartContext)
  const navigate=useNavigate()
  
  const token=localStorage.getItem('Token')
 const CheckUser=()=>{
  if(token){
    const{userId}=DecodeJWT(token)
    return userId
  }
  else{
    return 'Guest'
  }

 }

  
  
  const sum=location.state.sum
  
    const items=JSON.parse(localStorage.getItem('cart'))
    const [order_info,set_order]=useState({
      userId:CheckUser,
      email:'',
      country:'Egypt',
      first_name:'',
      last_name:'',
      address:'',
      apartment:'',
      state:'',
      phone:'', 
      payment_type:'',
      payment:{
      card_number:'',
      security_code:'',
      expiration_date:''},
      items,
      Total_Price:sum
    })
 const handleChange=(event)=>{
  const {name,value}=event.target
  
  if(order_info.payment_type==="credit"&&['card_number','security_code','expiration_date'].includes(name)){
   set_order((prev_order)=>{
    return {...prev_order,payment:{...prev_order.payment,[name]:value}}
   })
  }
  else{
    set_order({...order_info,[name]:value})
  }
}


    const handleSubmit =useCallback(async(e)=>{
      e.preventDefault()
      ScrollTop()
      
      let orderData={...order_info}
      delete orderData.items.image
      if(orderData.payment_type==="COD"){
        delete orderData.card_number
        delete orderData.security_code
        delete orderData.expiration_date
      }
      try{
        set_error('')
        set_message('')
      await axios.post(`${API_URL}api/orders`,orderData)
      set_message("Your Order has been created succesfully")
      localStorage.removeItem('cart')
      set_cart([])
       
      }
      catch(err){
       console.log(err)
    if(err.response.data){
    set_error(err.response.data.msg)
       }
       else{
        set_error('An Unknown Error occured.')
       }
      }

    },[order_info])

    useEffect(()=>{
      if(message_success){
      const timer=setTimeout(()=>{
        navigate('/')
      },1000)
      return ()=>clearTimeout(timer)
    }
    },[message_success,navigate])
 
    const governorates = [
        "Cairo", "Alexandria", "Giza", "Dakahlia", "Red Sea", "Beheira", "Fayoum",
        "Gharbia", "Ismailia", "Monufia", "Minya", "Qaliubiya", "New Valley", 
        "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "Sharkia", 
        "South Sinai", "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", 
        "Sohag"]

    return (
      <div>
      {message_success?(
        <div  className="flex justify-center p-3 flex-col items-center  mt-10">
          <h1 className="text-3xl font-sans font-bold mb-5">Checkout</h1>
          <div className="flex   gap-2 flex-row items-center ">
        <h1 className="font-bold text-xl md:text-2xl text-green-600">Your Order has been placed </h1>
        <img className="w-9" src={img}/>
        </div>
        <h1 className="text-md  mt-5 font-bold">An email has been sent to you with details of your order.</h1>
        </div>
        ):(<div className="m-5 md:flex md:flex-row h-screen">
    
    {/* Left Section: Form */}
    <div className="md:w-1/2 w-full flex flex-col">
    <Link to={(-1)} className="flex flex-row items-center hover:underline gap-2"> <FaArrowLeft/>Back</Link>
        <div className="flex flex-col items-center justify-center mt-9 mb-4">
          <h1 className="text-3xl font-sans font-bold">Checkout</h1>
          {(<Error message={error}/>)}
        </div>
      
        <form onChange={(e)=>{handleChange(e)}} onSubmit={(e)=>{handleSubmit(e)}}>
        <h1 className="text-2xl font-sans font-bold mb-3">Contact</h1>

        <div className="flex flex-col">
          <div>
            <label className="mb-2 text-base block">Email</label>
            <input
              type="email"
              name="email" 
              placeholder="jack@gmail.com"
              className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>

          <h1 className="text-2xl font-sans font-bold mb-5">Payment Information</h1>

          <div>
            <label className="mb-2 text-base block">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Egypt"
              disabled
              className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>

          <div className="flex md:flex-row flex-col md:space-x-3">
            <div className="w-full">
              <label className="mb-2 text-base block">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 text-base block">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="mb-2 text-base block">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>

          <div className="w-full">
            <label className="mb-2 text-base block">Apartment or Suite</label>
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, Suite, etc."
              className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 text-base block">Governorate</label>
            <select name="state" className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500">
              <option value="">Select Governorate</option>
              {governorates.map((governorate, index) => (
                <option  key={index} value={governorate}>
                  {governorate}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="mb-2 text-base block">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+20"
              className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>

          <h1 className="mt-5 mb-3 text-2xl font-sans font-bold">Payment Method</h1>

          <div className="border-1 flex flex-row gap-1 border-black px-2 py-2">
            <input type="radio" name="payment_type" value="COD" />{" "}
            <h1>Cash On Delivery (COD)</h1>
          </div>

          <div
            className={`border-1 mb-10 border-black ${
              paypal ? "bg-gray-200" : "bg-white"
            } ${paypal ? "border-b-1" : ""} px-2 py-2 rounded-md`}
          >
            <div className="flex flex-row gap-1 items-center">
              <input
                onClick={() => {
                  set_paypal(!paypal);
                }}
                type="radio"
                name="payment_type"
                value="credit"
              />{" "}
              <h1 className="flex flex-row items-center font-sans text-lg gap-3">
                Credit Card <MdOutlinePayment />
              </h1>
            </div>

            {paypal && (
              <div className="w-full mt-3">
                <hr />
                <label className="mb-2 text-base block">Card Number</label>
                <input
                name="card_number"
                  type="text"
                  value={order_info.payment.card_number}
                  onChange={handleChange}
                  placeholder="2321-3123-1233-0111"
                  className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                />
                <div className="flex space-x-3">
                  <div className="w-1/2">
                    <label className="mb-2 text-base block">Expiration Date</label>
                    <input
                      value={order_info.payment.expiration_date}
                      onChange={handleChange}
                      type="text"
                      name="expiration_date"
                      placeholder="03/27"
                      className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="mb-2 text-base block">Security Code</label>
                    <input
                    onChange={handleChange}
                    value={order_info.payment.security_code}
                      type="text"
                      name="security_code"
                      placeholder="231"
                      className="mb-3 px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
 <div  className="  md:hidden  flex flex-col">
{items&&items.map((product)=>{
  return(
    <div  className="flex mb-5  shadow-lg border-2 rounded-lg p-3 flex-row items-center justify-between gap-2" key={product._id}>
     <div  className="relative">
      {product.image?(<img className="w-14 rounded-md" src={product.image.startsWith('uploads') ? `${API_URL}${product.image.replace(/\\/g, '/')}` : product.image}/>):(
<     Loading height={30}/>
      )}
       <span className="absolute top-0 left-0 mr-4 bg-black text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                  {product.quantity}
                </span>
      <h1 className="mt-3 font-sans font-semibold text-md">{product.title}</h1>
      <h1 className=" mt-2 font-bold font-sans text-lg"> Size: <span className="font-semibold">{product.size}</span></h1>
      </div>
      <h1 className="font-sans">{product.price} EGP</h1>
     
      </div>
  )
})}
<div className="flex flex-row mb-2 items-center justify-between ">
<h1>Subtotal</h1>
<h1 className="font-bold font-sans text-lg">{sum}.00 EGP</h1>
</div>
<div className="flex  flex-row mb-3 items-center justify-between">
<h1 className="font-sans">Shipping</h1>
<h1 className="font-bold font-sans text-green-700 text-lg">FREE</h1>
</div>
<div className="flex mb-5  flex-row items-center justify-between">
<h1 className="font-bold text-2xl font-sans">Total</h1>
<h1 className="font-bold text-xl font-sans">{sum} EGP</h1>
</div>
</div>
        <button
          type="submit"
          className="bg-green-700 font-sans font-semibold hover:bg-green-900 px-3 py-2  focus:outline-blue-700 mb-12 uppercase rounded-sm text-white w-full"
        >
          Pay Now
        </button>
      </form>
    </div>
    

    {/* Right Section: Order Summary */}
    <div className="md:w-1/2 w-full hidden md:flex mt-9 mb-4 ml-12 items-center md:justify-center">
      <div className="flex flex-col  gap-3">
        {items&&items.map((product) => {
          return (
            <div
              className="flex items-center border-2  shadow-md p-5 rounded-lg border-gray-100 justify-between space-x-2"
              key={product.productID}
            >
              <div className="relative">
            {product.image?(<img
                  src={product.image.startsWith('uploads') ? `${API_URL}${product.image.replace(/\\/g, '/')}` : product.image}
                  className="w-12 bg-gray-600 object-cover"
                  alt={product.title}
                />):(
                  <Loading height={30}/>
                )}
                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-black text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                  {product.quantity}
                </span>
                <h1 className=" mt-2 font-bold font-sans text-lg"> Size: <span className="font-semibold">{product.size}</span></h1>
              </div>
              <h1 className="text-md font-sans tracking-tight font-semibold leading-tight">
                {product.title}
              </h1>
             
              <h1 className="pl-5 font-sans">{product.price} EGP</h1>
             
           
            </div>
          );
        })}
        <div className="md:flex flex-row items-center md:justify-between hidden">
          <h1>Subtotal</h1>
          <h1 className="font-bold font-sans text-lg">{sum}.00 EGP</h1>
        </div>
        <div className="md:flex hidden flex-row items-center md:justify-between">
          <h1 className="font-sans">Shipping</h1>
          <h1 className="font-bold font-sans text-lg">FREE</h1>
        </div>
        <div className="md:flex hidden flex-row items-center md:justify-between">
          <h1 className="font-bold text-2xl font-sans">Total</h1>
          <h1 className="font-bold text-xl font-sans">{sum} EGP</h1>
        </div>
      </div>
    </div>

    
  </div>)}
      </div>
  
    );
    
}
