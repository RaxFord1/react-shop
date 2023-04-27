import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Cart from "../components/Cart";
import LoginForm from "../components/LoginModal";

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
              <NavLink className="nav-link" href="#!">
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/category">
                    Category
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#!">
                    Popular Items
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#!">
                    New Arrivals
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/debug">
                Debug
              </NavLink>
            </li>
          </ul>
          <Cart counter={props.counter} />
          <LoginForm  autorized={autorized} onClick={onAuth} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
