import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Cart from "../components/Cart";
import LoginModal from "../components/LoginModal";

function NavBar(props) {
  const [autorized, setAuthorized] = useState(false);
  function onAuth() {
    if (autorized) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <NavLink className="navbar-brand" to="">
          <span>Rimuru Shop</span>
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/category">
                Category
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/debug">
                Debug
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              LoginPage
            </NavLink>
          </li>
          <Cart counter={props.counter} />
          <LoginModal autorized={autorized} onClick={onAuth} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
