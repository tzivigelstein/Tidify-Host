import React from 'react'
import { InfoIcon } from '../Icons/Index'
import styles from './tip.module.css'
import { nanoid } from 'nanoid'

const Tip = ({ title, tips }) => {
  const parsedTips = tips.map(tip => {
    const id = nanoid()
    return {
      id,
      tip,
    }
  })
  return (
    <div className={styles.tipContainer}>
      <div className={styles.tipsHeader}>
        <InfoIcon stroke="#01579b" />
        <p className={styles.tipsHeaderText}>{title}</p>
      </div>
      {parsedTips.map(({ id, tip }) => (
        <p key={id} className={styles.tipText}>
          {tip}
        </p>
      ))}
    </div>
  )
}

export default Tip
