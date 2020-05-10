import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middleware/api';

export default function () {
    const store = configureStore({ reducer, middleware: [...getDefaultMiddleware(), api] });
    return store;
}