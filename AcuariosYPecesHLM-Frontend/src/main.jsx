import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './utils/axios.config.js'
import { CartProvider } from './utils/cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <CartProvider>
      <App />
      </CartProvider>
    </Provider>

)
