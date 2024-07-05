
"use client";

import { X } from "lucide-react";
import styles from './styles.module.scss'
import { api } from "@/services/api";
import { use } from "react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {
  const { onRequestClose, order, handleFinishOrder } = use(OrderContext);

  async function handleFinish(id: string) {
    await handleFinishOrder(id)
  }


  if(order.length === 0) return null;  

  return (
    <>
    <dialog
      className={styles.dialogContainer}
    >
      <div className={styles.dialogContent}>
          <button 
            onClick={onRequestClose}
            className={styles.dialogBack}
          >
            <X size={40} color="#FF3F4B"/>
          </button>

          <div className={styles.container}>
            <h2>Detalhes do pedido</h2>
            <span className={styles.table}>
              Mesa: <strong>{order[0].order.table}</strong>
            </span>

            {order.map( item => (
            <section key={item.id} className={styles.containerItem}>
              <span>{item.amount} - <strong>{item.product.name}</strong></span>
              <span className={styles.description}>{item.product.description}</span>
            </section>
            ))}

            <button 
              className={styles.buttonOrder} 
              onClick={ () => handleFinish(order[0].order.id) }
            >
              Concluir pedido
            </button>

          </div>
        </div>
      </dialog>
    </>
    );
}

