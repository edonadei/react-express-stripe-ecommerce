import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    // Products
    products: JSON.parse(localStorage.getItem("products")) || [],
    detailProduct: JSON.parse(localStorage.getItem("detailProduct")) || detailProduct,

    // Cart
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    cartSubTotal: JSON.parse(localStorage.getItem("cartSubTotal")) || 0,
    cartTax: JSON.parse(localStorage.getItem("cartTax")) || 0,
    cartTotal: JSON.parse(localStorage.getItem("cartTotal")) || 0,

    // Modal menu
    modalOpen: false,
    modalProduct: detailProduct,

    // Payment page details
    paymentPayload: JSON.parse(localStorage.getItem("paymentPayload")) || {},
  };

  // Used to give to pass the copies, not the actual values
  componentDidMount() {
    this.setProducts();
  }

  componentDidUpdate() {
    localStorage.setItem("products", JSON.stringify(this.state.products));
    localStorage.setItem("detailProduct", JSON.stringify(this.state.detailProduct));
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    localStorage.setItem("cartSubTotal", JSON.stringify(this.state.cartSubTotal));
    localStorage.setItem("cartTax", JSON.stringify(this.state.cartTax));
    localStorage.setItem("cartTotal", JSON.stringify(this.state.cartTotal));
    localStorage.setItem("paymentPayload", JSON.stringify(this.state.paymentPayload));
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  setPaymentPayload = (payload) => {
    const { amount, id, created } = payload;
    this.setState(() => {
      return {
        paymentPayload: {
          amount,
          id,
          created,
        },
      };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    // We update the tempProducts with the new values
    this.setState(
      () => {
        // Reminder ... means we had all the properties of the cart to this.state.cart
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    // Return id if selected item id is equal to id
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    // Return id if selected item id is equal to id
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;

      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    // items who dont have the id are returned
    // So we remove it from the cart
    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];

    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        // Give a new original fresh copy information
        // Set all values to default
        this.setProducts();

        // Because cart is now empty, totals should be equal to 0
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          setPaymentPayload: this.setPaymentPayload,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
