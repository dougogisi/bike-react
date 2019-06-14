import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cart from './components/Cart';
import store from './store';
import Nav from './components/Nav';
import GenericProductsPage from './components/GenericProductsPage';
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this)
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this)
    this.handleCartClose = this.handleCartClose.bind(this)
    this.handleCartOpen = this.handleCartOpen.bind(this)
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.props.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      store.dispatch({type: 'UPDATE_QUANTITY_IN_CART', payload: {checkout: res}});
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.props.checkout.id

    this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      store.dispatch({type: 'REMOVE_LINE_ITEM_IN_CART', payload: {checkout: res}});
    });
  }

  handleCartClose() {
    store.dispatch({type: 'CLOSE_CART'});
  }

  handleCartOpen() {
    store.dispatch({type: 'OPEN_CART'});
  }

  render() {
    return (
      <div className="App">
        <Nav handleCartOpen={this.handleCartOpen}/>
        <header className="App__header">
          {!this.props.isCartOpen &&
            <div className="App__view-cart-wrapper">
            <button className="App__view-cart" onClick={this.props.handleCartOpen}>
              Cart
            </button>
            </div>
          }
          <div className="App__title">
            <h1>{this.props.shop.name}: React Example</h1>
            <h2>{this.props.shop.description}</h2>
          </div>
        </header>
        <Cart
          checkout={this.props.checkout}
          isCartOpen={this.props.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
        <GenericProductsPage />
      </div>
    );
  }
}

export default connect((state) => state)(App)
