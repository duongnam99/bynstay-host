import React, {Component, useState, useEffect } from 'react';
import Axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userActions } from '../actions/user.actions';

const LoginPage = () => {
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // const submit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //         const loginData = { email, password };
        
    //         const loginRes = await Axios.post("http://localhost:8080/users/login", stringify({
    //             email,
    //             password,
    //         }));
    //         setUserData({
    //             token: loginRes.data.token,
    //             user: loginRes.data.user,
    //         });
    //         localStorage.setItem("auth-token", loginRes.data.token);
    //         history.push("/");
    //     } catch (err) {
    //         // err.response.data.msg && setError(err.response.data.msg);
    //     }
    // };

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(email, password, from));
        }
    }


    return (
        <div className="login_section">
            <div className="main">
                <section class="sign-in">
                <div class="container">
                    <div class="signin-content">
                        <div class="signin-image">
                            <figure><img src="./assets/images/signin-image.jpg" alt="sing up image" /></figure>
                            <a href="#" class="signup-image-link">Create an account</a>
                        </div>

                        <div class="signin-form">
                            <h2 class="form-title">Đăng nhập</h2>
                            <form name="form" method="post" onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="email" name="email" id="email" placeholder="Nhập Email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                                </div>
                                <div class="form-group">
                                    <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password" placeholder="Mật khẩu"  value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                                </div>
                                {/* <div class="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                    <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                                </div> */}
                                <div class="form-group form-button">
                                    <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            </div>
        </div>
    );
  };
   
export default LoginPage;