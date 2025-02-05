import '../App.css'
import Framer from '../Tools/Framer'
import img from '../assets/home.jpg'
import {useContext, useEffect ,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Product_Card from '../utility/Product_Card'
import { CartContext } from '../Context/ContextCart'
import Loading from '../layout/Loading'
import { CheckToken } from '../utility/functions'
export default function Home() {
  const API_URL=import.meta.env.VITE_API_URL
  const[loading,set_loading]=useState(false)
  const {cart,addtocart}=useContext(CartContext)
  const [showcase_products,set_products]=useState([])
  const navigate=useNavigate()
  const token=localStorage.getItem('Token')
  useEffect(()=>{
    CheckToken(token,navigate)
  },[navigate,token])

  
  useEffect(()=>{
    async function ShowCase_Products(){
     try{
      set_loading(true)
      const response=await axios.get(`${API_URL}api/products?limit=3`)
      set_products(response.data.getProducts)
      set_loading(false)
      }
    catch(err){
      console.log(err)
      }
    }
  ShowCase_Products()

  },[])

  return (
    <div>
  <div className='relative'>
    <img className='w-full h-screen object-cover filter brightness-50 ' src={img}/>
    
    <div className='absolute  inset-0 flex flex-col items-center justify-center m-2'>
    <Framer>
    <h1 className='sm:text-2xl text-xl tracking-wide  p-3 leading-loose  font-bold  text-white'>Elevate your style with timeless pieces that speak sophistication and comfort
      </h1>
      </Framer>
      
    <Link to='/shop'>  <button className='uppercase bg-black border-1 font-bold px-16 text-white py-2 mt-3 hover:bg-transparent hover:border-white-2 hover:border-2 rounde-sm '>Shop</button>
    </Link>
      
      </div>
    
  
  </div>
 
  <div data-aos="fade-up" className='m-5'>
 <h1 className="text-4xl font-bold mb-5 font-serif">Our Shop</h1>
 <div className='sm:flex-row flex-col flex justify-center gap-4 '>
  {loading?<Loading height={30}/>:showcase_products.map((products)=>(
    <Product_Card cart={cart} addtocart={addtocart} key={products.id} {...products}/>
  ))}
 </div>
 <div className='flex justify-center '>
  <Link to="/shop"> <button className='mt-16 mb-10 max-w-xs border-black border-2 px-8 py-2 hover:bg-black hover:text-white  text-black font-bold uppercase '>View All Products</button></Link>
 </div>
 </div>
  

  </div>
  )
}
