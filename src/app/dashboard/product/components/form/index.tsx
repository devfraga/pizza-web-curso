"use client"

import { Upload } from 'lucide-react';
import styles from './styles.module.scss'
import { ChangeEvent,useState } from 'react'; 
import { toast } from 'sonner';
import Image from 'next/image';
import { api } from '@/services/api';
import { getCookieClient } from '@/utils/cookieClient';
import Button from '@/app/dashboard/components/button';

interface CategoryProps{
  id: string;
  name: string;
}

export default function ProductForm({ categories }: { categories: CategoryProps[] }) {

  const [previewImage, setPreviewImage] = useState("")
  const [image, setImage] = useState<File>()
  const [loading, setLoading] = useState(false)

  async function handleRegisterProduct(formData: FormData) {
    
    const data = new FormData();
    const name = formData.get("name")
    const price = formData.get("price")
    const description = formData.get("description")
    const category = formData.get("category")

    if(!name || !price || !description || !category || !image){
      toast.error("Preencha todos os campos")
      return;
    }

    const token = getCookieClient();
    data.append('name', name);
    data.append('price', price);
    data.append('description', description);
    data.append('category_id', categories[Number(category)].id);
    data.append('file', image);

    await api.post('/product', data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
  
    toast.success('Usuario atualizado com sucesso!');
  }


  // Chama quando trocar file
  async function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      setLoading(true);
      const image = e.target.files[0]
  
      if(image.type !== 'image/jpeg' && image.type !== 'image/png'){
        toast.error('Uploaded file is not supported', { duration: 3000})
        setLoading(false);
        return;
      }
      
      setImage(image)
      // console.log(image)
  
      setPreviewImage(URL.createObjectURL(image))
      setLoading(false);
  
    }
  }

 return (
  <>
  <div>
  <main className={styles.container}>
    <h1>Novo produto</h1>

    <form className={styles.form} action={handleRegisterProduct}>
      <label className={styles.labelAvatar}>
        <span>
          <Upload color="#FFF" size={25} />
        </span>

        <input 
          type="file" 
          accept="image/png, image/jpeg" 
          onChange={handleFile}
          required
        />

        { previewImage && (
          <Image
            src={previewImage}
            alt="Foto do avatar"
            className={styles.preview}
            fill={true}
            priority={true}
            quality={100}
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
          />
          )}
              
      </label>

      <select name="category" >
        {categories.map((item, index) => {
          return(
            <option key={item.id} value={index} >
              {item.name}
            </option>
          )
        })}
      </select>

      <input 
        className={styles.input}
        type="text" 
        placeholder="Nome do produto"
        name="name"
        required
      />

      <input 
        className={styles.input}
        type="text" 
        placeholder="Preço"
        name="price"
        required
      />

      <textarea 
        className={styles.input}
        placeholder="Descreva esse produto"
        name="description"
        required
      />

      <Button name="Cadastrar" />
      </form>
  </main>
        
  </div>
  </>
 );
}