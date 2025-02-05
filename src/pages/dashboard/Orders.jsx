import { useState,useEffect } from 'react'
import axios from 'axios'
import img from '../../assets/right.png'
import Loading from '../../layout/Loading'
import Error from '../../layout/Error'

const Orders = () => {
const API_URL=import.meta.env.VITE_API_URL
const [order,set_order]=useState([])
const [current_page,set_current]=useState(1)
const[totalPages,set_total]=useState(0)
const [loading,set_loading]=useState(false)
const [error,set_error]=useState('')

  const getOrder=async()=>{
    try{
    set_loading(true)
    set_error('')
    const response=await axios.get(`${API_URL}api/dashboard/orders?page=${current_page}&limit=5`,{withCredentials:true})
    set_order(response.data.Orders)
    set_total(response.data.totalPages)
    set_loading(false)
    }
    catch(err){
      set_error('Unexpected Error While Trying to Retrieve Data')
    }

  }
  function IncrementPage(){
    if(totalPages>=current_page){
        set_current(prev=>prev+1)
        }
        else{
            return;
        }
       }
    

function DecrementPage(){
    if(current_page===1){
        return;
    }
        set_current(prev=>prev-1)
   
}
  useEffect(()=>{
    getOrder()
  },[current_page])
  
 
  return (
    
      <div className='lg:w-3/4 h-auto  lg:flex-col '>
        
          <h1 className='m-5 font-mono  text-2xl font-bold'>Orders Dashboard</h1>
          {error?<h1 className={`m-5`}><Error message={error}/></h1>:''}
      {loading?(<Loading height={50}/>):(<div className=" flex justify-center w-full p-4">
        <div className="overflow-x-auto   max-h-[75vh]   w-full sm:w-auto">
          <table className="w-full  relative md:w-auto border-collapse border  shadow-md rounded-lg border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Order ID</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Email</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">User ID</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Phone</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">State</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Country</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">First Name</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Last Name</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Address</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Items</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Status</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Payment Type</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Total Price</th>
                <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Time Purchase</th>
              </tr>
            </thead>
            <tbody>
              
        {order.map((order)=>{
    return(
  <tr key={order._id}>
                  
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order._id}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.email}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.userId}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.phone}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.state}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.country}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.first_name}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.last_name}</td>
    <td className="border text-[10px] sm:text-xs p-5 border-gray-300">{order.address}</td>
    <td className="border text-[10px] sm:text-xs p-5 sm:p-2 border-gray-300">14th MK and 12312 K</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.status}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.payment_type}</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.Total_Price} EGP</td>
    <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{order.TimeOfPurchase}</td>
    <td className="border  border-gray-300">
      <div className="flex flex-col sm:flex-row justify-center items-center">
       
      </div>
    </td>
  </tr> ) 
        })}
               
           
            </tbody>
           
           
          </table>
         
        </div>
        
      </div>)}
     
      
    {loading? '' :(<div  className='flex justify-center gap-3  m-5 items-center'>
       {current_page===1? '':<button onClick={DecrementPage}><img className='transform scale-x-[-1] w-2' src={img}/></button>}  
      <h1>Page<span> {current_page}/{totalPages}</span></h1>
      {totalPages<=current_page?'':<button onClick={IncrementPage}><img className='w-2 ' src={img}/></button>}
      
      </div>)}
         </div>
   
  )
}

export default Orders
