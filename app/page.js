'use client';

import styles from './page.module.css'
import Login from './components/Login';


export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Todo app</h1>
      <Login />

    </main>
  )
}
