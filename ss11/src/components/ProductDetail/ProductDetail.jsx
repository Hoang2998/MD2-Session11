import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
    const [productDetail,setProductDetail]=useState([])
    const {ProductId} = useParams()
    console.log(ProductId)
    useEffect(()=>{
        fetch("http://localhost:3000/products")
        .then(res => res.json())
        .then((data)=>{
            let resulta = data.find((item)=>{
                return item.id == ProductId
            })
            setProductDetail(resulta.product)
            // console.log(resulta.product)
        })
    },[ProductId])
    console.log(productDetail)
  return (
    <>
    {
        productDetail.map((item,index)=>{
           return <li key={index}>{item.name}:{item.price}$</li>
        })
    }
    </>
  )
}
