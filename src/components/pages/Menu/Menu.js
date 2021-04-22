import { useContext, useEffect, useState } from 'react'
import styles from './menu.module.css'
import { Link } from 'react-router-dom'
import { PlusIcon } from '../../Icons/Index'
import { FirebaseContext } from '../../../firebase'
import Card from '../../Card/Card'

const Menu = () => {
  const { firebase } = useContext(FirebaseContext)

  const [products, setProducts] = useState()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    firebase.db.collection('products').onSnapshot(handleSnapshot)
  }

  const handleSnapshot = snapshot => {
    const products = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setProducts(products)
  }

  return (
    <div className={styles.menu_container}>
      <div className={styles.menu_container__heading}>
        <h1 className={styles.heading__title}>Menu</h1>
        <Link className={styles.heading__new} to="/new">
          <PlusIcon width={16} height={16} /> Nueva orden
        </Link>
      </div>
      <div className={styles.menu_container__list_container}>
        <ul className={styles.list_container__list}>
          {products && products.map(product => <Card key={product.id} values={product} />)}
        </ul>
      </div>
    </div>
  )
}

export default Menu
