import styles from './orderproductcard.module.css'

const OrderProductCard = ({ values }) => {
  const { id, image, name, description, stock, price, category } = values

  return (
    <div className={styles.product_container__preview_container}>
      <div className={styles.preview_container__info_container}>
        <div className={styles.info_container__heading}>
          <h3 className={styles.heading__title}>{name ? name : 'Nombre'}</h3>
          <span className={styles.heading__price}>{`$${price}`}</span>
        </div>
        <div className={styles.info_container__categories}>
          {category ? <span className={styles.categories__category}> {category}</span> : ''}
        </div>
      </div>
    </div>
  )
}

export default OrderProductCard
