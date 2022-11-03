import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../css/Register/register.css';

import status_codes from '../util/status_codes.js';

function Register() {
    const isLogged = window.localStorage.getItem('isLoggedIn');
    // Input States
    const [errorText, setErrorText] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");

    // Input Show State
    const [showPassword, setShowPassword] = React.useState(false);  

    let navigate = useNavigate();

    React.useEffect(() => {
        if (isLogged) navigate('/')
    }, [])

    const signUser = (e) => {
        e.preventDefault();
        if (password === undefined || username === undefined || email === undefined) {
            setErrorText("Undefined credentials, please check the login credentials/method. If the problem insists please contact the site administrator");
            return;
        }
        if (password.length < 6 || password.length > 24) {
            setErrorText("The length of the password should be greater or equal to 6 characters and less than or equal to 24 characters");
            return;
        }
        if (email.length < 1) {
            setErrorText("The email field cannot be left empty.");
            return;
        }     
        if (username.length < 3 || username.length > 16){
            setErrorText("The length of the username should be greater or equal to 3 characters and less than or equal to 16 characters.");
            return;
        } 
        
        fetch(`http://localhost:4000/api/users/register`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: username,
                email_address: email,
                password: password,
                role: "default",
            })
        }).then((res) => {
            if (res.status === 200) {
                window.localStorage.setItem('isLoggedIn', true);
                window.localStorage.setItem('username', username);
                navigate('/');
            } else {
                setErrorText(status_codes[res.status.toString()]);
            }
            setPassword("");
            setUsername("");
            setEmail("");
        })
    }

    return (
        <>
        {!isLogged &&
            <div className="register-container">
                <div className="register-form-container">
                    <div className="form-text">
                        <span className="register-text">Create an Account</span>
                    </div>
                    <div className="form-credentials">
                        <form className="form-credentials" onSubmit={(e) => { signUser(e) } }>
                            <div className="form-username">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="username" 
                                onChange={(e) => { setUsername(e.target.value) }}
                                name="username" maxLength={16} value={username} required autoComplete='off'>
                                </input>
                            </div>
                            <div className="form-email">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="email" 
                                onChange={(e) => { setEmail(e.target.value) }}
                                name="email" maxLength={32} value={email} required autoComplete='off'>
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
                            {errorText.length > 0 && <span className="error-txt"> { errorText } </span>}
                            <div className="register-btn-section">
                                <button className="register-btn">Register</button>
                            </div>
                            
                        </form>
                    </div>
                    <span className="no-user">Already have an account; <Link to="/login" className="no-user-redirect">Login</Link></span>
                </div>
            </div>
        }
        </>
    )
}

export default Register;