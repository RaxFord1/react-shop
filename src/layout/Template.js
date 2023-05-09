import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

function Template(props) {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
}

export default Template;
