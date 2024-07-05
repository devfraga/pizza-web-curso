"use client"

import { useFormStatus } from "react-dom";
import styles from './styles.module.scss'

export default function Button({ name }: { name: string }) {
  const { pending } = useFormStatus()
 return (
  <button type="submit" disabled={pending} className={styles.button}>
    {pending ? "Carregando..." : name}
  </button>
 );
}