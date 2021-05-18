import { useContext, useEffect } from 'react'
import FirebaseContext from '../../../context/firebaseContext'
import { getPercent, getRelativePercent } from '../../../helpers/getPercents'
import AnalyticsCategoriesSection from '../../AnalyticsCategoriesSection/AnalyticsCategoriesSection'
import PieChart from '../../PieChart/PieChart'
import Tip from '../../Tip/Tip'
import styles from './analytics.module.css'

const Analytics = () => {
  const { products, getProducts } = useContext(FirebaseContext)
  const stock = products && products.filter(product => product.stock).length
  const stockPercent = products ? getPercent(stock, products.length) : 0
  const relativeStockPercent = getRelativePercent(stockPercent)

  useEffect(() => {
    products.length === 0 && getProducts()
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Analíticas</h1>
      <div>
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
        <Tip title="Tip" tips={['Intenta mantener el porcentaje de stock por encima del 80%.']} />
      </div>
      <AnalyticsCategoriesSection products={products} />
    </div>
  )
}

export default Analytics
