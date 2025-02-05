
import img from '../assets/sign_page.jpg'
import img2 from '../assets/signup.jpg'
import { useState, useEffect, memo } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { CartContext } from '../Context/ContextCart'

function Signup() {
  const API_URL=import.meta.env.VITE_API_URL
  const [password, set_password] = useState()
  const [email, set_email] = useState()
  const [message, set_message] = useState('')
  const [error, set_error] = useState('')
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [searchParam] = useSearchParams()
  const {FetchCart}=useContext(CartContext)
  const error_message = searchParam.get('message') ? decodeURIComponent(searchParam.get('message')) : '';
  useEffect(() => {
    set_error(error_message)
  }, [error_message])


  async function handleSubmit(e) {
    e.preventDefault()
    try {
      set_message('')
      set_error('')
      const endpoint = isSignUp ? `${API_URL}api/users` : `${API_URL}api/users/login`
      const response = await axios.post(endpoint, { email, password })
      const token = response.data.token
      if (token) {
        localStorage.setItem('Token', token)
        set_message(response.data.msg)
        navigate('/')
        await FetchCart(token)
      }
      else {
        set_error("Couldn't Create Your Account.")
      }
    }
    catch (err) {
      set_error(err.response.data.msg?err.response.data.msg:"Network Error")
    }
  }
  function toggleView() {
    setIsSignUp(!isSignUp)
  }
  

  return (
    <div className="flex flex-row min-h-screen md:h-[full]  relative">
      <img
        className={`w-full md:w-1/2 h-screen object-cover transition-transform duration-500 ${isSignUp ? 'md:translate-x-0' : 'md:translate-x-full '} `}
        src={`${isSignUp?img2:img}`}
        alt="image"
      />
      <div className={`absolute inset-0 md:w-1/2 bg-black opacity-70 md:transition-transform duration-500 ${isSignUp ? 'md:translate-x-0' : 'md:translate-x-full'} `}></div>


      <div className={`flex flex-col justify-center items-center absolute inset-0  z-10 md:w-1/2 md:justify-center md:items-center md:left-1/2 transition-transform duration-500 ease-in-out ${isSignUp ? 'md:translate-x-0' : 'md:-translate-x-full'} `}>
        <h1 className="font-bold text-4xl md:text-5xl tracking-wider font-serif md:text-black text-white mb-6">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <h1 className={`${error ? 'text-red-700' : 'text-green-800'} font-serif font-bold mb-3`}>
          {error ? error : message}
        </h1>

        <div className=" max-w-sm min-w-[300px]  flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col  '><label htmlFor="email" className="text-white md:text-black block mb-2">Email</label>

              <input
                name="email"
                type='email'
                onChange={(e) => { set_email(e.target.value) }}
                className="md:w-full px-5 border-2 shadow-md md:text-black  bg-transparent placeholder:text-slate-400 text-white text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="john@gmail.com"
              />
              <label htmlFor="password" className="text-white mt-5 md:text-black block mb-2">Password</label>
              <input onChange={(e) => { set_password(e.target.value) }}
                name="password"
                type='password'
                className="md:w-full px-5 bg-transparent border-2  shadow-md md:text-black placeholder:text-slate-400 text-white text-sm  border-slate-300 rounded-md py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="Type here.."
              />
            </div>
            <div className='flex justify-center flex-col items-center '>
              <button className='mt-6  bg-transparent border-2  md:bg-black md:rounded-md md:hover:opacity-75 hover:bg-black font-serif font-bold px-16 py-1 text-white'>{isSignUp ? "Sign up" : "Sign in"}</button>
              <h2 className='font-semibold text-sm mt-5 text-white md:text-black'>{isSignUp ? "Already have an account?" : "Don't have an account?"}<Link className='underline ml-2' onClick={toggleView}>{isSignUp ? "Sign In Now!" : "Sign Up Now!"}</Link></h2>
            </div>

          </form>

        </div>

      </div>
    </div>




  )
}
export default memo(Signup)
