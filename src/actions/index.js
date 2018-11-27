import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const clearCart = products => dispatch => {
  dispatch({
    type: types.CLEAR_CART,
    products
  })
}

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = (productId, quantity) => ({
  type: types.ADD_TO_CART,
  productId,
  quantity
})

export const buyAll = productId => (dispatch, getState) => {
  const { inventory } = getState().products.byId[productId]
  if (inventory > 0) {
    dispatch(addToCartUnsafe(productId, inventory))
  }
}
export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId, 1))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
