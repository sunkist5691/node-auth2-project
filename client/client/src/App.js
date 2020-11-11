import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from './utils/axiosWithAuth'
import SignIn from './components/Signin'
import SignUp from './components/Signup'
import Users from './components/Users'
import { Route, Link } from 'react-router-dom'
import './App.css';

function App() {

  const [department, setDepartment] = useState(0)
  const [userList, setUserList] = useState([])

  console.log('userLIst: ', userList)

  useEffect(() => {
    axiosWithAuth()
      .post('/api/users', { department: department })
      .then(users => {
        console.log(users.data)
        setUserList(users.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [department])

  return (
    <div className="App">
      <h1>Welcome to Token Page</h1>
      <div className='navigation'>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/signin'>Sign In</Link>
        <Link to='/users'>Users List</Link>
      </div>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/signin'>
        <SignIn setDepartment={setDepartment} />
      </Route>
      <Route exact path='/users'>
        <Users userList={userList}/>
      </Route>
    </div>
  );
}

export default App;
