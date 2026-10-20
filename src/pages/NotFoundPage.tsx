import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.less'

export function NotFoundPage() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1>Allay couldn’t find this page</h1>
      <p>It flew over every chest and came back empty-handed. The page may have moved.</p>
      <p className={styles.links}>
        <Link to="/">Front page</Link>
        <Link to="/wiki/">Wiki</Link>
      </p>
    </div>
  )
}
