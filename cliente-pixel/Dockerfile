FROM node:18-alpine
WORKDIR /app

# Copia o standalone gerado
COPY --from=builder /app/.next/standalone ./

# Copia a pasta `.next/static` — necessário para assets públicos
COPY --from=builder /app/.next/static ./.next/static

# Copia a pasta `public` — para servir imagens etc.
COPY --from=builder /app/public ./public

# (Importante) Copia o `package.json` — é necessário para `node server.js` funcionar.
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "server.js"]
