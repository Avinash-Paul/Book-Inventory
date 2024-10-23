import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import dataReducer from './dataslice';
import bookReducer from './reducer/bookReducer';  

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        books: bookReducer,  
    },
});

export default store;
