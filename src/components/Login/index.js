import { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'

import './index.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showErrMsg, setShowErrMsg] = useState(false)



  const onEmailChange = event => {
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/');
  }

  const onSubmitFailure = errorMsg => {
    setErrMsg(errorMsg)
    setShowErrMsg(true)
  }

  const onLogin = async event => {
    event.preventDefault()

    if (email && password) {
      const userDetails = { email, password }
      const apiUrl = 'https://tasks-backend-ujte.onrender.com/login'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        onSubmitSuccess(data.jwtToken)
      } else {
        onSubmitFailure(data.error)
      }
    } else {
      onSubmitFailure("All Fields are required")
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }


  return (
    <div className="login-bg-container">
      <form className="login-form" onSubmit={onLogin}>
        <h1 className='tasks'>My Tasks </h1>

        <label className="login-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          className="login-input"
          placeholder="Email"
          id="email"
          onChange={onEmailChange}
          value={email}
        />
        <label className="login-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          id="password"
          onChange={onPasswordChange}
          value={password}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {showErrMsg && <p className="error-msg">*{errMsg}</p>}
        <p className='already-have-an-account'>Not have an account? <button onClick={() => navigate("/signup")} className="login-link-button">Sign Up</button></p>
      </form>
    </div>
  )

}


export default Login
