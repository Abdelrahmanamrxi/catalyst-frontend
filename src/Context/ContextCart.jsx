
import { useState,useEffect,useCallback,useMemo,createContext } from 'react';
import { DecodeJWT } from '../utility/functions';
import axios from 'axios';
const API_URL=import.meta.env.VITE_API_URL
import PropTypes from 'prop-types'; 
export const CartContext=createContext({cart:[],set_cart:()=>{},cartMenu:false})
export const ContextCart = ({children}) => {

const [cartMenu,set_cartMenu]=useState(false);
const[err,set_error]=useState({
  name:'',
  status:''
})
const [LoadingState,set_state]=useState(false)
const [cart,set_cart]=useState(()=>{
const storedCart=localStorage.getItem('cart')
if(storedCart){
  try{
    return JSON.parse(storedCart)
  }
  catch(err){
    return[]
  }
}

  });
  const FetchCart=async(token)=>{
    set_error({name:'',status:''})
    const { userId } = DecodeJWT(token); 
    try {
      const response = await axios.get(`${API_URL}api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: { userId },
      });
      set_cart(response.data);
    } catch (err) {
     set_error({name:err.response.data.msg,status:err.status})
    }
  };
  
  const RemovefromCart=useCallback((_id,size)=>{
    const existingProd=cart.find((product)=>product.productId===_id&&product.size===size)
   if(existingProd){
    set_cart(prev=>{
      return prev.map((product)=>{
    if(product.productId===_id&&product.size===size){
      const newCartQuantity=product.quantity-1;
      if(newCartQuantity>0){
        return{...product,quantity:newCartQuantity}
      }
      else{
        return null;
      }
      
    }
    return product
      
      }).filter(product=>product!=null)
    })
   }

  },[cart])
  const addtocart= useCallback((_id,price,title,image,size,category)=>{
    set_cartMenu(true)
    set_state(false)
    const existingProd=cart.find((product)=>product.productId===_id&&product.size===size)
    if(!existingProd){
      set_cart(prev=>[...prev,{productId:_id,quantity:1,price:price,title:title,image,size,category}])
     
      
    }
      else{
      set_cart(prev=>{
        return prev.map(product=>{
        if(product.productId===_id&&product.size===size){
         
          set_state(false)
         return {...product,quantity:product.quantity+1}
         
          }
        else{
       
        set_state(false)
        return product;
        }
      })
    })
   
  }

  },[cart,set_cart,set_cartMenu])

useEffect(()=>{
  localStorage.setItem('cart',JSON.stringify(cart))
 
  
},[cart])
  const value=useMemo(()=>({cart,addtocart,err,RemovefromCart,cartMenu,set_cartMenu,set_cart,FetchCart,LoadingState,set_state}),[cart,cartMenu,addtocart,RemovefromCart,set_cartMenu,LoadingState,set_state])
  
  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  )
}
ContextCart.propTypes={
children:PropTypes.node.isRequired
}
export default ContextCart
