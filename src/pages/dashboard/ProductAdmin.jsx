import { useCallback, useState } from "react"
import axios from "axios"
import Error from "../../layout/Error"
function ProductAdmin(){
  const API_URL=import.meta.env.VITE_API_URL
  const[product,set_product]=useState(false)
  const [productData,set_productData]=useState({
      title:'',
      description:'',
      category:"jewelery",
      price:'',
      quantity:'',
      image:null
    })
  const [error,set_error]=useState('')
  const [message,set_message]=useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault();


    if (!productData.image){
      set_error('Please Upload An Image')
    }
    if(!productData.category || !productData.title || !productData.price  || !productData.title || !productData.quantity){
      set_error("All fields must not be empty.")
    }
    const formData=new FormData()
    Object.keys(productData).forEach(key=>{
      formData.append(key,productData[key])
    })
    try{
      set_error('')
     const response=await axios.post(`${API_URL}api/dashboard/products`,formData,{withCredentials:true})
     set_product(false)
     set_message(response.data.message)
    }
    catch(err){
      console.log(err)
     set_error(err.response.data.message)
    }
    
  

  }

 
  const handleChange=useCallback((e)=>{
    const {name,value}=e.target
    if(name!="image"){
      set_productData({...productData,[name]:value})
    }
   
    else if(name==="image" && e.target.files[0].type==="image/jpeg"){
      set_productData({...productData,[name]:e.target.files[0]})
    }
  },[productData]);
    return(
        <div className={`${product?"bg-opacity-35 bg-black":''} w-full h-screen flex  flex-col relative`}>
            <h1 className="text-2xl font-bold m-6  font-mono ">Product Dashboard</h1>
            {message?<h1 className={`m-5 font-semibold text-green-800`}>{message}</h1>:''}
            <div className="flex mt-16  justify-center items-center flex-col">
             <button onClick={()=>{set_product(true)}}>  <div className="border-black border-dotted text-2xl font-bold hover:bg-black hover:border-none hover:text-white p-24  sm:p-32  border-2">
                   + 
                </div></button> 
                <h1 className="text-lg mt-3 font-semibold font-sans">Create Product</h1>

            </div>
           {product?

           <div className="absolute flex-col m-5 inset-0 justify-center text-left flex items-center ">
           
                <div className="bg-white w-full sm:w-1/2 p-10">
                
                    <div className="flex justify-between  items-center"> 
                <h3 className="font-semibold mb-3 text-xl text-left">Add your Product:</h3>
               
                <button onClick={()=>{set_product(false)}} className="text-xl font-bold">&times;</button>
                </div>
                {error?<h1 className={`mb-2 text-xl sm:text-xl`}><Error message={error}/></h1>:''}
            <form onChange={handleChange} onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="title">Title</label>
                <input
                name="title"
                type="text"
                className="w-full px-5 mt-1 mb-2 border-2 shadow-md md:text-black  bg-transparent placeholder:text-slate-400 text-black text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="CK Tshirts"
              />
              <label htmlFor="title">Image</label>
                <input
                name="image"
                type="file"
                className="w-full px-5 mt-1 mb-2 border-2 shadow-md md:text-black  bg-transparent placeholder:text-slate-400 text-black text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="Image"
              />
              <label htmlFor="description">Description</label>
                <textarea
                name="description"
                type="text"
                className="w-full px-5 mt-1 border-2 shadow-md md:text-black  bg-transparent placeholder:text-slate-400 text-black text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="Description of Item"
              />
              <div className="flex flex-row w-full gap-3 sm:gap-0 justify-between ">
              <div className="flex flex-col">   
              <label className="flex flex-col" htmlFor="quantity">Quantity</label>
                <input
                name="quantity"
                type="number"
                className="w-full px-5 mt-1 border-2 shadow-md md:text-black  bg-transparent placeholder:text-slate-400 text-black text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="Number of Items"
              />
              </div>
              <div className="flex flex-col">
                 <label className="flex flex-col " htmlFor="category">Category</label>
                <select
                defaultValue={productData.category}
                name="category"
                className="w-full px-5 mt-1 border-2 shadow-md md:text-black  bg-transparent placeholder:text-slate-400 text-black text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="CK Tshirts"
              >
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men Clothing</option>
                <option value="women's clothing">Women Clothing</option>
                <option value="bags">Bags</option>
                </select>
            
                </div>
                
                </div>
                <label htmlFor="price">Price</label>
                <input
                name="price"
                type="text"
                className="w-full px-5 mt-1 mb-2 border-2 shadow-md md:text-black  bg-transparent placeholder:text-slate-400 text-black text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="Price in EGP"
              />
                <button className="mt-5 bg-black w-full text-white py-2 hover:bg-opacity-90 focus:bg-opacity-70 rounded-md  font-bold">Done</button>
                </form>

                </div>
                
                
                </div>
            :''}
        </div>
      
      
    )
}
export default ProductAdmin