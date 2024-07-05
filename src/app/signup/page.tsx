import Image from 'next/image';
import styles from '../page.module.scss';

import logoImg from '/public/logo.svg';

import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { api } from '@/services/api';


export default function Signup() {

  async function handleRegister(formData: FormData){
    "use server"
    
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    if(name === '' || email === '' || password === ''){
      // toast.error("Preencha os campos")
      return;
    }

    try{
      await api.post('/users', {
        name: name,
        email,
        password
      })
  
    }catch(err){
      console.log(err)
    }

    redirect("/")
  }

  return (
    <>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form action={handleRegister} >
          <input
            placeholder="Digite o nome completo"
            className={styles.input}
            name="name"
            required
          />

          <input
            placeholder="Digite seu email"
            className={styles.input}
            type="email"
            name="email"
            required
          />

          <input
            placeholder="Digite sua senha..."
            className={styles.input}
            type="password"
            name="password"
            required
          />
          
          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>
        
        <Link href="/" className={styles.text}>
           Já possui uma conta? Faça o login
        </Link>

      </div>
    </div>
    </>
  )
}

