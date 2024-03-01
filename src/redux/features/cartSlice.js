import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
	totalAmt: 0,
	totalQty: 0
}

const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { id } = action.payload;
			const itemIndex = state.cart.findIndex((item) => item.id === id);

			const updatedCart = itemIndex !== -1
				? state.cart.map((item, index) =>
					index === itemIndex ? { ...item, qnty: item.qnty + 1 } : item
				)
				: [...state.cart, { ...action.payload, qnty: 1 }];

			return {
				...state,
				cart: updatedCart,
				totalAmt: updatedCart.reduce((total, item) => total + (item.price * item.qnty), 0),
				totalQty: updatedCart.reduce((total, item) => total + item.qnty, 0),
			};
		},
		incrementQuantity: (state, action) => {
			const updatedCart = state.cart.map((item) => {
				if (item.id === action.payload) {
					return { ...item, qnty: item.qnty + 1 }
				}
				return item;
			});
			return {
				...state,
				cart: updatedCart,
				totalAmt: updatedCart.reduce((total, item) => total + (item.price * item.qnty), 0),
				totalQty: updatedCart.reduce((total, item) => total + item.qnty, 0),
			}
		},
		decrementQuantity: (state, action) => {
			const updatedCart = state.cart.map((item) => {
				if (item.id === action.payload) {
					return {
						...item,
						qnty: Math.max(1, item.qnty - 1)  // Ensure quantity doesn't go below 1
					}
				}
				return item;
			});
			return {
				...state,
				cart: updatedCart,
				totalAmt: updatedCart.reduce((total, item) => total + (item.price * item.qnty), 0),
				totalQty: updatedCart.reduce((total, item) => total + item.qnty, 0),
			}
		},
		removeItem: (state, action) => {
			const updatedCart = state.cart.filter((item) => item.id !== action.payload);
			return { ...state, cart: updatedCart };
		},
		emptyCart: (state, action) => {
			return { ...state, cart: [] };
		}
	}
});

// export const cartItems = (state) => state.allCart;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;