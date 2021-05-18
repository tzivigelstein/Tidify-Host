import { useReducer } from 'react'
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, UPDATE_LAST_DOCUMENT, GET_ORDERS, SET_URL } from '../types'
import FirebaseContext from './firebaseContext'
import firebaseReducer from './firebaseReducer'
import firebase from '../firebase/firebase'
import { useNavigate } from 'react-router'

const FirebaseState = ({ children }) => {
  const initialState = {
    products: [],
    orders: [],
    url: null,
    lastDocument: null,
    loading: false,
    loadingMore: false,
    storageRef: firebase.storage.ref('products'),
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const router = useNavigate()

  const getProducts = () => {
    dispatch({
      type: GET_PRODUCTS,
    })

    firebase.db.collection('products').orderBy('createdAt').onSnapshot(handleSnapshot)

    function handleSnapshot(snapshot) {
      let products = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: products,
      })

      products.length !== 0 &&
        dispatch({
          type: UPDATE_LAST_DOCUMENT,
          payload: snapshot,
        })
    }
  }

  const addProduct = product => {
    firebase.db.collection('products').add(product)
    router('/menu')
  }

  const setStock = (id, stock) => {
    firebase.db.collection('products').doc(id).update({ stock })
  }

  const getUrl = async name => {
    const url = await firebase.storage.ref('products').child(name).getDownloadURL()
    dispatch({
      type: SET_URL,
      payload: url,
    })
  }

  const getOrders = () => {
    firebase.db.collection('orders').orderBy('createdAt', 'asc').onSnapshot(handleOrdersSnapshot)

    function handleOrdersSnapshot(snapshot, err) {
      if (!snapshot.empty) {
        let orders = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        dispatch({
          type: GET_ORDERS,
          payload: orders,
        })
      } else {
        console.log(err)
      }
    }
  }

  const setOrderStatus = (id, status) => {
    firebase.db.collection('orders').doc(id).update({ status })
  }

  return (
    <FirebaseContext.Provider
      value={{
        products: state.products,
        orders: state.orders,
        url: state.url,
        loading: state.loading,
        loadingMore: state.loadingMore,
        storageRef: state.storageRef,
        getProducts,
        addProduct,
        setStock,
        getUrl,
        getOrders,
        setOrderStatus,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseState
