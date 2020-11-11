import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Signup.css'
import axios from 'axios'

function Signup() {

   const [info, setInfo] = useState({
      username: '',
      password: '',
      department_id: '',
   })

   const history = useHistory()


   const handleDepartmentChange = (e) => {
      setInfo({ ...info, [e.target.name]: parseInt(e.target.value) })
   }

   const handleChange = (e) => {
      e.persist()

      if(e.target.name === 'department_id'){
         handleDepartmentChange(e)
      } else {
         setInfo({
            ...info,
            [e.target.name]: e.target.value
         })
      }
   }


   const handleSubmit = (e) => {
      e.preventDefault()

      axios
         .post('http://localhost:5000/api/auth/register', info)
         .then(res => {
            history.push('/signin')
         })
         .catch(error => {
            console.log(error)
         })

      setInfo({
         username: '',
         password: '',
         department_id: '',
      })
   }

   return (
      <div className="sign__up">
         <form className='sign__up__form' onSubmit={handleSubmit}>
            <label className='sign__up__label' htmlFor='username'>
               Username
               <input id='username' name='username' value={info.username} onChange={handleChange}/>
            </label>
            <label className='sign__up__label' htmlFor='password'>
               Password
               <input id='password' name='password' value={info.password} onChange={handleChange}/>
            </label>
            <label className='sign__up__label' htmlFor='department_id'>
               Department
               <select id='department_id' name='department_id' onChange={handleChange} value={info.department_id}>
                  <option value=''>-- Select Department --</option>
                  <option value='1'>Accounting</option>
                  <option value='2'>Marketing</option>
                  <option value='3'>Engineering</option>
               </select>
            </label>
            <button type='submit'>Sign Up</button>
         </form>
      </div>
   )
}

export default Signup
