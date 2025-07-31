import React, { useContext, useState } from 'react'

import style from "./Regiester.module.css";
import { useFormik } from 'formik';

import * as yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export default function Regiester() {
const navigate = useNavigate();
const [ApiError , setApiError]= useState("");
const [isLoading , setisLoading]= useState(false);
const {userLogin , setuserLogin} = useContext(UserContext)

//  async function handleRegister(values){
//     // console.log(values)
//    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
//       console.log(data);
//       if(data.message == "success"){
//         // go to home
//         navigate("/")
        
//       }else{
//         //error
//         try(){
          
//         }catch{
          
//         }
//       }
//   }


function handleRegister (values){
  setisLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values )
  //لو الموضوع تمام 
  .then((res) => {
      setisLoading(false)

    if(res.data.message == "success" ){
     localStorage.setItem("userToken" ,res.data.message )
     setuserLogin(res.data.message)
     navigate("/")
    }
  }) 

  
  // لو في ايرور 
  .catch(function(res){
          setisLoading(false)

    //  console.log(res.response.data.message)
    setApiError(res.response.data.message)
  })
}


  
let validationSchema = yup.object().shape({
  name: yup.string().min(3,"min length is 3").max(10, "max lenght is 10").required("name is required"),
  email : yup.string().email("not valid email").required("name is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/) ,
  password:yup.string().required("name is required").min(6 ,"password min lenghtis 6"),
  rePassword :yup.string().required("name is required").oneOf([yup.ref("password")] , "not matched with password"),
  phone :yup.string().required("name is required").matches(/^01[1025][0-9]{8}$/,"phone not valid")
})


  let formik = useFormik({
    initialValues : {
      name:"" ,
      email:"",
      password:"",
      rePassword:"",
      phone :"",
    },
    validationSchema ,
    // validate :myvalidation ,
    onSubmit:handleRegister,
  })





  return (
    <div>
      {ApiError ?  <div className='w-1/2 p-3 mx-auto font-bold text-white bg-red-700 rounded-lg'>
      {ApiError}
      </div> : null}
      <h2 className='my-4 text-2xl font-bold text-center text-emerald-700'> Register now</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="name" value={formik.values.name}  onChange={formik.handleChange} onBlur={formik.handleBlur}  id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name </label>
 {formik.errors.name && formik.touched.name ?  <div className="p-4 mb-4 text-red-800 rounded-lg tetext-sm " role="alert">
  <span className="font-medium"> {formik.errors.name}</span> 
</div> : null}
  
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" value={formik.values.email}  onChange={formik.handleChange} onBlur={formik.handleBlur}  id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  {formik.errors.email && formik.touched.email ?  <div className="p-4 mb-4 text-red-800 rounded-lg tetext-sm " role="alert">
  <span className="font-medium"> {formik.errors.email}</span> 
</div> : null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur}  id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passwoed </label>
  {formik.errors.password && formik.touched.password ?  <div className="p-4 mb-4 text-red-800 rounded-lg tetext-sm " role="alert">
  <span className="font-medium"> {formik.errors.password}</span> 
</div> : null}
  </div>
 <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="rePassword" value={formik.values.rePassword}  onChange={formik.handleChange} onBlur={formik.handleBlur}  id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePasswoed </label>
   {formik.errors.rePassword && formik.touched.rePassword ?  <div className="p-4 mb-4 text-red-800 rounded-lg tetext-sm " role="alert">
  <span className="font-medium"> {formik.errors.rePassword}</span> 
</div> : null}
  </div>
 <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" value={formik.values.phone}  onChange={formik.handleChange} onBlur={formik.handleBlur}  id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> phone number</label>
   {formik.errors.phone && formik.touched.phone ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg " role="alert">
  <span className="font-medium"> {formik.errors.phone}</span> 
</div> : null}
  </div>


  <div className='flex items-center gap-4'>
    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
  </button>
  
  <Link to={"/login"}>
  <span className='text-blue-500 underline'>
      do you have an account? Login Now

  </span>
  </Link>
  </div>
  </form>
    </div>
  )
}
