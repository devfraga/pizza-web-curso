import { api } from '@/services/api';
import { cookies } from "next/headers";
import { getCookieServer } from './cookieServer';

export async function logout() {
    // Destroy the session 
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = getCookieServer();
    
    if (!session) return null;

    try {
        const response = await api.get('/me', {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })

        if (response.data) {
            const { id, name, email } = response.data;
            return { id, name, email }
        }
    } catch (err) {
        return null;
    }


}