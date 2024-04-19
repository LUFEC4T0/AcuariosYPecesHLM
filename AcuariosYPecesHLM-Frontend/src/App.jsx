import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import ClientInfo from './pages/ClientInfo'
import Cart from './pages/Cart'
import MainLayout from './layouts/MainLayout'
import SystemLayout from './layouts/SystemLayout'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardSystem from './pagesSystem/DashboardSystem'
import Shop from './pages/Shop'
import ViewAllClients from './pagesSystem/ViewAllClients'

import Products from './pagesSystem/Products'

import AllEmployees from './pagesSystem/AllEmployees'
import CartsDetails from './componentsSystem/CartsDetails'
import SalesDetails from './componentsSystem/SalesDetails'
import ProductDetails from './pages/ProductDetails'
import ViewAllProvider from './pagesSystem/ViewAllProvider'
import NewClientStore from './pagesSystem/NewClientStore'
import Purchases from './pagesSystem/Purchase'
import ViewAllEmployees from './pagesSystem/ViewAllEmployees'
import Sales from './pagesSystem/Sales'

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout/>}>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="*" element={<Login/>} />
                  <Route path='/clientinfo' element={<ClientInfo/>}/>
                  <Route path='/clientcart' element={<Cart/>}/>
                  <Route path='/shop' element={<Shop/>}/>
                  <Route path='/productdetails/:id' element={<ProductDetails/>}/>
              </Route>

              <Route path="/admin" element={<SystemLayout/>}> 
                  <Route path="/admin" element={<DashboardSystem/>}/>
                  <Route path="/admin/viewAllClients" element={<ViewAllClients/>}/>
                  <Route path="/admin/products" element={<Products/>}/>
                  <Route path="/admin/cartsDetails/:id/:tipo" element={<CartsDetails/>}/>
                  <Route path="/admin/viewAllEmployees" element={<ViewAllEmployees/>}/>
                  <Route path="/admin/salesDetails/:id" element={<SalesDetails/>}/>
                  <Route path="/admin/viewAllProviders" element={<ViewAllProvider/>}/>
                  <Route path="/admin/newClientStore" element={<NewClientStore/>}/>
                  <Route path='/admin/purchases' element={<Purchases/>}/>
                  <Route path='/admin/sales' element={<Sales/>}/>
                  

              </Route>

              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />

          </Routes>
      </BrowserRouter>
  )
}

export default App;
