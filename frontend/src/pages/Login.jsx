import Input from "../components/Input";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { logInFormSchema } from "../utils/validationSchema";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useAuthContext } from "../context/AuthContextProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAuthContext();

  const mutation = useMutation({
    mutationFn: (credentials) => {
      return axiosInstance.post("/auth/login", credentials);
    },
    onSuccess: (response) => {
      toast.success("Login successful");
      setUserInfo(response.data);
      if (response.data.role === "admin") {
        navigate("/add-menu");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong"
      );
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={logInFormSchema}
        onSubmit={(values) => mutation.mutate(values)}
      >
        <Form className="w-96 border border-gray-400 p-4 rounded-lg">
          <div>
            <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
          </div>
          <Input
            label="Email"
            className="mb-2"
            fieldName="email"
            placeholder="john@gmail.com"
          />
          <Input label="Password" type="password" fieldName="password" />
          <div className="mt-4 flex justify-center gap-x-2">
            <Button
              color="blue"
              type="submit"
              loading={mutation.isPending}
              disabled={mutation.isPaused}
            >
              Login
            </Button>
            <Button
              color="gray"
              onClick={() => navigate("/signup")}
              disabled={mutation.isPending}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
