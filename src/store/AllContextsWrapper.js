import { CartItemsProvider } from "./CartItemsContext";
import { FavouriteItemsProvider } from "./FavoritesItemsContext";
import { CardsProvider } from "./CardsContext";
import { UserProvider } from "./UserContext";
import { CategoriesProvider } from "./CategoriesContext";

function AllContextsWrapper({ children }) {
  return (
    <CategoriesProvider>
      <CardsProvider>
        <UserProvider>
          <FavouriteItemsProvider>
            <CartItemsProvider>{children}</CartItemsProvider>
          </FavouriteItemsProvider>
        </UserProvider>
      </CardsProvider>
    </CategoriesProvider>
  );
}

export default AllContextsWrapper;
