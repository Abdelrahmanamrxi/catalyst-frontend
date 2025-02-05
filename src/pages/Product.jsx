import{useState,useEffect,useContext} from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import axios  from 'axios'
import { CartContext } from "../Context/ContextCart"
import Loading from '../layout/Loading'
import { IoMdArrowRoundBack } from "react-icons/io"
import { DecodeJWT, handleBack } from '../utility/functions'




export default function Product(){
  
  const API_URL=import.meta.env.VITE_API_URL
    const [selected_size,set_selected]=useState('')
    const[message,set_message]=useState('')
    const [isDisabled, setIsDisabled] = useState(false);
    const[product,set_product]=useState({})
    const{id}=useParams()
    const[error,set_error]=useState({
      name:'',
      status:''
    })
    const[loader,set_loader]=useState(false)
    const {addtocart,set_state,set_cartMenu}=useContext(CartContext)
    const navigate=useNavigate()
    const token=localStorage.getItem('Token')
   



    const sizes=['XS','S','M','L','XL']
   async function AddedCart(productId,category,price){
   if(!selected_size&&category!='jewelery'){
    set_message('Please choose a size')
    setIsDisabled(true)
    return;
  }
  else{
      try{
        set_error({name:'',status:''})
        set_cartMenu(true)
        set_state(true)
        set_message('')
      const {userId}=DecodeJWT(token)
      const response=await axios.post(`${API_URL}api/cart/add`,{
        userId,
        quantity:1,
        productId:productId,
        size:selected_size?selected_size:''
       ,price

      },{
        headers:{
        'Authorization':
        `Bearer ${token}`
      },


      })
      
      const {title,image,category}=response.data
      addtocart(productId,price,title,image,selected_size,category)
      setIsDisabled(false)
    }
    
    catch(err){
      console.log(err)
      set_error({name:err.response.data.msg,status:500})
      set_cartMenu(false)
      

      
    }
  }
    }
  function handleClick(_id,price,title,image,category){
    if(!selected_size&&category!="jewelery"){
      set_message('Please choose a size')
      setIsDisabled(true)
      return;
    }
   else{
      set_message('')
      addtocart(_id,price,title,image, selected_size,category);
      setIsDisabled(false);
   }
  }

  const handleSize = (e) => {
    set_selected(e.target.value); 
    setIsDisabled(false); 
    set_message(''); 
};
    useEffect(()=>{
     async function getProduct() {
      try{
        set_loader(true)
        const response=await axios.get(`${API_URL}api/products/${id}`)
        set_product(response.data.getProduct)
        set_loader(false)
       
       }
        catch(err){
        set_error({name:err.response.data.msg,status:err.response.data.status})
        set_loader(false)
      }
     }
     getProduct()
    },[id])

   

  
    return(
      <div >
{loader?(<Loading height={100}/>):error.name&&error.status!=500?(
  <>
  <Link className='items-center hover:underline m-5 flex-row flex gap-2' to="/"> <IoMdArrowRoundBack/> Go Back</Link>
  <h1 className='h-screen flex items-center justify-center sm:text-3xl text-xl text-red-700 font-semibold font-sans'>{error.name}</h1>
  </>):(
 <div>
 
  <div onClick={()=>{handleBack(navigate)}} className='m-5 hover:underline cursor-pointer flex gap-1 flex-row items-center justify-start'>
    <h1><IoMdArrowRoundBack/></h1>
    <h1 className='text-lg font-serif'>Back</h1>
  </div>
  <div className="flex ml-3 mr-3 items-center lg:h-screen  justify-center">
  <div key={product._id} className="relative mb-32 md:w-2/3 lg:w-3/4 mt-10  flex flex-col lg:flex-row items-center justify-center overflow-hidden md:rounded-xl lg:border md:border-gray-100 bg-white md:shadow-md">
  {product.image ? (
                <img
                  className="object-cover w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:p-3"
                  src={product.image.startsWith('uploads') ? `${API_URL}${product.image.replace(/\\/g, '/')}` : product.image}
                  alt="product image"
                />
              ) : (
                <Loading height={50} /> // Placeholder or loading spinner
              )}

    {product.discount && (
      <span className="absolute top-2 left-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
        {product.discount}% OFF
      </span>
    )}

    <div className="mt-3 px-4 pb-4 min-h-[160px] sm:min-h-[180px] md:min-h-[220px] flex flex-col justify-between">
      <a href="#">
        <h5 className="text-2xl sm:text-3xl sm:mb-5 tracking-tight font-serif font-bold black">
          {product.title}
        </h5>
        <h3 className='capitalize leading-loose font-serif tracking-wider'>{product.description}</h3>
      </a>

      <div className="mt-2 mb-5 flex flex-row items-center justify-between">
        <p className="mr-4">
          <span className="text-xl sm:text-2xl font-bold font-serif ">{product.price} EGP</span>
        </p>
       
      </div>
      {(product.category==="men's clothing"|| product.category==="women's clothing")?(
        <div>
        <h1 className='font-bold text-lg font-serif'>Sizes</h1>
        <div className='flex flex-row gap-2 items-center mt-5'>
        {sizes.map((size)=>{
         return (
            <label key={size} className='flex  items-center cursor-pointer'>
            <input  checked={selected_size===size} onChange={(e)=>{handleSize(e)}}type='radio' className='sr-only peer' value={size}/>
            <span className={`border-2  border-black px-3 rounded-lg w-full py-1 hover:bg-black hover:text-white font-bold text-black ${selected_size==size?'bg-black text-white':''}`}>{size}</span>
            </label>
       
          )
        })}

        </div>
        </div>
       
      ):''}
  {message?<h1 className='text-red-800 font-semibold mt-5 text-lg'>{message}</h1>:''}
  {error.status=="500" && error? <h1 className='text-red-800 font-semibold mt-5 text-lg'>{error.name}</h1>:''}
      <button
       disabled={product.category==="jewelery"?false:isDisabled}
      onClick={token?()=>{AddedCart(product._id,product.category,product.price)}:()=>{handleClick(product._id,product.price,product.title,product.image,product.category)}}
        className="flex items-center  justify-center mt-5 rounded-md bg-black w-full py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 sm:h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to cart
      </button>
    </div>
  </div>
</div>
</div>)}
</div>

    )
}