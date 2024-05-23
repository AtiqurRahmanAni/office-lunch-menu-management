import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { signUpFormSchema } from "../utils/validationSchema";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const SignUp = () => {
  const mutation = useMutation({
    mutationFn: (newUser) => {
      return axiosInstance.post("/auth/signup", newUser);
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
    },
    onError: (error) => {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong"
      );
    },
  });

  const navigate = useNavigate();

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
        onSubmit={(values) => mutation.mutate(values)}
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
            <Button
              className="btn-primary"
              type="submit"
              loading={mutation.isPending}
            >
              Sign Up
            </Button>
            <Button
              className="btn-secondary"
              disabled={mutation.isPending}
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
