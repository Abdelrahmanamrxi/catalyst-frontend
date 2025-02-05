import Product_Card from "../utility/Product_Card"
import axios from 'axios'
import { useEffect,useState,useContext } from "react"
import Loading from "../layout/Loading"
import { useNavigate,useSearchParams } from "react-router-dom"
import img from '../assets/right.png'
import { CartContext } from "../Context/ContextCart"
import { CiSearch,CiFilter } from "react-icons/ci";




export default function Shop(){
    const API_URL=import.meta.env.VITE_API_URL
    const {cart,addtocart}=useContext(CartContext)
    const[filter,set_filter]=useState(false)
    const[search_text,set_text]=useState('')
    const [all_products,set_products]=useState([])
    const [searchParams]=useSearchParams()
    const [currentPage,set_current]=useState(Math.max(1,parseInt(searchParams.get('page')))||1)
    const [total_pages,set_total]=useState(0)
    const [loader,set_loading]=useState(true)
    const[selected,set_selected]=useState([])
    const [error,set_error]=useState('')
    const navigate=useNavigate()
   
    
    
    const filters=["men's clothing","jewelery","women's clothing"]
    const getProducts=async()=>{
    const queryParams=new URLSearchParams()
    if(search_text){
      queryParams.append('search',encodeURIComponent(search_text))
  
    }
    if(selected){
      queryParams.append('filters',selected.join(','))
   
    }
    queryParams.append('limit',6)
    queryParams.append('page',currentPage)
    try{
    
    set_loading(true)
    const response=await axios.get(`${API_URL}api/products?${queryParams.toString()}`)
    set_products(response.data.getProducts)
    set_total(response.data.totalPages)
    set_current(response.data.current_page)
    set_loading(false)
}
    catch(err){
        console.log(err)
        set_error(err.response.data.msg)
        set_loading(false)
       
    }
  
   
}

function handleCheckbox(e){
  const {value}=e.target
  if(selected.includes(value)){
  set_selected(prev=>prev.filter((item)=>item!==value))
 
  }
  else{
  set_selected(prev=>[...prev,value])

  }

  
}
 

useEffect(() => {
  const delayProducts = setTimeout(() => {
    getProducts();
    window.scrollTo(0, 0);
    navigate(`/shop?page=${currentPage}`, { replace: true }); 
  }, 300); 

  return () => clearTimeout(delayProducts); 
}, [currentPage, selected, search_text]);

useEffect(() => {
  if (currentPage <1) {
    set_current(1);
  }
}, [total_pages, currentPage]);
   function handlePageIncrement(){
    if(total_pages>currentPage){
    set_current(prev=>prev+1)
    }
   }
   function handlePageDecrement(){
    if(currentPage>1){

      set_current(prev=>prev-1)
    }
   }

 
    return(
<div>
  
    
<div className="relative m-4 mt-5 flex  justify-between items-center">
 
  <CiSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

  <input
    name="search"
    type="text"
    className="w-full lg:w-1/2 pl-10 pr-10 border-2 shadow-md text-black bg-white placeholder:text-slate-400 text-sm border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-700 hover:border-slate-500 focus:shadow"
    placeholder="Search for Products.."
    
    onChange={(e)=>{set_text(e.target.value)}}
    value={search_text}
  />

  <CiFilter 
  
    size={20} 
    onClick={()=>{set_filter(!filter)}}
    className="absolute lg:hidden cursor-pointer right-3 top-1/2 -translate-y-1/2 text-black" 
    style={{ filter: "drop-shadow(1px 1px 1px black)" }} 
  />

{(filter)&&(
          <div className="absolute  right-3 top-2/3  z-50 bg-white border border-gray-300 rounded shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Filter Options</h3>
        
            <form className="flex flex-col">
              {filters.map((filter)=>{
                return(
                 
                  <label key={filter}  className="mb-2 font-serif">{filter.toUpperCase()}
                  <input className="ml-2" onChange={handleCheckbox} type="checkbox" value={filter} checked={selected.includes(filter)}/>
                  </label>
                )
              })}
           </form>
           
        
        </div>
)}
<div className="m-5  hidden lg:flex md:justify-end gap-5 font-serif ">
 {filters.map((filter)=>{
  return(
    <label 
    key={filter} 
    className={`cursor-pointer flex items-center text-center border-gray-400 border-2 md:px-5 rounded-full py-2 font-semibold transition-all duration-300
      ${selected.includes(filter) ? "bg-black border-white text-white" : "bg-white text-gray-700"} 
      hover:bg-black hover:border-white hover:text-white peer-checked:bg-gray-700 peer-checked:text-white`}
  >
    <input 
      type="checkbox" 
      value={filter} 
      checked={selected.includes(filter)} 
      onChange={(e) => handleCheckbox(e)} 
      className="hidden peer"
    />
    {filter.toUpperCase()}
  </label>
  
  )
 })}

</div>

   </div>
  {selected.length>0||search_text?<h1 className="m-5 gap-2 font-semibold text-xl">Results: {selected.map((select)=>{
    return (<span className="ml-2" key={select}>{select}</span>)
   })} <span className="ml-2">{search_text}</span></h1>:''}
  
{loader?(<Loading height={100}/>):error?(<h1 className="h-screen text-2xl md:text-3xl font-semibold flex justify-center text-red-800 items-center">{error}</h1>):all_products.length>0?
  
  <div className="flex flex-col min-h-screen ">
    
    <div className=" mt-5 m-4 grid items-start gap-3  grid-cols-2  xl:grid-cols-3">
  
      {all_products.map((product)=>{
       return <Product_Card key={product._id} cart={cart} currentPage={currentPage} addtocart={addtocart}  {...product}/>
      })}
    
    </div>
    <div className="flex flex-grow justify-center items-center gap-5   mb-10 pt-10">
    {currentPage==1?"":<button onClick={handlePageDecrement}><img className="w-3 transform scale-x-[-1] " src={img}/></button>}
   <p className="font-semibold text-md">Page <span className="font-semibold">{currentPage}/{total_pages} </span></p>
   {total_pages<=currentPage?'':<button onClick={handlePageIncrement}><img className="w-3 " src={img}/></button>}
  

    </div>
    </div>:<h1 className="h-screen flex justify-center items-center text-md md:text-xl font-bold font-serif">No Items Found Matching your Critieria.</h1>}
    
    </div>
    )
}