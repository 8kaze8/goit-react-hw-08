import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useState } from "react";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(7, "Must be at least 7 characters")
    .required("Required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const resultAction = await dispatch(register(values)).unwrap();
      resetForm();
      setError(null);
    } catch (err) {
      setError(
        "This email is already registered. Please use a different email or try logging in."
      );
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}

          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email && <div>{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            style={{ color: "white" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
