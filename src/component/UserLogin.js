import React, { useContext, useState } from 'react'
import './UserLogin.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Authcontext from '../context/Logincontext'

function UserLogin(props) {
    const apiUrl = 'http://localhost:8000'

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const {accessToken} = useContext(Authcontext)

    const handleLogin = () => {
        const userData = {
            'email' : email,
            'password' : password,
        }

        axios.post(`${apiUrl}/userlogin/`, userData)
        .then((res) => {

          localStorage.setItem('authToken', JSON.stringify(res.data.access))
          localStorage.setItem('user', JSON.stringify(res.data.user))

          navigate('userhome')

        })
        .catch((err) => {
          alert(err.response.data.message)
        })

    }

    if (accessToken) {
      return <Navigate to="userhome"/>
    }


  return (
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>{props.props.name}</span></div>
        <form action="#">
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" required />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div><br></br></div>
          <Link to={'userhome'}></Link>
          <div className="row button">
            <input onClick={handleLogin} style={{textAlign : 'center'}} value="Login" />
          </div>
          
          <div className="signup-link">Not a member? <Link to={'signup'}>Signup now</Link></div>
          <div className="signup-link"><Link to={'adminlogin/'}>Admin?</Link></div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin