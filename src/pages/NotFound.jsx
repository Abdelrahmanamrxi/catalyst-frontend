import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
export default function NotFound() {
 
  return (
    <div>
        <Link className="underline  flex flex-row items-center gap-2 m-5" to={'/'}> <FaArrowLeft/> Back To Home</Link>
        <div className="flex justify-center  items-center">
        <h1 className="font-bold m-6 md:text-3xl  text-2xl"> 404 Page Not Found</h1>
        </div>
    </div>
  )
}
