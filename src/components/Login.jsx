import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
    <div className="flex h-screen justify-center items-center">
      <form className="flex h-screen justify-center items-center">
        <div>
          <label htmlFor="email">Email Address</label>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
        </div>

      </form>
    </div>
  );
};

export default Login;
