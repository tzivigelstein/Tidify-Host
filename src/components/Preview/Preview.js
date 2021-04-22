import styles from './preview.module.css'

const Preview = ({ imageUrl, values }) => {
  const { name, price, category, description } = values

  return (
    <div className={styles.product_container__preview_container}>
      <div className={styles.preview_container__image_container}>
        <img
          style={imageUrl ? { padding: 0 } : {}}
          className={styles.image_container__image}
          src={imageUrl ? imageUrl : '/undraw_Images_re_0kll.svg'}
          alt={imageUrl ? `${name} preview` : 'Empty product image'}
        />
      </div>
      <div className={styles.preview_container__info_container}>
        <div className={styles.info_container__heading}>
          <h3 className={styles.heading__title}>{name ? name : 'Nombre'}</h3>
          <span className={styles.heading__price}>${price}</span>
        </div>
        <div className={styles.info_container__categories}>
          {category ? <span className={styles.categories__category}> {category}</span> : ''}
        </div>
        <p className={styles.info_container__description}>{description ? description : 'Descripción'}</p>
      </div>
    </div>
  )
}

export default Preview
