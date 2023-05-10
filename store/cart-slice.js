import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPriceCart: 0,
    itemsCopy: [],
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.totalQuantity++;
        state.totalPriceCart = state.totalPriceCart + parseInt(newItem.price);
        state.items.push({
          id: newItem.id,
          price: parseInt(newItem.price),
          image: newItem.images,
          quantity: 1,
          totalPrice: parseInt(newItem.price),
          title: newItem.title,
          inventory: parseInt(newItem.inventory),
        });
      } else {
        if (existingItem.quantity > existingItem.inventory - 1) {
          return;
        } else {
          state.totalQuantity++;
          state.totalPriceCart = state.totalPriceCart + parseInt(newItem.price);
          existingItem.quantity++;
          existingItem.totalPrice =
            existingItem.totalPrice + parseInt(newItem.price);
        }
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalPriceCart = state.totalPriceCart - existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    removeAllItem(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPriceCart = 0;
    },
    copyAllItem(state) {
      state.itemsCopy = state.items;
    },
    removeItemById(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity = state.totalQuantity - existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalPriceCart = state.totalPriceCart - existingItem.totalPrice;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
