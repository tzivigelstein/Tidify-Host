import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../../firebase'
import OrderProductCard from '../../OrderProductCard/OrderProductCard'
import styles from './orders.module.css'

const Orders = () => {
  const { firebase } = useContext(FirebaseContext)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    firebase.db.collection('orders').orderBy('createdAt', 'asc').onSnapshot(handleSnapshot)
  }

  const handleSnapshot = snapshot => {
    const products = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setOrders(products)
  }

  return (
    <ul className={styles.ordersList}>
      {orders.map(order => (
        <li key={order.id} className={styles.orderCard}>
          <div>
            <div className={styles.heading}>
              <span>{`$${order.total}`}</span>
              <div className={styles.indicatorContainer}>
                <span>{order.status ? 'Listo' : 'En proceso'}</span>
                <div
                  style={order.status ? { borderColor: 'rgba(75, 181, 67, 0.4)' } : {}}
                  className={styles.indicatorBorder}
                >
                  <div style={order.status ? { backgroundColor: '#4BB543' } : {}} className={styles.indicator}></div>
                </div>
              </div>
            </div>
            <div></div>
            <div className={styles.button}></div>
            <ul className={styles.products}>
              {order.cart.map(cartItem => (
                <OrderProductCard values={cartItem} />
              ))}
            </ul>
            <p className={styles.id}>{order.id}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Orders
