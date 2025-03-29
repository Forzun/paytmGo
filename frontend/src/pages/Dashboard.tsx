import React, { useEffect, useState } from 'react'
import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/User'
import axios from "axios"

const Dashboard = () => {
  const [balance , setBalance] = useState([]);

  useEffect(() => { 
    axios.get("http://localhost:3000/api/v1/account/balance" , {
      headers:{ 
        Authorization: localStorage.getItem("token")
      }
    })
        .then(response => { 
            setBalance(response.data.balance)
        })
  }, [balance])

  return (
    <div>
       <AppBar /> 
       <div className='m-8'>
            <Balance value={Math.trunc(balance)} />
            <Users />
       </div>
    </div>
  )
}

export default Dashboard
