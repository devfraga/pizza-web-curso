import { api } from '@/services/api';
import ProductForm from './components/form';
import { getCookieServer } from '@/utils/cookieServer';

export default async function Product() {

 const token = getCookieServer();
 const response = await api.get('/category', {
  headers:{
    Authorization: `Bearer ${token}`
  }
 });

 return (
  <>
   <ProductForm categories={response.data}/>
  </>
 );
}