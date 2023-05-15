import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

function Template(props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
}

export default Template;
