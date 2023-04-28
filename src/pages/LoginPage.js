import LoginForm from "../components/LoginForm";
import Template from "../layout/Template";
import CommentForm from "../components/CommentForm";
import RegistrationForm from "../components/RegistrationForm";

const LoginPage = () => {
  return (
    <Template>
      <h1>Login Form:</h1>
      <LoginForm />
      <hr />
      <h1>Custom input:</h1>
      <CommentForm />
      <hr />
      <h1>Registration Form:</h1>
      <RegistrationForm />
    </Template>
  );
};

export default LoginPage;
