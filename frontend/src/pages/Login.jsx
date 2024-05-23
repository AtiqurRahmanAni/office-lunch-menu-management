import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { logInFormSchema } from "../utils/validationSchema";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={logInFormSchema}
        onSubmit={onSubmit}
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
            <Button className="btn-primary" type="submit">
              Login
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => navigate("/signup")}
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
