import { CartItemsProvider } from "./CartItemsContext";
import { FavouriteItemsProvider } from "./FavoritesItemsContext";
import { CardsProvider } from "./CardsContext";
import { UserProvider } from "./UserContext";
import { CategoriesProvider } from "./CategoriesContext";

function AllContextsWrapper({ children }) {
  return (
    <UserProvider>
      <CategoriesProvider>
        <CardsProvider>
          <FavouriteItemsProvider>
            <CartItemsProvider>{children}</CartItemsProvider>
          </FavouriteItemsProvider>
        </CardsProvider>
      </CategoriesProvider>
    </UserProvider>
  );
}

export default AllContextsWrapper;
