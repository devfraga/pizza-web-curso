import { api } from '@/services/api';
import styles from './page.module.scss'
import { redirect } from 'next/navigation';
import { getCookieServer } from '@/utils/cookieServer';
import Button from '../components/button';

export default function Category() {


  async function handleRegisterCategory(formData: FormData){
    "use server"

    const name = formData.get("name")
    if(name === ''){
      return;
    }

    const token = getCookieServer();

    const data = {
      name: name,
    }

    await api.post('/category', data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .catch((err) => {
      console.log(err)
    })

    redirect('/dashboard')  

  }

 return (
   <>
    <main className={styles.container}>
      <h1>Cadastrar categoria</h1>
      <form 
        className={styles.form} 
        action={handleRegisterCategory}
      >
        <input 
          className={styles.input}
          type="text" 
          placeholder="Nome da categoria"
          name="name"
          required
        />
        <Button name="Cadastrar" />
        </form>
    </main>
   </>
 );
}