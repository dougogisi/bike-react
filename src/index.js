import Client from 'shopify-buy'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import store from './store';
import './index.css';
import './styles/shopify.css'

const client = Client.buildClient({
  storefrontAccessToken: '206401a3e9daaaa6b5542795115d68a6',
  domain: 'react-biker.myshopify.com'
})

store.dispatch({type: 'CLIENT_CREATED', payload: client})

// buildClient() is synchronous, so we can call all these after!
client.product.fetchAll().then((res) => {
  store.dispatch({type: 'PRODUCTS_FOUND', payload: res});
})
client.checkout.create().then((res) => {
  store.dispatch({type: 'CHECKOUT_FOUND', payload: res});
})
client.shop.fetchInfo().then((res) => {
  store.dispatch({type: 'SHOP_FOUND', payload: res});
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
