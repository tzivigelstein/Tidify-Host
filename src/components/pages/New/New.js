import { useContext, useState } from 'react'
import styles from './new.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'
import Preview from '../../Preview/Preview'

const New = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  const { firebase } = useContext(FirebaseContext)

  const router = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Mínimo 3 caracteres').required('El nombre es obligatorio'),
      description: Yup.string().min(10, 'Mínimo 10 caracteres').required('La descripción es obligatoria'),
      price: Yup.number().min(1, 'El precio debe ser mayor a 0').required('El precio es obligatorio'),
      category: Yup.string().required('La categoría es obligatoria'),
    }),
    onSubmit: data => {
      const newData = { ...data, image: imageUrl, sold: 0, bestSeller: false, createdAt: Date.now() }
      try {
        firebase.db.collection('products').add(newData)
        router('/menu')
      } catch (error) {
        console.log(error)
      }
    },
  })

  const handleUploadStart = () => {
    setProgress(0)
    setUploading(true)
  }

  const handleUploadError = error => {
    setProgress(0)
    setUploading(false)
    console.log(error)
  }

  const handleUploadSuccess = async name => {
    setProgress(100)
    setUploading(false)

    const url = await firebase.storage.ref('products').child(name).getDownloadURL()

    setImageUrl(url)
  }

  const handleUploadProgress = progress => {
    setProgress(progress)
  }

  return (
    <div className={styles.new_container}>
      <div className={styles.new_container__heading}>
        <h1 className={styles.heading__title}>Nueva orden</h1>
        <input onClick={formik.handleSubmit} className={styles.form__button} type="submit" value="Añadir" />
      </div>
      <div className={styles.new_container__product_container}>
        <div className={styles.product_container__form_container}>
          <form className={styles.form_container__form}>
            <div className={styles.form__field_container}>
              <label className={styles.field_container__label} htmlFor="name">
                Nombre
              </label>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                id="name"
                name="name"
                placeholder="Nombre de la orden"
                className={styles.field_container__input}
                onBlur={formik.handleBlur}
              />
              <p
                style={formik.touched.name && formik.errors.name && { visibility: 'none' }}
                className={styles.field_container__error_message}
              >
                {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
              </p>
            </div>

            <div className={styles.form__field_container}>
              <label className={styles.field_container__label} htmlFor="description">
                Descripción
              </label>
              <textarea
                value={formik.values.description}
                maxLength="180"
                onChange={formik.handleChange}
                type="text"
                id="description"
                name="description"
                placeholder="Descripción de la orden"
                className={styles.field_container__textarea}
                onBlur={formik.handleBlur}
              ></textarea>
              <p
                style={formik.touched.description && formik.errors.description && { visibility: 'none' }}
                className={styles.field_container__error_message}
              >
                {formik.touched.description && formik.errors.description ? formik.errors.description : ''}
              </p>
            </div>

            <div className={styles.form__field_container}></div>

            <div id={styles.form__price_category} className={styles.form__field_container}>
              <div>
                <label className={styles.field_container__label} htmlFor="price">
                  Precio
                </label>
                <input
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Precio de la orden"
                  className={styles.field_container__input}
                  min="1"
                  onBlur={formik.handleBlur}
                />
                <p
                  style={formik.touched.price && formik.errors.price && { visibility: 'none' }}
                  className={styles.field_container__error_message}
                >
                  {formik.touched.price && formik.errors.price ? formik.errors.price : ''}
                </p>
              </div>
              <div>
                <label className={styles.field_container__label} htmlFor="category">
                  Categoría
                </label>
                <select
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  className={styles.field_container__select}
                  name="category"
                  id="category"
                  onBlur={formik.handleBlur}
                >
                  <option disabled value="">
                    -- Seleccione categoría --
                  </option>
                  <option value="Desayunos">Desayunos</option>
                  <option value="Almuerzos">Almuerzos</option>
                  <option value="Cenas">Cenas</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Postres">Postres</option>
                  <option value="Ensaladas">Ensaladas</option>
                </select>
                <p
                  style={formik.touched.category && formik.errors.category && { visibility: 'none' }}
                  className={styles.field_container__error_message}
                >
                  {formik.touched.category && formik.errors.category ? formik.errors.category : ''}
                </p>
              </div>
            </div>

            <div className={styles.form__field_container}>
              <label className={styles.field_container__label} htmlFor="image">
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="image"
                name="name"
                randomizeFilename="true"
                storageRef={firebase.storage.ref('products')}
                className={styles.field_container__input}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleUploadProgress}
              />
              {uploading ||
                (!(progress === 0) && (
                  <div className={styles.field_container__progress_container}>
                    <div className={styles.progress_container__progress}>
                      <span className={styles.progress__bar} style={{ width: `${progress}%` }}></span>
                    </div>
                    <div className={styles.progress_container__indicators}>
                      <span>{progress === 100 ? 'Subido' : 'Subiendo'}</span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                ))}
            </div>
          </form>
        </div>
        <Preview imageUrl={imageUrl} values={formik.values} />
      </div>
    </div>
  )
}

export default New
