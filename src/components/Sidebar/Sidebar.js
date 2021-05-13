import styles from './sidebar.module.css'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__heading}>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
          <p className={styles.heading__title}>Tidify</p>
          <p className={styles.heading__helper}>Siempre a tu alcance</p>
        </Link>
        <nav className={styles.heading__nav}>
          <NavLink end to="/" className={styles.nav__link} activeClassName={styles.nav__link_active}>
            Ordenes
          </NavLink>
          <NavLink end to="/menu" className={styles.nav__link} activeClassName={styles.nav__link_active}>
            Menu
          </NavLink>
          <NavLink end to="/analytics" className={styles.nav__link} activeClassName={styles.nav__link_active}>
            Analíticas
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
