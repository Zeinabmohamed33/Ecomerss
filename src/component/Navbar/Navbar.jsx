import React, { useContext } from 'react'

import style from "./Navbar.module.css";

import logo from "../../assets/images/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
export default function Navbar() {
 let {numberitems} = useContext(CartContext)
const {userLogin ,setuserLogin}=useContext(UserContext)
const  navigate =useNavigate()

function signout(){
  localStorage.removeItem("userToken")
  setuserLogin(null)
  navigate("/login")
  
}
  
  return (
  
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 border-gray-200 bg-slate-300">
    <div className="flex flex-wrap items-center justify-center max-w-screen-xl gap-3 p-4 mx-auto lg:justify-between">
      <div className='flex items-center gap-5 '>

<Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">

<img src={logo} className="h-8" alt="Flowbite Logo" />
</Link>

{userLogin != null ? <>
<ul className='flex gap-3 '>
  <li> <Link className='text-slate-600' to="">Home</Link></li>
  <li> <Link  className='text-slate-600 relative' to="cart">cart 
  <div className='absolute top-[-10px] right-[-10px]  size-5 bg-emerald-600 text-white rounded-full flex justify-center items-center '>
    {numberitems}
  </div></Link></li>
  <li> <Link  className='text-slate-600' to="products">products</Link></li>
  <li> <Link  className='text-slate-600' to="gategories">categories</Link></li>
  <li> <Link  className='text-slate-600' to="brands">Brands</Link></li>

</ul>
</> :null}

      </div>




    







        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <ul className='flex gap-4'>
            <li><i className='fab fa-facebook'></i></li>
              <li><i className='fab fa-youtube'></i></li>
                <li><i className='fab fa-instagram'></i></li>
                  <li><i className='fab fa-linkedin'></i></li>
                    <li><i className='fab fa-twitter'></i></li>
          </ul>
           
          <div className='flex gap-4'>

          {userLogin != null ? <>  <span onClick={signout} className='cursor-pointer' >signout</span></>  : <>
          <Link  to="login">Login</Link>
          <Link  to="regiester">Register</Link></> }
        
           </div>


        </div>
    </div>


</nav>
</>
        
  
  )
}
