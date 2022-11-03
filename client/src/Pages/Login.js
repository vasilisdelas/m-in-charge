import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../css/Login/login.css';

import status_codes from '../util/status_codes.js';

function Login() {
    const isLogged = window.localStorage.getItem('isLoggedIn');

    const [errorText, setErrorText] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    let navigate = useNavigate();

    React.useEffect(() => {
        if (isLogged) navigate('/')
    }, [])

    const loginUser = (e) => {
        e.preventDefault();
        if (password === undefined || username === undefined) {
            setErrorText("Undefined credentials, please check the login credentials/method. If the problem insists please contact the site administrator");
            return;
        }
        if (username.length < 3 || username.length > 16){
            setErrorText("The length of the username should be greater or equal to 3 characters and less than or equal to 16 characters.");
            return;
        } 
        if (password.length < 6 || password.length > 24) {
            setErrorText("The length of the password should be greater or equal to 6 characters and less than or equal to 24 characters");
            return;
        }

        fetch(`http://localhost:4000/api/users/login`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then((res) => {
            if (res.status === 200) {
                window.localStorage.setItem('username', username);
                window.localStorage.setItem('isLoggedIn', true);
                navigate('/');
            } else {
                setErrorText(status_codes[res.status.toString()]);
            }
            setPassword("");
            setUsername("");
        })
    }

    return (
        <>
        { !isLogged &&
        <div className="login-container">
            <div className="login-form-container">
                <div className="form-text">
                    <span className="login-text">Login</span>
                </div>
                <div className="form-credentials">
                    <form className="form-credentials" onSubmit={(e) => { loginUser(e) } }>
                        <div className="form-username">
                            <label htmlFor="username">Username</label> 
                            <input type="text" className="username" 
                            onChange={(e) => { setUsername(e.target.value) }}
                            name="username" maxLength={16} value={username} required autoComplete='off'>
                            </input>
                        </div>
                        <div className="form-password">
                            <label htmlFor="password">Password</label>
                            <input type={showPassword ? "text" : "password"} 
                            onChange={(e) => { setPassword(e.target.value) }} className="password" 
                            name="password" maxLength={24} value={password} required autoComplete='off'>
                            </input>
                            <input type="checkbox" onClick={() => { setShowPassword(!showPassword) }}></input>
                        </div>
                        {errorText.length > 0 && <span className="error-txt"> { errorText} </span>}
                        <div className="login-btn-section">
                            <button className="login-btn">Login</button>
                        </div>
                    </form>
                </div>
                <span className="no-user">Don't have an account? Create one <Link to="/register" className="no-user-redirect">by clicking here</Link></span>
            </div>
        </div>
        }
        </>
    )
}

export default Login;