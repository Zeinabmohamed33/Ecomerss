
import './App.css'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Products from './component/Products/Products' 
import Cart from './component/Cart/Cart'
import Brands from './component/Brands/Brands'
import Gategories from './component/Gategories/Gategories'
import Regiester from './component/Regiester/Regiester'
import Login from './component/Login/Login'
import Notfound from './component/Notfound/Notfound'
import CounterContextprovider from './context/CounterContext'
import UserContextprovider from './context/UserContext'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextprovider from './context/CartContext'
import  { Toaster } from 'react-hot-toast';
import Cheakout from './component/Cheakout/Cheakout'
import Allorders from './component/Allorders/Allorders'
let query = new QueryClient()

RouterProvider
let x = createBrowserRouter ([
  {path:"" , element: <Layout/> , children:[
    {index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
    // {path:"home", element: <Home/>},
    {path:"products" , element: <ProtectedRoute><Products/> </ProtectedRoute>   },
     {path:"productDetails/:anything/:category" , element: <ProtectedRoute><ProductDetails/> </ProtectedRoute>   },
    {path:"cart" , element:  <ProtectedRoute><Cart/></ProtectedRoute>  },
    {path:"brands" , element: <ProtectedRoute> <Brands/></ProtectedRoute> },
    {path:"gategories" , element: <ProtectedRoute><Gategories/></ProtectedRoute> },
       {path:"cheakout" , element: <ProtectedRoute> <Cheakout/></ProtectedRoute> },
        {path:"allorders" , element: <ProtectedRoute> <Allorders/></ProtectedRoute> },
    {path:"regiester" , element: <Regiester/> },
    {path:"login" , element: <Login/> },
    {path:"*" , element:<Notfound/> },
  



    
  ] },
 

])



function App() {

  return (
    <>
    <UserContextprovider>

 <CounterContextprovider>
  <QueryClientProvider client={query}> 
    <CartContextprovider>
  <RouterProvider router={x}></RouterProvider>
  <Toaster/>
  </CartContextprovider>
  <ReactQueryDevtools/>
  </QueryClientProvider>
    </CounterContextprovider>
    </UserContextprovider>
   
  

    </>
  )
}


export default App
