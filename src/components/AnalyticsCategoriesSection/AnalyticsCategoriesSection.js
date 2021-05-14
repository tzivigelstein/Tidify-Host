import React from 'react'
import { getPercent, getRelativePercent } from '../../helpers/getPercents'
import { InfoIcon } from '../Icons/Index'
import PieChart from '../PieChart/PieChart'
import Tip from '../Tip/Tip'
import styles from './analyticscategoriessection.module.css'

const CATEGORIES = [
  { id: 0, category: 'Desayunos', foregroundColor: '#e16036', backgroundColor: '#f5cbbc' },
  { id: 1, category: 'Almuerzos', foregroundColor: '#44af69', backgroundColor: '#aee0bf' },
  { id: 2, category: 'Cenas', foregroundColor: '#f8333c', backgroundColor: '#fb989d' },
  { id: 3, category: 'Bebidas', foregroundColor: '#fcab10', backgroundColor: '#ffe1a9' },
  { id: 4, category: 'Postres', foregroundColor: '#2b9eb3', backgroundColor: '#bde8ef' },
  { id: 5, category: 'Ensaladas', foregroundColor: '#2f394d', backgroundColor: '#ccd3e0' },
]

const AnalyticsCategoriesSection = ({ products }) => {
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

  const totalCategoryAmount = products && products.length

  function getCategoryPercent(category) {
    return parseFloat(getPercent(categoryAmounts && categoryAmounts[category], totalCategoryAmount))
  }

  return (
    <div>
      <h3>Categorías</h3>
      <div className={styles.categoriesChartList}>
        {CATEGORIES.map(({ id, foregroundColor, backgroundColor, category }) => {
          const percent = getCategoryPercent(category)
          const relativePercent = getRelativePercent(getCategoryPercent(category), 'small')
          return (
            <PieChart
              key={id}
              size="small"
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
              title={category}
              percent={percent}
              relativePercent={relativePercent}
            />
          )
        })}
      </div>
      <Tip title="Tip" tips={['Intenta mantener los porcentajes de categorias similares.']} />
    </div>
  )
}

export default AnalyticsCategoriesSection
