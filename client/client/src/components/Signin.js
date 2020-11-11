import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Signin.css'
import axios from 'axios'

function Signin({ setDepartment }) {
   const [info, setInfo] = useState({
      username: '',
      password: '',
   })

   const history = useHistory()

   const handleChange = (e) => {
      setInfo({
         ...info,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      axios
         .post('http://localhost:5000/api/auth/login', info)
         .then(res => {
            console.log('department: ', res.data)
            localStorage.setItem('token', res.data.payload)
            setDepartment(res.data.department_id)
            history.push('/users')
         })
         .catch(error => {
            console.log(error)
         })
      setInfo({
         username: '',
         password: '',
      })
   }
   return (
      <div className="sign__in">
         <form className='sign__in__form' onSubmit={handleSubmit}>
            <label className='sign__in__label' htmlFor='username'>
               Username
               <input id='username' name='username' onChange={handleChange} value={info.username}/>
            </label>
            <label className='sign__in__label' htmlFor='password'>
               Password
               <input id='password' name='password' onChange={handleChange} value={info.password}/>
            </label>
            <button type='submit'>Login</button>
         </form>
      </div>
   )
}

export default Signin
