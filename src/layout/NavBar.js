import { NavLink } from "react-router-dom";
import Cart from "../components/Cart";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <NavLink className="navbar-brand" to="">
          <span>Our Shop</span>
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
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" href="#!">
                    All Products
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" href="#!">
                    Popular Items
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" href="#!">
                    New Arrivals
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <Cart />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
