import { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'

import './index.css'

const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showErrMsg, setShowErrMsg] = useState(false)


    const onNameChange = event => {
        setName(event.target.value)
    }

    const onEmailChange = event => {
        setEmail(event.target.value)
    }

    const onPasswordChange = event => {
        setPassword(event.target.value)
    }

    const onSubmitSuccess = msg => {
        alert(`${msg}. Proceed To Login`)
        navigate("/login")

    }

    const onSubmitFailure = errorMsg => {
        setErrMsg(errorMsg)
        setShowErrMsg(true)
    }


    const onLogin = async event => {
        event.preventDefault()

        const userDetails = { name, email, password }
        const apiUrl = 'https://tasks-backend-ujte.onrender.com/signup'
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
            onSubmitSuccess(data.message)
        } else {
            onSubmitFailure(data.error)
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
                <label className="login-label" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    className="login-input"
                    placeholder="Name"
                    id="name"
                    onChange={onNameChange}
                    value={name}
                />
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
                    Sign Up
                </button>
                {showErrMsg && <p className="error-msg">*{errMsg}</p>}
                <p className='already-have-an-account'>Not have an account? <button onClick={() => navigate("/login")} className="login-link-button">Login</button></p>
            </form>
        </div>
    )

}


export default SignUp
