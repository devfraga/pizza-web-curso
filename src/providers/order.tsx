"use client"

import { api } from "@/services/api";
import { getCookieClient } from "@/utils/cookieClient";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface OrderItemProps {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
  }
  order:{
    id: string;
    table: string;
    status: boolean;
    name: string | null;
  }
};

type OrderContextData = { 
  order: OrderItemProps[];
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestOpen: (orderId: string, token: string) => Promise<void>;
  handleFinishOrder: (orderId: string) => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({children}: AuthProviderProps){
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  function onRequestClose(){
    setIsOpen(false);
    setOrder([])
  }

  async function onRequestOpen(orderId: string, token: string){
    if(!orderId || !token) return;

    const response = await api.get('/order/detail', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params:{
        order_id: orderId,
      },
    })

    setOrder(response.data)
    setIsOpen(true);
  }

  async function handleFinishOrder(orderId: string){
    const token = getCookieClient();
    // console.log(token)

    const data = {
      order_id: orderId,
    }
    await api.put('/order/finish', data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    toast.success("Pedido finalizado com sucesso!")
    router.refresh()
    onRequestClose();
  }

  return(
    <OrderContext.Provider
     value={{ 
      order, 
      isOpen,
      onRequestClose,
      onRequestOpen,
      handleFinishOrder
    }}
    >
      {children}
    </OrderContext.Provider>
  )

}