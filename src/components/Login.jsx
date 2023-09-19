import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import userIcon from '../assets/user.svg'
import lockicon from '../assets/lock.svg'
import background from '../assets/BG.svg'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="flex h-screen justify-center items-center bg-no-repeat bg-cover bg-blue-800" style={{backgroundImage: 'url(' + background + ')' }}>
      <form>
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

      </form>
    </div>
  );
};

export default Login;
