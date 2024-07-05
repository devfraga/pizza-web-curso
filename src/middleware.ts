
import { NextRequest, NextResponse } from 'next/server';
import { api } from './services/api';
import { getCookieServer } from './utils/cookieServer';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acesso público para a página de login e recursos estáticos
  if (pathname.startsWith('/_next') || pathname === '/login') {
    return NextResponse.next();
  }
  
  // Verificar o token de autenticação para as rotas protegidas
  const token = getCookieServer();

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Verificar o token com a API
    const valid = await validateToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string): Promise<boolean> {
  if (!token) return false;

  try {
      await api.get('/me', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })

      return true;

  } catch (err) {
      return false;
  }
}