# Etapa 1: Dependencias - Instala las dependencias en una capa base
# Usamos una imagen de Node.js ligera. La versión debe coincidir con la que usas en desarrollo.
# Alpine es una distribución de Linux muy pequeña, ideal para imágenes Docker.
FROM node:20-alpine AS deps
WORKDIR /app

# Copia los archivos de manifiesto del paquete.
# Usamos '*' para copiar tanto package.json como package-lock.json (o yarn.lock, etc.)
COPY package*.json ./

# Instala las dependencias. '--frozen-lockfile' asegura que se use exactamente el lockfile.
RUN npm install --frozen-lockfile


# Etapa 2: Constructor - Construye la aplicación Next.js
# Reutilizamos la capa de dependencias para no tener que reinstalar todo.
FROM node:20-alpine AS builder
WORKDIR /app
# Copia las dependencias ya instaladas de la etapa anterior.
COPY --from=deps /app/node_modules ./node_modules
# Copia el resto del código fuente de la aplicación.
COPY . .

# Copia las variables de entorno de construcción (si las tienes).
# Estas son variables que Next.js necesita DURANTE el build (ej. NEXT_PUBLIC_*).
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Ejecuta el script de construcción de Next.js.
RUN npm run build


# Etapa 3: Producción - Prepara la imagen final y ligera
# Usamos la misma base para mantener la consistencia.
FROM node:20-alpine AS runner
WORKDIR /app

# Define las variables de entorno para el entorno de producción.
# Les damos valores por defecto vacíos o genéricos. Los valores reales
# se inyectarán en el runtime.
ENV NODE_ENV=production

# Define las variables de entorno para el entorno de producción.
# Estas son variables que la app necesita CUANDO se está ejecutando.
# El secreto JWT es crucial aquí. No lo hardcodees.
ENV NODE_ENV=production
# ENV JWT_SECRET=tu-secreto-de-produccion-inyectado-en-el-runtime

# Next.js crea un usuario 'nextjs' de bajos privilegios por seguridad.
# Creamos el directorio de la app y le damos permisos a este usuario.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir -p /app/.next/cache/images && chown -R nextjs:nodejs /app/.next

# Copia los artefactos de la construcción desde la etapa 'builder'.
# Copiamos solo lo estrictamente necesario para ejecutar la app.
COPY --from=builder /app/public ./public
# La carpeta standalone contiene todo lo necesario para ejecutar la app en producción.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambia al usuario de bajos privilegios por seguridad.
USER nextjs

# Expone el puerto en el que Next.js se ejecutará. Por defecto es 3000.
EXPOSE 3000

# Define el comando para iniciar el servidor de Next.js.
# Usamos 'server.js' que se encuentra dentro de la carpeta 'standalone'.
CMD ["node", "server.js"]