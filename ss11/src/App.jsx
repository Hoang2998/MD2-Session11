import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import ProductDetail from './components/ProductDetail/ProductDetail'

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/register' element={<Register></Register>}/>
      <Route path='/Products' element={<Products></Products>}>
          <Route path=':ProductId' element={<ProductDetail></ProductDetail>}/>
      </Route>
    </Routes>
    </>
  )
}
