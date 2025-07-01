// Arquivo: app/page.tsx

'use client';

import React from 'react';
import { AuthenticatedRoute } from './layout/AuthenticatedRoute';

// Uma página no Next.js App Router é apenas um componente React simples!
export default function PaginaPrincipal() {
  return (
    // Você pode usar sua Rota Autenticada aqui para proteger o conteúdo desta página
    <AuthenticatedRoute>
      <main>

      </main>
    </AuthenticatedRoute>
  );
}