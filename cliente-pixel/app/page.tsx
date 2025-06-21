// Arquivo: app/page.tsx

'use client';

import React from 'react';
import { AuthenticatedRoute } from './src/layout/AuthenticatedRoute';

// Uma página no Next.js App Router é apenas um componente React simples!
export default function PaginaPrincipal() {
  return (
    // Você pode usar sua Rota Autenticada aqui para proteger o conteúdo desta página
    <AuthenticatedRoute>
      <main>
        <h1>Bem-vindo(a)!</h1>
        <p>Este é o conteúdo principal da sua aplicação.</p>
        <p>Se você está vendo isso, o build do Docker funcionou!</p>
      </main>
    </AuthenticatedRoute>
  );
}