import React, {Component, useState, useEffect } from 'react';
import Axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userActions } from '../actions/user.actions';

const RegistrationPage = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        re_pass: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (user.password != user.re_pass){
            return;
        }
        setSubmitted(true);
        if (user.name && user.email && user.password && user.re_pass) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="login_section">
            <div className="main">
            <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Tạo tài khoản</h2>
                        <form method="POST" class="register-form" id="register-form" onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Họ tên" 
                                value={user.name} onChange={handleChange} className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} />
                            </div>
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Email"
                                value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" id="pass" placeholder="Mật khẩu"
                                value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                            </div>
                            <div class="form-group">
                                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Nhập lại mật khẩu"
                                value={user.re_pass} onChange={handleChange} className={'form-control' + (submitted && !user.re_pass ? ' is-invalid' : '')} />
                            </div>
                            {/* <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div> */}
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Đăng ký"/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src="./assets/images/signup-image.jpg" alt="sing up image" /></figure>
                        <a href="#" class="signup-image-link">Đã có tài khoản</a>
                    </div>
                </div>
            </div>
        </section>
            </div>
        </div>
    );
  };
   
export default RegistrationPage;