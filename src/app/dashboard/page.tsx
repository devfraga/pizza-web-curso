import { api } from "@/services/api";
import { getSession } from "@/utils/lib";
import { redirect } from "next/navigation";
import { OrderProps } from "@/utils/order.type";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/utils/cookieServer";


async function getOrders(): Promise<OrderProps[] | []> {
    try{
      const token = getCookieServer();
        const response = await api.get('/orders', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
    
        return response.data || []
    }catch(err){
        console.log(err);
        return []
    }
}

export default async function Dashboard() {
    const session = await getSession();
    const token = getCookieServer();

    
    if (!session || !token) {
        redirect("/")
    }

    const orders = await getOrders();

    return (
      <>  
        <Orders orders={orders} token={token} />
      </>
    );
}