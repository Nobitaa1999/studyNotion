import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import rootReducer from './reducer';
import {configureStore} from '@reduxjs/toolkit'
import {BrowserRouter, RouterProvider} from "react-router-dom"
import {Toaster} from 'react-hot-toast'


const store=configureStore({
  reducer:rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

