import React, { useContext, useState } from 'react'

import style from "./Login.module.css";
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function Login() {
const navigate = useNavigate();
const [ApiError , setApiError]= useState("");
const [isLoading , setisLoading]= useState(false);
const {userLogin , setuserLogin} = useContext(UserContext)

// function hundleLogin(values){
//   setisLoading(true)
//   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values )
//   //لو الموضوع تمام 
//   .then((res) => {
//       setisLoading(false)

//     if(res.data.message == "success" ){
//      localStorage.setItem("userToken" ,res.data.message )
//      setuserLogin(res.data.message )
//      navigate("/")
//     }
//   }) 

  
//   // لو في ايرور 
//   .catch(function(res){
//           setisLoading(false)

//     //  console.log(res.response.data.message)
//     setApiError(res.response.data.message)
//   })
  
// }





function hundleLogin(values) {
  setisLoading(true);
  axios
    .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    .then((res) => {
      setisLoading(false);

      if (res.data.message === "success") {
        // ✅ خزن التوكن الحقيقي
        localStorage.setItem("userToken", res.data.token);
        setuserLogin(res.data.token);
        navigate("/");
      }
    })
    .catch(function (res) {
      setisLoading(false);
      setApiError(res.response.data.message);
    });
}



let validationSchema = yup.object().shape({
  email : yup.string().email("not valid email").required("name is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/) ,
  password:yup.string().required("name is required").min(6 ,"password min lenghtis 6"),

})


let formik = useFormik({
  initialValues :{
    email :"" ,
    password : ""
  },
validationSchema ,
  onSubmit:hundleLogin ,
  
})

  
  return (
      <div>
      {ApiError ?  <div className='w-1/2 p-3 mx-auto font-bold text-white bg-red-700 rounded-lg'>
      {ApiError}
      </div> : null}
      <h2 className='my-4 text-2xl font-bold text-center text-emerald-700'> Login now</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">


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




  <div className='flex items-center gap-4'>
    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
  </button>
  
  <Link to={"/regiester"}>
  <span className='text-blue-500 underline'>
      don’t you have an account?  Register Now

  </span>
  </Link>
  </div>
  </form>
    </div>
  )
}
