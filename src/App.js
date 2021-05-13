import styles from './app.module.css'
import { Routes, Route } from 'react-router'
import firebase, { FirebaseContext } from './firebase'
import Home from './components/pages/Home/Home'
import Orders from './components/pages/Orders/Orders'
import Menu from './components/pages/Menu/Menu'
import New from './components/pages/New/New'
import Analytics from './components/pages/Analytics/Analytics'
import Sidebar from './components/Sidebar/Sidebar'

export default function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.container__components}>
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/new" element={<New />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  )
}
