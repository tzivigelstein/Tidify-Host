import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../../firebase'
import PieChart from '../../PieChart/PieChart'
import styles from './analytics.module.css'

const CATEGORIES = [
  { id: 0, category: 'Desayunos', foregroundColor: '#e16036', backgroundColor: '#f5cbbc' },
  { id: 1, category: 'Almuerzos', foregroundColor: '#44af69', backgroundColor: '#aee0bf' },
  { id: 2, category: 'Cenas', foregroundColor: '#f8333c', backgroundColor: '#fb989d' },
  { id: 3, category: 'Bebidas', foregroundColor: '#fcab10', backgroundColor: '#ffe1a9' },
  { id: 4, category: 'Postres', foregroundColor: '#2b9eb3', backgroundColor: '#bde8ef' },
  { id: 5, category: 'Ensaladas', foregroundColor: '#2f394d', backgroundColor: '#ccd3e0' },
]

const Analytics = () => {
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState(null)
  const [categoryPercent, setCategoryPercent] = useState(0)
  const stock = products && products.filter(product => product.stock).length
  const stockPercent = products ? getPercent(stock, products.length) : 0
  const relativeStockPercent = getRelativePercent(stockPercent)

  const categoryAmounts =
    products &&
    products.reduce((acc, { category }) => {
      if (acc[category]) {
        acc[category]++
      } else {
        acc[category] = 1
      }

      return acc
    }, {})

  const totalCategoryAmount = Object.values(categoryAmounts).reduce((acc, el) => acc + el, 0)

  alert(totalCategoryAmount)

  function getCategoryPercent(category) {
    return getPercent(categoryAmounts && categoryAmounts[category], totalCategoryAmount)
  }

  function getPercent(a, b) {
    return ((a * 100) / b).toFixed(1)
  }

  function getRelativePercent(percent) {
    return (440 - (440 * percent) / 100).toFixed(2)
  }

  useEffect(() => {
    firebase.db.collection('products').onSnapshot(handleSnapshot)
  }, [])

  const handleSnapshot = snapshot => {
    const products = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setProducts(products)
  }

  return (
    <div>
      <h1>Analíticas</h1>
      <div className={styles.logisticsSection}>
        <PieChart
          size="medium"
          foregroundColor="#4e55de"
          backgroundColor="#d0d2f6"
          title="Stock"
          percent={stockPercent}
          relativePercent={relativeStockPercent}
        />
      </div>
      <div className={styles.categorySection}>
        <h3>Categorías</h3>
        <div className={styles.categoriesChartList}>
          {CATEGORIES.map(({ id, foregroundColor, backgroundColor, category }) => (
            <PieChart
              key={id}
              size="small"
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
              title={category}
              percent={getCategoryPercent(category)}
              relativePercent={getRelativePercent(getCategoryPercent(category))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
