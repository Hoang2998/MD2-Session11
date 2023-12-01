import React from 'react'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import axios from "axios"
export default function App() {
  const [users,setUsers] = useState([])
  const [newUser,setNewUser] = useState({})
  const [render,setRender] = useState([])

useEffect(()=>{
  fetch("http://localhost:3000/users")
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    return setUsers(data)
  })
  .catch((err)=>{
    return console.log("err")
  })
},[])
// console.log(users);
const changeValue=(e)=>{
  let {name,value}=e.target
  setNewUser({...newUser,[name]:value})
}
// console.log(newUser);
const addNewUser=(e)=>{
  e.preventDefault()
  fetch("http://localhost:3000/users",
  {
    method:"POST",
    headers:{
        'Content-type':'application/json'
    },
    body:JSON.stringify(newUser)
  })

}
const deleteUser=(id)=>{
  fetch(`http://localhost:3000/users/${id}`,
  {
    method:'DELETE',
  })
}
const [searchValue, setSearchValue] = useState("")
const dataSearch = users.filter((user) => user.name.toLowerCase().includes(searchValue))
const [info,setInfo] = useState({})
const handleGetDetail = (id)=>{
  fetch(`http://localhost:3000/users/${id}`)
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    return setInfo(data)
  })
  .catch((err)=>{
    return console.log("err")
  })
}
console.log(info);



  return (
    <>
    <div className='body'>
       <div className="main">
    </div>
   
  {/* Dữ liệu nhân viên */}
  <div className="container-lg">
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <button className="btn btn-primary">Thêm mới nhân viên</button>
            </div>
            <div className="col-sm-6">
              <div className="search-box">
                <div className="input-group">
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Tìm kiếm theo tên"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                  />
                  <span className="input-group-addon">
                    <i className="material-icons"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th title="Số thứ tự">STT</th>
              <th style={{ width: "22%" }}>Mã nhân viên</th>
              <th style={{ width: "22%" }}>Tên nhân viên</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Lựa chọn</th>
            </tr>
          </thead>
          <tbody>

          {
             dataSearch.map((item ,index)=>{
              return <tr key={index}>
              <td>{index}</td>
              <td>{item.mnv}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.sex}</td>
              <td>{item.Address}</td>
              <td>
                <a href="#" className="edit" title="Edit" data-toggle="tooltip">
                  <i className="material-icons"></i>
                </a>
                <a
                  href="#"
                  className="delete"
                  title="Delete"
                  data-toggle="tooltip"
                  onClick={()=>{deleteUser(item.id)}}
                >
                  <i className="material-icons"></i>
                </a>
                <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={() =>handleGetDetail(item.id)}>
                  <i className="material-icons"></i>
                </a>
              </td>
            </tr>
            })
          }
            
          

          </tbody>
        </table>
      </div>
    </div>
  </div>
  {/* Form thêm mới nhân viên */}
  <div className="form-center">
    <form className="form">
      <h3 style={{ textAlign: "center" }}>THÊM MỚI NHÂN VIÊN</h3>
      <div className="form-group">
        <label htmlFor="id">Mã nhân viên</label>

        <input name='mnv' onChange={changeValue} id="id" type="text" className="form-control" />


      </div>
      <div className="form-group">
        <label htmlFor="name">Tên nhân viên</label>
        <input name='name' onChange={changeValue} id="name" type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth">Ngày sinh</label>
        <input name='date' onChange={changeValue} id="dateOfBirth" type="date" className="form-control" />
      </div>
      <div className="form-group">
        <label className="form-check-label" htmlFor="male">
          Giới tính
        </label>
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <label htmlFor="male" className="lable-gender">
            Nam
          </label>
          <input  onChange={changeValue} type="radio" className="radio" name="sex" id="male" value={"Nam"}/>
          <label htmlFor="female" className="lable-gender">
            Nữ
          </label>
          <input onChange={changeValue} type="radio" className="radio" name="sex" id="female"  value={"Nu"}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="address">Địa chỉ</label>
        <input name='Address' onChange={changeValue} id="address" type="text" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary" onClick={addNewUser}>
        Gửi
      </button>
    </form>
  </div>
</div>

    </>
  )
}
