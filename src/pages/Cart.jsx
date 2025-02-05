import {  useContext, useEffect } from "react"
import { CartContext } from "../Context/ContextCart"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { DecodeJWT } from "../utility/functions"
import Loading_Cart from "../layout/Loading_Cart"
import Loading from "../layout/Loading"
import {Link} from 'react-router-dom'



export default function Cart() {
    const API_URL=import.meta.env.VITE_API_URL
    const cart=JSON.parse(localStorage.getItem('cart'))
    const {addtocart,RemovefromCart,LoadingState,err}=useContext(CartContext)
    const [loading,set_loading]=useState(false)
    const [error,set_error]=useState({
    name:err?.name||'',
    status:err?.status||''
   } )
    const [sum,set_sum]=useState(0)
    const[loadingProduct,set_loadingProduct]=useState({
    product_id:'',
    size:''
   })
   const navigate=useNavigate()
   const token=localStorage.getItem('Token')


   const handleNavigate = () => {
    navigate('/checkout', { state: { sum:sum } });
  };
  const UpdateCart=async(productId,size)=>{
    try{
      set_loadingProduct({product_id:productId,size:size})
      const {userId}=DecodeJWT(token)
      set_loading(true)
      const response=await axios.put(`${API_URL}api/cart/update`,
        {
          userId:userId,
          productId:productId,
          size:size
        },
        {
        headers:{
        'Authorization':`Bearer ${token}`
        }
        
      })
      const {category,image,title,price}=response.data
       addtocart(productId,price,title,image,size,category)
       set_loadingProduct('')
       set_loading(false)
    }
    catch(err){
      set_loading(false)
      set_error({name:err.response.data.msg,status:err.status})
      
    }
  }
  const DeleteItem=async(productId,size)=>{
    try{
      set_loading(true)
      set_loadingProduct({product_id:productId,size:size})
      const {userId}=DecodeJWT(token)
      const response=await axios.put(`${API_URL}api/cart/delete`,{
      userId:userId,
      productId:productId,
      size:size
    },
    {headers:{
      'Authorization':`Bearer ${token}`
    }}
  )
  if (response.status === 204) {
    RemovefromCart(productId, size);
  }
  else{
  const updatedItem=response.data
  RemovefromCart(updatedItem.productId,updatedItem.size)
  set_loadingProduct('')
}
  set_loading(false)
}
catch(err){
  set_loading(false)
  set_error({name:err.response.data.msg,status:err.status})
 
}

  }
  useEffect(()=>{
    if(cart===null){
      window.location.reload()
    }
  },[cart])

useEffect(()=>{
  if(Array.isArray(cart)){
  const total_price=cart.reduce((acc,product)=>{
  return acc+(product.quantity*product.price)
  },0)
  set_sum(total_price)
}
else{
  set_sum(0)
}
},[cart])
return (
  <div>
    {LoadingState ? (
      <Loading height={30} />
    )  : Array.isArray(cart) && cart.length <= 0 ? (
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-serif font-bold text-2xl">Your Cart is Empty</h1>
        <Link
          className="bg-black mt-5 text-white font-bold px-4 py-2 rounded-md"
          to="/shop"
        >
          Continue Shopping
        </Link>
      </div>
    ) : error&&error.status==404 ? (<h1>{error.name}</h1>) : (
      // Rendering CART IF CART HAS ITEMS INSIDE IT
      <div>
        <p className="text-black text-left text-3xl font-serif font-bold uppercase">Cart</p>
        <div className="flex flex-row justify-between">
          <h1 className="mt-3 font-serif text-md">Products</h1>
          <h1 className="mt-3 font-serif text-md">Price</h1>
        </div>

        <hr className="w-full border-black mb-5 mt-3 border-t-2" />

        {cart && cart.length > 0 ? (
          cart.map((product) => {
            return (
              <div key={`${product.productId}-${product.size}`}>
                {product.quantity > 0 ? (
                  <div className="flex gap-2 flex-col">
                    <div className="flex flex-col mb-8 items-start">
                      <div className="flex flex-row justify-between items-center w-full">
                        {product.image ? (
                          <img
                            className="md:max-w-20 max-w-16 rounded-md"
                            src={
                              product.image.startsWith('uploads')
                                ? `${API_URL}${product.image.replace(/\\/g, '/')}`
                                : product.image
                            }
                            alt={product.title}
                          />
                        ) : (
                          <Loading height={20} />
                        )}
                        <h1 className="font-thin font-sans">{product.price} L.E</h1>
                      </div>
                      <h1 className="text-md md:text-lg mt-2 leading-tightest tracking-tight md:text-md font-serif font-bold mb-2">
                        {product.title}
                      </h1>
                      {product.category !== 'jewelery' && (
                        <h1 className="font-sans text-lg font-semibold">
                          Size: <span>{product.size}</span>
                        </h1>
                      )}

                      <h1 className="pb-3 font-serif flex items-center font-semibold">
                        Total Price:
                        <span className="font-thin relative font-sans flex items-center">
                          {loading && loadingProduct.product_id  === product.productId && loadingProduct.size===product.size  ? (
                            <div className="loader-cart" />
                          ) : (
                            `${product.price * product.quantity} L.E`
                          )}
                        </span>
                      </h1>

                      <div className="flex items-center relative border-2 border-black px-6 py-1 gap-3 md:gap-5">
                        <button
                          onClick={
                            token
                              ? () => {
                                  UpdateCart(product.productId, product.size);
                                }
                              : () =>
                                  addtocart(
                                    product.productId,
                                    product.price,
                                    product.title,
                                    product.image,
                                    product.size
                                  )
                          }
                          className="font-bold font-serif text-sm md:text-lg"
                        >
                          +
                        </button>
                        {loadingProduct.product_id === product.productId && loading && loadingProduct.size===product.size ? (
                          <Loading_Cart />
                        ) : (
                          <h1 className="font-bold text-sm md:text-lg">{product.quantity}</h1>
                        )}
                        <button
                          onClick={
                            token
                              ? () => {
                                  DeleteItem(product.productId, product.size);
                                }
                              : () => {
                                  RemovefromCart(product.productId, product.size);
                                }
                          }
                          className="font-bold font-serif text-sm md:text-lg"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : null}

        <hr className="w-full border-black mt-3 border-t-2" />
        {error.name&&error.status===500?(<h1 className="mt-3 font-semibold font-serif text-red-700">{error.name}</h1>):''}
        <h1 className="font-serif font-bold mt-3 text-sm md:text-xl">
          Estimated Total: <span className=" md:pl-2 font-semibold font-sans">{sum} L.E</span>
        </h1>

        <div className="flex items-center justify-center p-3 mb-5 md:mt-5">
          <button
            onClick={handleNavigate}
            className="bg-black px-5 md:px-9 lg:px-9 py-2 hover:bg-transparent border-2 font-serif border-black hover:text-black text-white uppercase font-bold"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    )}
  </div>
);

}


  
