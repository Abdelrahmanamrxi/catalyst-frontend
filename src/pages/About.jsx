import AOS from 'aos'
import 'aos/dist/aos.css';
import about from '../assets/about.jpg'
import { useEffect } from 'react'
export default function About() {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div className=' '>
    <div   style={{backgroundImage:`url(${about})`,boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}  className=" h-64 text-white    bg-cover bg-center w-full">
      
    </div>
    <div className=' p-8 lg:p-24 md:p-16 items-center h-full  flex-col flex'>
        <h1 className="text-4xl font-bold font-serif pb-2">About Us</h1>

        <p className='leading-loose text-sm    lg:text-lg mt-4 tracking-widest font-serif text-gray-800'>
        We believe that clothing is not just about style; it is a form of self-expression. Fashion is a powerful tool that allows individuals to communicate who they are without saying a word. Our mission is to empower individuals through fashion by offering high-quality, stylish apparel that fits seamlessly into every aspect of life. Whether you are dressing for a busy day at the office, a laid-back weekend, or a special evening out, we offer clothing that adapts to every moment.

        Our collections are curated with a focus on comfort and versatility, ensuring that every piece can be worn with confidence and ease. From casual wear to elegant pieces, we design with your lifestyle in mind, blending modern trends with timeless elegance. Each item is crafted to provide the perfect fit, allowing you to move freely and feel your best, no matter the occasion.

        We are committed to providing our customers with clothing that not only enhances their wardrobe but also reflects their unique style. Our carefully selected fabrics, attention to detail, and dedication to craftsmanship ensure that every piece is made to last. Whether you are looking for the perfect statement piece or a reliable everyday essential, our brand is here to elevate your style and support you on your journey of self-expression.
        </p>
        </div>
    </div>
    
  )
}
