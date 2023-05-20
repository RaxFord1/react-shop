import Template from "../layout/Template";
import RegistrationForm from "../components/RegistrationForm";
import ShoppingList from "../redux/shoppingList";

const ReduxPage = () => {
  return (
    <Template>
      <ShoppingList />
    </Template>
  );
};

export default ReduxPage;
