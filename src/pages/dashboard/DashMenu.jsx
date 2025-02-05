
import { useEffect, useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';



export const DashMenu = () => {
    const [sideBar,set_sideBar]=useState(false)
   useEffect(()=>{
    AOS.init({
      duration:1000
    })
   AOS.refresh()
   },[])  
  return (
    <div className='flex flex-col   lg:flex-row'>
      <div  data-aos="fade-right" className="hidden lg:flex w-1/3 h-screen  p-5 bg-black z-1 text-white flex-col">
      <h1 className="font-bold text-white text-left  text-2xl ">Dashboard</h1>
      <ul className="mt-12 font-semibold text-xl flex flex-col gap-5 justify-between">
        <Link className='hover:opacity-80' to='/admin'>Main</Link>
        <Link className='hover:opacity-80' to="/admin/users">Users</Link>
        <Link className='hover:opacity-80' to="/admin/orders">Orders</Link>
        <Link className='hover:opacity-80' to='/admin/products'>Products</Link>
      </ul>
      </div>
      
        {sideBar?(
        <div  data-aos="fade-right" className={`fixed top-0 left-0 w-3/4 h-screen opacity-95 bg-black text-white z-50`} >
           <div className="flex justify-end p-4">
              <button onClick={() => set_sideBar(!sideBar)} className="text-white text-2xl">&times;</button>
            </div>
          <h1 className='m-5 font-bold text-2xl'>Dashboard</h1>
         <ul className='mt-10 flex flex-col gap-6 m-5 font-semibold text-xl '>
          <Link className='hover:opacity-80' to="/admin">Main</Link>
          <Link className='hover:opacity-80' to="/admin/users">Users</Link>
          <Link className='hover:opacity-80' to="/admin/orders">Orders</Link>
          <Link className='hover:opacity-80' to="/admin/products">Products</Link>
         </ul>

          </div>
        ):''}
    <div className=' lg:hidden flex-row flex justify-between'>
        
    <button onClick={()=>{set_sideBar(!sideBar)
    }} className='flex m-5 flex-row text-center items-center '>
        <IoIosMenu  size={30}/>   
    </button>
    <h1 className='m-5 font-mono font-bold  text-2xl sm:text-4xl'>Dashboard</h1>
   
    </div>
    <Outlet/>
    </div>
  )
}

export default DashMenu
