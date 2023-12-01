import React, { useEffect, useState } from 'react'
import {Outlet,Link} from 'react-router-dom'
export default function Products() {

const [products,setProducts] = useState([])
useEffect(()=>{
    fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data=>{
        setProducts([...data])
    })
},[])
console.log(products);
  return (
    <>
    {
        products.map((item,index)=>{
            return <li key="index">
                <Link to={`/Products/${item.id}`}>
                {item.name}
                </Link>
            </li>
        })
    }
    <Outlet></Outlet>
    </>
  )
}
