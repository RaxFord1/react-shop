import Template from "../layout/Template";
import RegistrationForm from "../components/RegistrationForm";

const RegisterPage = () => {
  return (
    <Template>
      <div className="text-center" style={{ margin: "0 auto", maxWidth: 400 }}>
        <h1>Registration Form:</h1>
        <RegistrationForm />
      </div>
    </Template>
  );
};

export default RegisterPage;
