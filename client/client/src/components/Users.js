import React from 'react'
import './Users.css'

function Users({ userList }) {
   
   return (
      <div className="users">
         <h1>User LIST</h1>
         {
            userList.map((eachUser) => {
               return <p>{eachUser.username}</p>
            })
         }
      </div>
   )
}

export default Users
