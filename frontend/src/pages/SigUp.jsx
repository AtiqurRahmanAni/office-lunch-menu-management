import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { signUpFormSchema } from "../utils/validationSchema";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const signUp = async (values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/signup", values);
      const { data } = response;
      toast.success(data.message);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{
          email: "",
          displayName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signUpFormSchema}
        onSubmit={signUp}
      >
        <Form className="w-96 border border-gray-400 p-4 rounded-lg">
          <div>
            <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
          </div>
          <Input
            label="Email"
            className="mb-2"
            fieldName="email"
            placeholder="john@gmail.com"
          />
          <Input
            label="Display Name"
            className="mb-2"
            fieldName="displayName"
            placeholder="John Doe"
          />
          <Input
            label="Password"
            type="password"
            className="mb-2"
            fieldName="password"
          />
          <Input
            label="Confirm Password"
            type="password"
            className="mb-2"
            fieldName="confirmPassword"
          />
          <div className="mt-4 flex justify-center gap-x-2">
            <Button className="btn-primary" type="submit" loading={loading}>
              Sign Up
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
