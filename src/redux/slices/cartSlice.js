import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  cartItems: [], // Array to store items in the cart
  totalAmount: 0, // Total cost of all items in the cart
  totalQuantity: 0, // Total quantity of all items in the cart
};

// Create a slice for the cart using Redux Toolkit
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state for the cart
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload; // Get the item data from the action
      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++; // Increment the totalQuantity for every item added.

      if (!existingItem) {
        // If the item does not exist in the cart, add it
        state.cartItems.push({
          id: newItem.id, 
          productName: newItem.productName,
          image: newItem.imgUrl,
          price: newItem.price,
          quantity: 1, // Set the quantity to 1 for new item
          totalPrice: newItem.price, // Set the total price for this item
        });
      } else {
        // If the item already exists in the cart
        existingItem.quantity++; // Increment the quantity of the existing item
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price); // Update the total price for the existing item
      }

      // Calculate the total amount by summing up the totalPrice of all items in the cart
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.totalPrice),
        0 // Initial value for the reduce function
      );
    },
  },

});

// Export the addItem action and the cart reducer
export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;


