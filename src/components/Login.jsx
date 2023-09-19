import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import userIcon from '../assets/user.svg'
import lockicon from '../assets/lock.svg'
import background from '../assets/BG.svg'
import {useNavigate} from 'react-router-dom'
import { app } from '../firebase-config'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
    let navigate = useNavigate();
    const authentication = getAuth();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Please Enter your password"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
        signInWithEmailAndPassword(authentication, values.email, values.password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="flex h-screen justify-center items-center bg-no-repeat bg-cover bg-blue-800" style={{backgroundImage: 'url(' + background + ')' }}>
      <form className="w-[82%] md:max-w-[350px]" onSubmit={(e)=>{
        e.preventDefault()
        formik.handleSubmit()
        alert('yay')
      }}>
        <div className="flex items-center border-2 border-white rounded-lg gap-2 mb-1 px-3 py-3">
          <img src={userIcon} alt="user icon" />
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-transparent outline-none text-xl md:text-2xl"
              />
          </div>
        </div>
        {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

        <div className="flex items-center gap-2 border-2 border-white rounded-lg px-3 py-3 mt-4 mb-1">
          <img src={lockicon} alt="lock icon" />
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="bg-transparent outline-none text-xl md:text-2xl"
            />
          </div>
        </div>
        {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <button className="bg-white mt-6 py-2 w-full">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
