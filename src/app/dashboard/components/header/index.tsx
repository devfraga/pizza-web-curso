import styles from './styles.module.scss';
import Link from 'next/link'

import { LogOutIcon } from 'lucide-react'
import { cookies } from 'next/headers';

export function Header(){

  async function handleLogout() {
    'use server'
    cookies().delete("session") 
  }

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.svg" width={190} height={60} alt="Sujeito Pizza"/>
        </Link>

        <nav>
          <Link href="/dashboard/category">
            Categoria
          </Link>
          <Link href="/dashboard/product">
            Cardapio
          </Link>
          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon size={23} color="#FFF"/>
            </button>
          </form>
        </nav>

      </div>
    </header>
  )
}