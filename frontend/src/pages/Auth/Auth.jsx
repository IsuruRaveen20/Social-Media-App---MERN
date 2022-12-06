import React, { useState } from 'react'
import Logo from '../../img/logo.png'
import './Auth.css'
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

function Auth() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    const [isSignUp, setIsSignUp] = useState(true);

    const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const [confirmPassword, setConfirmPassword] = useState(true);

    const handleSubmit = (e) => {
        // page will not redirect default
        e.preventDefault();

        if (isSignUp) {
            data.password !== data.confirmPassword ? dispatch(signUp(data)) : setConfirmPassword(false);
        } else {
            dispatch(logIn(data))
        }
    }

    const resetForm = () => {
        setConfirmPassword(true);
        setData({
            firstname: '', lastname: '', email: '', password: '', confirmpassword: '',
        })
    }

    return (
        <div className="Auth">
            <div className="a-left">

                <form className="InfoForm AuthForm" onSubmit={handleSubmit}>

                    <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                placeholder='First Name'
                                className="InfoInput"
                                name="firstname"
                                onChange={handleChange}
                                value={data.firstname}
                            />
                        </div>
                    )
                    }
                    <div>
                        <input
                            type="text"
                            placeholder='Last Name'
                            className="InfoInput"
                            name="lastname"
                            onChange={handleChange}
                            value={data.lastname}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder='Email'
                            className="InfoInput"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder='Password'
                            className="InfoInput"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                        />
                        {isSignUp && <input
                            type="password"
                            placeholder='Confirm Password'
                            className="InfoInput"
                            name="confirmpassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                        />
                        }

                    </div>
                    <span style={{ display: confirmPassword ? 'none' : 'block', color: 'red', fontSize: '12px', alignSelf: 'flex-end', marginRight: '5px' }}>
                        * Confirm Password is not same
                    </span>
                    <div>
                        <span style={{ fontSize: '12px', cursor: 'pointer' }}
                            onClick={() => {
                                setIsSignUp((prev) => !prev);
                                resetForm();
                            }}>
                            {isSignUp ? "Already have an account? Login" : "Don't have an account? Signup!"}
                        </span>
                    </div>
                    <button className="button InfoButton" type="submit" disabled={loading}>
                        {loading ? 'Loading..' : isSignUp ? 'Signup' : 'Login'}</button>
                </form>
            </div>

            {/* rightside */}
            <div className="a-right">

                <div className="WebName"> 
                    <h1>Social Media <img src={Logo} alt="" /></h1>
                    <h6>explore the ideas</h6>
                </div>
            </div>

        </div>
    )
}

export default Auth