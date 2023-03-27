function Login(props) {
  return (
    <button
      className="auth-modal-toggle btn btn-primary ms-2 me-1"
      data-auth-modal-tab="sign-in"
      onClick={props.onClick}
    >
      {props.autorized ? "Log out" : "Login"}
    </button>
  );
}

export default Login;
