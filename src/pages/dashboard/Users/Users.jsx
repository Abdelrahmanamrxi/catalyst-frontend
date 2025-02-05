import {useEffect, useState} from 'react'
import img from '../../../assets/right.png'
import axios from 'axios'
import EditUser from './EditUser'
import Loading from '../../../layout/Loading'
import Error from '../../../layout/Error'
export default function Users() {
    const API_URL=import.meta.env.VITE_API_URL
    const [user,set_user]=useState([])
    const [current_page,set_current]=useState(1)
    const [selected_user,set_selection]=useState({})
    const[error,set_error]=useState('')
    const[loading,set_loading]=useState(false)
    const[edit,set_edit]=useState({
      name:'edit',
      action:false
    })
    const[totalPages,set_total]=useState(0)
    const[remove,set_remove]=useState({
      name:'remove',
      action:false
    })

    const getUsers=async()=>{
        try{
        set_loading(true)
        set_error('')
        const response=await axios.get(`${API_URL}api/dashboard/users?page=${current_page}&limit=8`,{withCredentials:true})
        set_user(response.data.users)
        set_current(response.data.currentPage)
        set_total(response.data.totalPages)
        set_loading(false)
        }
        catch(err){
           set_error('Error While Trying to Recieve Data')
        }
    }
    function handleEdit(user,action){
      if(action.name==="edit"){
        set_edit({...action,action:!action.type})
      }
      else if (action.name==="remove"){
        set_remove({...action,action:!action.type})
       
      }
      
    
      set_selection(user)
    }
    function IncrementPage(){
        if(totalPages>=current_page){
            set_current(prev=>prev+1)
            }
            else{
                return;
            }
           }
        
    
    function DecrementPage(){
        if(current_page===1){
            return;
        }
            set_current(prev=>prev-1)
       
    }
    useEffect(()=>{
        getUsers()
    },[current_page])
    
 return(
   <div className='lg:w-2/3 lg:flex-col '>
    <h1 className='m-5 font-mono text-2xl font-bold'>User Dashboard</h1>
    {error?<h1 className={`m-5`}><Error message={error}/></h1>:''}
{loading?<Loading height={50}/>:(
  <div className=" flex justify-center w-full p-4">
  
  <div className="overflow-x-auto md:overflow-visible w-full sm:w-auto">
    <table className="w-full relative md:w-auto border-collapse border shadow-md rounded-lg border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">User ID</th>
          <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Email</th>
          <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Updated At</th>
          <th className="border border-gray-300 p-1 text-xs sm:p-2 sm:text-sm">Action</th>
        </tr>
      </thead>
      <tbody>
        
        {user.map((user) => (
          <tr key={user.userId}>
            <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{user.userId}</td>
            <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{user.email}</td>
            <td className="border text-[10px] sm:text-xs p-1 sm:p-2 border-gray-300">{user.updatedAt}</td>
            <td className="border  border-gray-300">
              <div className="flex flex-col sm:flex-row justify-center items-center">
                <button onClick={()=>{handleEdit(user,edit)}} className=" w-16 px-2 py-1 m-2 font-semibold hover:bg-green-800 bg-green-500 text-white text-[10px] sm:text-xs rounded-md">
                  Edit
                </button>
                <button onClick={()=>{handleEdit(user,remove)}} className=" w-16 px-2 py-1 m-2 bg-red-800 font-semibold hover:bg-red-900 text-white text-[10px] sm:text-xs rounded-md">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
     
      {edit.action || remove.action?
      <tfoot>
        <tr>
          <td colSpan={3}>
      <EditUser
      {...selected_user}
      set_edit={set_edit}
      set_remove={set_remove}
      remove={remove}
      edit={edit}
      />
      </td>
      </tr>
      </tfoot>
       :''}
     
    </table>
   
  </div>
  
</div>)}
{loading?'':(<div className='flex justify-center gap-3  m-5 items-center'>
 {current_page===1? '':<button onClick={DecrementPage}><img className='transform scale-x-[-1] w-2' src={img}/></button>}  
<h1>Page<span> {current_page}/{totalPages}</span></h1>
{totalPages<=current_page?'':<button onClick={IncrementPage}><img className='w-2 ' src={img}/></button>}

</div>)}


   </div>
 )

}