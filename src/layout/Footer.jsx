
import img from '../assets/footer2k.jpg'
import { Link } from 'react-router-dom'
import { memo } from 'react'
function Footer() {
  return (
    <div   className={` bg-gradient-to-r from-black via-black  to-gray-800 
     text-white bg-cover  h-screen  lg:h-full bg-center md:pt-24 pt-24  relative `}>
    
      <div className="p-8">
       <div className="flex items-start md:items-center gap-5 md:gap-0 justify-between flex-col  md:flex-row ">
       <h1 className="md:text-4xl text-3xl  font-bold font-serif ">catalyst.</h1>
       <div className='flex flex-col gap-1 mt-2'><h1 className=' text-2xl mb-2 font-serif font-bold'>Links</h1>
       <Link className=' text-lg hover:opacity-70 font-serif' to ="/about">About Us</Link>
       <Link className='text-lg font-serif hover:opacity-70' to="/shop">Our Shop</Link>
    
       
       
       </div>
       <div className='pt-8 text-sm md:text-md gap-3   tracking-widest leading-loose flex flex-col'><h1 className='font-semibold font-serif md:text-md'>Phone for more inquiries: <span className='font-thin'>+201206904026</span></h1>
       <h1 className='text-md font-bold font-serif'>Email: <span className='font-thin'>abdelrahmanamrxi@gmail.com</span></h1>
       </div>
       </div>

      </div>
      
    </div>
  )
}
export default memo(Footer);
