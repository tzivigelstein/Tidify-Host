import { useContext, useEffect } from 'react'
import FirebaseContext from '../../../context/firebaseContext'
import OrderProductCard from '../../OrderProductCard/OrderProductCard'
import styles from './orders.module.css'

const Orders = () => {
  const { orders, getOrders, setOrderStatus } = useContext(FirebaseContext)

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <ul className={styles.ordersList}>
      {orders.length !== 0 &&
        orders.map(({ id, total, status, cart }) => (
          <li key={id} className={styles.orderCard}>
            <div>
              <div className={styles.heading}>
                <span>{`$${total}`}</span>
                <div className={styles.indicatorContainer}>
                  <span>{status ? 'Listo' : 'En proceso'}</span>
                  <div
                    style={status ? { borderColor: 'rgba(75, 181, 67, 0.4)' } : {}}
                    className={styles.indicatorBorder}
                  >
                    <div style={status ? { backgroundColor: '#4BB543' } : {}} className={styles.indicator}></div>
                  </div>
                </div>
              </div>
              <div></div>
              <ul className={styles.products}>
                {cart.map(cartItem => (
                  <OrderProductCard key={cartItem.id} values={cartItem} />
                ))}
              </ul>

              {!status ? (
                <div onClick={() => setOrderStatus(id, !status)} className={styles.button}>
                  Cambiar a Listo
                </div>
              ) : (
                <div onClick={() => setOrderStatus(id, !status)} className={styles.buttonInProcess}>
                  Cambiar a En proceso
                </div>
              )}

              <p className={styles.id}>{id}</p>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default Orders
