import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import userIcon from '../assets/user.svg'
import lockicon from '../assets/lock.svg'
import background from '../assets/BG.svg'
import {Link, useNavigate} from 'react-router-dom'
import { app } from '../firebase-config'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({title}) => {
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
        const letter = async (title)=>{
            if(title === 'LOGIN'){
              let response = await signInWithEmailAndPassword(authentication, values.email, values.password)
            .then((response) => {
              navigate('/')
              sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
                if(error.code === 'auth/invalid-login-credentials')
                toast.error('Invalid credentials')
       })
            }
            else if(title === 'REGISTER' )
            {
              let response = await createUserWithEmailAndPassword(authentication, values.email, values.password)
            .then((response) => {
              navigate('/')
              sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            }
        }
        letter(title)
            
            


    },
  });
  
  return (
    <div className="flex h-screen justify-center items-center bg-no-repeat bg-cover bg-blue-800" style={{backgroundImage: 'url(' + background + ')' }}>
      <form className="w-[82%] md:max-w-[350px]" onSubmit={(e)=>{
        e.preventDefault()
        formik.handleSubmit()
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
              className="bg-blue-800 outline-none text-lg md:text-2xl text-white w-[80%]"
              autoComplete="off"
              />
          </div>
        </div>
        {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 font-medium italic">{formik.errors.email}</div>
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
              className="bg-blue-800 outline-none text-xl md:text-2xl text-white"
              autoComplete="off"
            />
          </div>
        </div>
        {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 font-medium italic">{formik.errors.password}</div>
            ) : null}

            <button className="bg-white mt-6 mb-3 py-2 w-full font-bold text-blue-800">{title}</button>
            {title == 'LOGIN' && <div className="flex justify-between items-center">
              <Link to='/register' className="text-white font-medium text-lg cursor-pointer hover:text-orange-600">Create An Account</Link>
              <h3 className="text-white">Forgot Password?</h3>
              </div>}
      </form>
      <ToastContainer />
    </div>

  );
};

export default Form;
