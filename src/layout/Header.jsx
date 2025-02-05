import { Link } from "react-router-dom"
import menu from '../assets/menu.png'
import cartimg from '../assets/shopping-cart.png'
import logout from '../assets/logout.png'
import { CgProfile } from "react-icons/cg";
import AOS from 'aos'
import{useEffect,useContext} from 'react'
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { Logout } from "../utility/functions";
import { CartContext } from "../Context/ContextCart";
import Cart from "../pages/Cart";
import 'aos/dist/aos.css';
import { useState } from "react"
 function Header({children}) {
  const [sum,set_sum]=useState(0) 
  const [Menu,set_menu]=useState(false)

  const navigate=useNavigate()
  
  const {cart,cartMenu,set_cartMenu}=useContext(CartContext)

  useEffect(()=>{
if(Array.isArray(cart)){
  const TotalCapacity=
  cart.reduce((acc,product)=>{
    return acc+product.quantity
  },0)
  set_sum(TotalCapacity)
}
else{
  set_sum(0)
}
  
    },[cart])


  const token=localStorage.getItem('Token')
 
  let hover_nav="hover:opacity-35"
 
  let design_nav_mobile="mb-4  hover:opacity-75 font-bold"
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();  
  }, []);

  return (
    <div className="flex flex-col w-full">
    {token ? '' : (
      <div className="items-center text-center bg-black text-white">
        <span>Sign up and Get Started.</span>
        <Link className="font-semibold underline pl-3" to='/signup'>Sign up Now</Link>
      </div>
    )}
  
   
    <div className="flex items-center justify-between p-3 sticky top-0 bg-white opacity-90 shadow z-50">
      
    <nav className="flex flex-col items-center justify-center ">
     
      <h1 className="bg-red-700 px-2 rounded-full text-white text-sm font-semibold text-center ">{sum}</h1>
      <Link onClick={()=>{set_cartMenu(!cartMenu)}} className={`${hover_nav}  pl-2`} ><img className="w-7" src={cartimg}/></Link>
    </nav>
    {cartMenu?<nav> <div className={`fixed top-0 left-0 w-2/3 md:w-1/2 h-full overflow-y-auto bg-white overflow-auto text-black  z-50`}>
            <div className="flex justify-end p-4">
              <button onClick={()=>{set_cartMenu(false)}}
              className="text-black md:text-3xl font-bold text-2xl">&times;</button>
            </div>
            <nav data-aos="fade-right" className="flex flex-col p-4"> {/** Displaying MESSAGE IF CART IS EMPTY */}
         <Cart/>
            </nav>
          </div></nav>
          
          :''}
     
    {/**CART MENU ABOVE! */}
      
      
      <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className='font-bold text-3xl font-serif'>catalyst</h1>
      </Link>
      
      
      <nav className='flex flex-row justify-end w-full md:hidden'>
        <button onClick={() => set_menu(!Menu)}>
          <img className='w-6' src={menu} alt="Menu Icon" />
        </button>
        {Menu && (
          <div className={`fixed top-0 right-0 w-1/2 h-full bg-black text-white transition-transform duration-300 transform ${Menu ? 'translate-x-0' : 'translate-x-full'} z-50`}>
            <div className="flex justify-end p-4">
              <button onClick={() => set_menu(!Menu)} className="text-white text-2xl">&times;</button>
            </div>
            <nav data-aos="fade-left" className="flex flex-col p-4">
              <p className="text-white text-left m-5 text-3xl font-serif font-bold">catalyst</p>
              <ul className="m-5 font-serif">
                <li className={`${design_nav_mobile}`}><Link to="/">Home</Link></li>
                <li className={`${design_nav_mobile}`}><Link to="/about">About</Link></li>
                <li className={`${design_nav_mobile}`}><Link to="/shop">Shop</Link></li>
                <hr/>
                <div className="mt-5">
                  {token ? (
                    <Link to="/profile">
                      <li className="flex flex-row items-center">
                        <CgProfile className="hover:opacity-50" size={25}/>
                        <span className="pl-2 hover:opacity-50">Profile</span>
                      </li>
                    </Link>
                  ) : ''}
                  {token ? (
                    <li>
                      <button className="hover:underline" onClick={() => {Logout(navigate)}}>
                        <div className="flex ml-1 mt-3 items-center flex-row">
                          <img src={logout} alt="Logout" />
                          <span className="pl-2 font-serif">Sign Out</span>
                        </div>
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link className="hover:underline flex items-center" to="/signup">
                        <img src={logout} alt="Login" />
                        <span className="pl-2 font-serif">Sign In</span>
                      </Link>
                    </li>
                  )}
                </div>
              </ul>
            </nav>
          </div>
        )}
        {Menu && (
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => set_menu(!Menu)}></div>
        )}
      </nav>
  
 
      <nav className='hidden lg:gap-10 lg:text-lg md:flex items-center  text-center font-semibold justify-end m-3 gap-5 text-lg w-full'>
        <Link className={`${hover_nav}`} to='/shop'>Shop</Link>
        <Link className={`${hover_nav}`} to='/about'>About</Link>
        
        {token ? <Link to="/profile"><CgProfile size={32}/></Link> : <Link to="/signup?message=You must Login First."><CgProfile size={32}/></Link>}
      </nav>
    </div>
  
    {children}
  </div>
  

  )
}

export default(memo(Header))
