import { useEffect, useState } from 'react'
import styles from './piechart.module.css'

const PieChart = ({ size, foregroundColor, backgroundColor, title, percent, relativePercent }) => {
  const defaultSizes = { width: 150, height: 150, mult: 440 }
  const [sizes, setSizes] = useState(defaultSizes)
  useEffect(() => {
    size === 'small' && setSizes({ width: 100, height: 100, mult: 293.93 })
    size === 'medium' && setSizes({ width: 150, height: 150, mult: 440 })
    size === 'large' && setSizes({ width: 220, height: 220, mult: 645.33 })
  }, [])
  return (
    <div className={styles.pieChartContainer}>
      <p className={styles.pieTitle}>{title}</p>
      <div className={styles.pieChartWrapper}>
        <svg style={{ width: sizes.width, height: sizes.height }} className={styles.pieChart}>
          <circle
            style={{ stroke: backgroundColor }}
            cx={(sizes.width - 10) / 2}
            cy={(sizes.width - 10) / 2}
            r={(sizes.width - 10) / 2}
          ></circle>
          <circle
            style={{ stroke: foregroundColor, strokeDashoffset: relativePercent, strokeDasharray: sizes.mult }}
            cx={(sizes.width - 10) / 2}
            cy={(sizes.width - 10) / 2}
            r={(sizes.width - 10) / 2}
          ></circle>
        </svg>
        <div className={styles.pieCenter}>
          <span className={styles.pieCenterText}>{`${percent}%`}</span>
        </div>
      </div>
    </div>
  )
}

export default PieChart
