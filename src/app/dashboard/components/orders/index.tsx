"use client"
import { RefreshCcw } from 'lucide-react';
import styles from './styles.module.scss'
import { OrderProps } from "@/utils/order.type";
import { ModalOrder } from '../modal';
import { use } from 'react';
import { OrderContext } from '@/providers/order';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Orders({ orders, token }: { orders: OrderProps[], token: string }) {
  const { onRequestOpen, isOpen } = use(OrderContext)
  const router = useRouter();

  async function handleDetailOrder(orderId: string){
    await onRequestOpen(orderId, token)
  }

  async function handleRefreshItems(){
    toast.success("Atualizando lista de pedidos.")
    router.refresh()
  }
  
 return (
  <>
  <main className={styles.container}>
    <div className={styles.containerHeader}>
      <h1>Últimos pedidos</h1>
      <button onClick={handleRefreshItems}>
        <RefreshCcw size={25} color="#3FFFA3"/>
      </button>
    </div>
    

    <section className={styles.listOrders}>
      {orders.length === 0 && (
        <span className={styles.emptyList}>
          Nao temos nenhum pedido ainda.
        </span>
      )}

      {orders.map( item => (
        <button 
          key={item.id} 
          className={styles.orderItem}
          onClick={() => handleDetailOrder(item.id)}
        >
          <div className={styles.tag}></div>
          <span>Mesa {item.table}</span>
        </button>
      ))}
    
    </section>

  </main>

  {isOpen && <ModalOrder/> }
  </>
 );
}