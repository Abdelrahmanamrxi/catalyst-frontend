import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Loading from './layout/Loading'
import { Suspense } from 'react'
import Checkout from './pages/Checkout'
import AdminAuth from './pages/AdminAuth'
import Admin from './pages/dashboard/Admin'
import Users from './pages/dashboard/Users/Users'
import { lazy } from 'react'
import DashMenu from './pages/dashboard/DashMenu'
import Orders from './pages/dashboard/Orders'
import ProductAdmin from './pages/dashboard/ProductAdmin'
import CheckAdmin from './pages/dashboard/CheckAdmin'
import NotFound from './pages/NotFound'
import About from './pages/About'


const Product=lazy(()=>import('./pages/Product'))
const Shop=lazy(()=>import('./pages/Shop'))
const ScrollTop =lazy(()=>import('./utility/ScrollTop'))


function App() {
 
 
 
  return (
    
   <BrowserRouter>
   <Suspense fallback={<Loading/>}>
   <ScrollTop/>
  
    <Routes>
      
      <Route  element={<DashMenu/>}>
    
      <Route path="/admin" element={
        <CheckAdmin>
        <Admin/>
        </CheckAdmin>
        }/>
      <Route path='/admin/users' element={
        <CheckAdmin>
        <Users/>
        </CheckAdmin>
        }/>
      <Route path="/admin/orders" element={
        <CheckAdmin>
        <Orders/>
        </CheckAdmin>
        }/>
      <Route path="/admin/products" element={
        <CheckAdmin>
        <ProductAdmin/>
        </CheckAdmin>}/>
   
      </Route>
      <Route path='/auth' element={
        <AdminAuth/>
        }/>
    <Route path='/checkout' element={<Checkout/>}/>
      <Route element={
       
        <Layout/>
      

        
        }>
      <Route path='/' element={
   
        <Home/>
     
        
        }/>
       <Route path="/about" element={<About/>}/>
       
       <Route path="/shop" element={
        <Shop/>
      
        
        }/>
      
      <Route path={`/shop/:id`} element={
        <Product/>
      }

        />
        
        
       
   
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </Suspense>
    </BrowserRouter>
   

  )

}
export default App
