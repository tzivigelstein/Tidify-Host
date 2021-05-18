import { GET_ORDERS, GET_PRODUCTS, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, SET_URL } from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      }
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
      }

    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      }
    case SET_URL:
      return {
        ...state,
        url: action.payload,
      }
    default:
      return state
  }
}
