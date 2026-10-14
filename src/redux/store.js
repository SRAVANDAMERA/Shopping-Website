import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../redux/createSlicer'

const store = configureStore({
    reducer:{
        cart : cartSlice,
    },
});

export default store