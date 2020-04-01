import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChange = evt => {
        console.log(evt.target.name);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    };

    const onSubmit = async evt => {
        evt.preventDefault();

        // const newUser = {
        //     name,
        //     email,
        //     password
        // };

        // try {
        //     const config = {
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     };
        //     const body = JSON.stringify(newUser);

        //     const res = await axios.post("/api/users", body, config);

        //     console.log(res.data);
        // } catch (err) {
        //     console.error(err.response.data);
        // }
        console.log("SUCCESS");
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Вход</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Войти в профиль
            </p>
            <form className='form' onSubmit={evt => onSubmit(evt)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={evt => onChange(evt)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength='6'
                        value={password}
                        onChange={evt => onChange(evt)}
                        required
                    />
                </div>

                <input type='submit' className='btn btn-primary' value='Вход' />
            </form>
            <p className='my-1'>
                Регистрация аккаунта <Link to='/register'>Регистрация</Link>
            </p>
        </Fragment>
    );
};

export default Login;
