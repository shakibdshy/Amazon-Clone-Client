import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../components/Products/Card.model";
import { ProductDocument } from "../components/Products/Product.model";
import productService from "../components/Products/Product.server";

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface ProductState extends AsyncState {
    products: ProductDocument[];
    cart: Cart;
}

const initialState: ProductState = {
    products: [],
    cart: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

const modifyQtyByOne = (
    cart: Cart,
    selectedProduct: ProductDocument,
    modificationType: 'INCREMENT' | 'DECREMENT'
) => {
    const previousCart = [...cart];
    const productInCart = previousCart.find(product => product._id === selectedProduct._id);

    let newCart: CartItem[] = [];

    if (!productInCart) { 
        previousCart.push({ ...selectedProduct, quantity: 1 });
        newCart = previousCart;
    } else {
        const filteredCart = previousCart.filter(product => product._id !== productInCart._id);
        
        const newProduct = { ...productInCart, quantity: modificationType === 'INCREMENT' ? productInCart.quantity + 1 : productInCart.quantity - 1 };

        if (newProduct.quantity === 0) { 
            newCart = [...filteredCart, newProduct];
        }
    }
    return newCart;
}

export const getProducts = createAsyncThunk('product', async () => {
    try {
        return await productService.getProducts();
    } catch (error) {
        console.log('Error', error);
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        incrementProduct: (state, action: PayloadAction<ProductDocument>) => {
            const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'INCREMENT');
            state.cart = modifiedCart;
        },
        decrementProduct: (state, action: PayloadAction<ProductDocument>) => {
            const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'DECREMENT');
            state.cart = modifiedCart;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload?.data || [];
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.products = [];
        })
    }
});

export const { incrementProduct, decrementProduct } = productSlice.actions;

export default productSlice.reducer;