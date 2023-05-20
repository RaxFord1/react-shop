// ShoppingList.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, setFilter, resetFilter } from "./shoppingSlice";

function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shopping.filteredItems);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    dispatch(addItem(newItem));
    setNewItem("");
  };

  return (
    <div>
      <input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={handleAddItem}>Add Item</button>
      <input
        onChange={(e) => dispatch(setFilter(e.target.value))}
        placeholder="Filter items"
      />
      <button onClick={() => dispatch(resetFilter())}>Reset Filter</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => dispatch(removeItem(item))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
