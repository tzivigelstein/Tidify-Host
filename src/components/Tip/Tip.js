import React from 'react'
import { InfoIcon } from '../Icons/Index'
import styles from './tip.module.css'

const Tip = ({ title, tips }) => {
  return (
    <div className={styles.tipContainer}>
      <div className={styles.tipsHeader}>
        <InfoIcon stroke="#01579b" />
        <p className={styles.tipsHeaderText}>{title}</p>
      </div>
      {tips.map(tip => (
        <p className={styles.tipText}>{tip}</p>
      ))}
    </div>
  )
}

export default Tip
