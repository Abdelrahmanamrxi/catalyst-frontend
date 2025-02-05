
import { FaAngleRight } from "react-icons/fa6"
import { Link } from "react-router-dom";



export default function Admin() {


  return (
    <div className="lg:flex w-full lg:flex-row h-screen">           
      <div className="grid md:h-full h-full lg:h-full sm:h-64 grid-cols-2 gap-4 p-3 md:p-10 w-full justify-center md:w-full">
  
  <Link to="/admin/users" className="rounded-xl flex flex-col hover:bg-black bg-stone-900 text-white p-5 md:p-10 h-auto sm:h-64 md:h-auto">
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-xl mb-2 font-bold font-mono">Users Details</h1>
      <FaAngleRight />
    </div>
    
  </Link>

  <Link to="/admin/orders" className="rounded-xl flex flex-col hover:bg-black bg-stone-800 text-white p-5 md:p-10 h-auto sm:h-64 md:h-auto">
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-xl mb-2 font-bold font-mono">Orders Details</h1>
      <FaAngleRight />
    </div>

  </Link>

  <Link to="/admin/products" className="rounded-xl flex flex-col hover:bg-black bg-stone-950 text-white p-5 md:p-10 h-auto sm:h-64 md:h-auto">
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-xl mb-2 font-bold font-mono">Product Details</h1>
      <FaAngleRight />
    </div>
  </Link>
</div>

    </div>

  );
};
