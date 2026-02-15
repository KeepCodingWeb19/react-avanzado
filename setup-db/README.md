# Configurar Prisma en local (Docker + PostgreSQL)

Esta guía explica cómo levantar una base de datos PostgreSQL en Docker y conectar Prisma en este proyecto.

## Requisitos previos

- Tener instalado Docker Desktop (o Docker Engine + Docker Compose).
- Tener instalado Node.js y `pnpm`.
- Estar en la raíz del proyecto.

## 1) Levantar PostgreSQL con Docker

Utilizaremos `docker compose` para levantar un contenedor con PostgreSQL. El archivo `docker-compose.yml` ya está configurado en la carpeta `setup-db`. Para levantar la base de datos, sigue estos pasos:

1. Arranca la base de datos:

```bash
cd setup-db

docker compose up -d
```

2. Comprueba que está levantada:

```bash
docker ps
```

## 2) Construir la `DATABASE_URL`

Con la configuración anterior, la URL de conexión es:

```bash
postgresql://postgres:postgres@localhost:5432/nextjs_db?schema=public
```

## 3) Añadir `DATABASE_URL` al `.env`

En la raíz del proyecto, abre/crea el archivo `.env` y añade:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nextjs_db?schema=public"
```

Nota: este proyecto lee `DATABASE_URL` desde `prisma.config.ts` y también desde el cliente Prisma en runtime.

## 3) (Opcional) Añadir conexión utilizando PostgreSQL Client

Si quieres gestionar la base de datos con un cliente gráfico desde Visual Studio Code, puedes usar la extensión "PostgreSQL" de Database Client. Para ello:

1. Instala la extensión "PostgreSQL" de Database Client con código `cweijan.vscode-postgresql-client2`.
2. Añade la conexión utilizando el Connection String anterior (`DATABASE_URL`).
3. Conéctate y explora la base de datos.

## 4) Instalar dependencias (si aún no lo has hecho)

```bash
pnpm install
```

## 5) Generar cliente de Prisma

```bash
pnpm db:generate
```

## 6) Crear/aplicar migraciones

```bash
pnpm db:migrate
```

Esto crea las tablas en PostgreSQL y genera la migración en `prisma/migrations`.

## 7) (Opcional) Cargar datos de ejemplo

```bash
pnpm db:seed
```

## 8) Abrir Prisma Studio

```bash
pnpm db:studio
```

## 9) Arrancar la app

```bash
pnpm dev
```

## Comandos útiles

- Ver logs de PostgreSQL:

```bash
docker logs -f keepcoding-postgres
```

- Parar contenedor (compose):

```bash
docker compose down
```

- Parar y borrar datos (compose, cuidado):

```bash
docker compose down -v
```

- Parar contenedor (`docker run`):

```bash
docker stop keepcoding-postgres
```

- Arrancar contenedor existente (`docker run`):

```bash
docker start keepcoding-postgres
```

## Problemas frecuentes

- `DATABASE_URL environment variable is not set`:
  - Revisa que `.env` esté en la raíz del proyecto y tenga `DATABASE_URL`.
- Puerto `5432` ocupado:
  - Cambia el mapeo a otro puerto (por ejemplo `5433:5432`) y ajusta la URL.
- Error de autenticación:
  - Verifica usuario, contraseña y base de datos en Docker y en `DATABASE_URL`.
