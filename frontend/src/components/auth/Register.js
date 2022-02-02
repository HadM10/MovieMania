import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackendDataServices from '../../services/BackendDataServices'
import "../../css/auth.css";
import UserContext from "../../context/UserContext";
import ErrorNotice from './ErrorNotice';
import FunctionTools from "../../services/FunctionTools";

export default function Register() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [error, setError] = useState()

    // Grabbing setUserData state with useContext and then passing our UserContext
    const { setUserData } = useContext(UserContext)
    const navigate = useNavigate()

    // Submit function is creating a new user and then logging in that user immediately then we are storing their data into state and setting local storage with their token
    const submit = async (e) => {
        e.preventDefault();
        try {
            if (username.length < 6)
                setError("Username must be six characters or longer")
            else if (!FunctionTools.email_validate(email))
                setError("Check your email format")
            if (!FunctionTools.password_validate(password))
                setError("Passwords should contain at least 1 lowercase, at least 1 uppercase alphabetical, at least 1 numeric, at least one special character, must be six characters or longer")
            else if (password !== passwordCheck)
                setError("Passwords do not match. Please try again")
            else {
                const newUser = { username, email, password } // creating our new user
                await BackendDataServices.registerUser(newUser) // posting new user to backend
                setError('Register success')
                // making request to our backend to login the user in
                const loginRes = await BackendDataServices.loginUser({
                    email,
                    password,
                });
                // setting login response data's token and user data this
                setUserData({
                    token: loginRes.data.token,
                    user: loginRes.data.user,
                });
                localStorage.setItem("auth-token", loginRes.data.token)
                let intervalNav = setInterval(() => {
                    navigate("/")
                    clearInterval(intervalNav)
                }, 3000)
            }
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };

    return (
        <div className="page">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-userName">Username</label>
                <input
                    id="register-userName"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />


                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Verify Password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <input type="submit" value="Register" />
                <br></br>
                <Link to={"/Login"}>Login</Link>
            </form>
        </div>
    );
}
