import { useContext, useRef } from 'react'
import { FirebaseContext } from '../../firebase'
import styles from './card.module.css'

const Card = ({ values }) => {
  const { id, image, name, description, stock, price, category } = values

  const { firebase } = useContext(FirebaseContext)

  const stockRef = useRef()

  const handleChange = () => {
    const selectValue = stockRef.current.value
    const stock = selectValue === 'true'

    firebase.db.collection('products').doc(id).update({ stock })
  }

  return (
    <div className={styles.product_container__preview_container}>
      <div className={styles.preview_container__image_container}>
        <img
          style={image ? { padding: 0 } : {}}
          className={styles.image_container__image}
          src={image ? image : '/undraw_Images_re_0kll.svg'}
          alt={image ? `${name} preview` : 'Empty product image'}
        />
      </div>
      <div className={styles.preview_container__info_container}>
        <div className={styles.info_container__heading}>
          <h3 className={styles.heading__title}>{name ? name : 'Nombre'}</h3>
          <span className={styles.heading__price}>{`$${price}`}</span>
        </div>
        <div className={styles.info_container__categories}>
          {category ? <span className={styles.categories__category}> {category}</span> : ''}
        </div>
        <p className={styles.info_container__description}>{description ? description : 'Descripción'}</p>
        <select
          ref={stockRef}
          onChange={handleChange}
          value={stock}
          className={styles.info_container__select}
          name=""
          id=""
        >
          <option value="true">Disponible</option>
          <option value="false">No disponible</option>
        </select>
      </div>
    </div>
  )
}

export default Card
