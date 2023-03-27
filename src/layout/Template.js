import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

function Template(props) {
  return (
    <>
      <NavBar counter={props.selected_counter}/>
      {props.children}
      <Footer />
    </>
  );
}

export default Template;
