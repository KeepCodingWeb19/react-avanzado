# React Avanzado 19 - Módulo 10

Repositorio del módulo 10 de React Avanzado en KeepCoding, centrado en Next.js y el enfoque Server First.

## Sobre mí

Soy Alex Martínez, desarrollador Full-Stack, y en este repositorio voy documentando y construyendo los ejercicios y entregas del módulo.

## Qué se trabaja en React Avanzado (Módulo 10)

El módulo recorre 6 bloques prácticos:

1. RSC y arquitectura con App Router.
2. Fetching de datos y Streaming.
3. Mutaciones con Server Actions.
4. Formularios y UX avanzada (`useActionState`, `useOptimistic`).
5. Control de errores y seguridad (`error.tsx`, `not-found.tsx`, validación y middleware).
6. Testing y calidad en producción (unit testing de Server Actions, límites serverless y despliegue).

Idea central del módulo: mover la lógica pesada al servidor y dejar el cliente para interactividad puntual.

## Contenido del repositorio

Estructura actual y objetivo de organización:

```text
.
├── docs/.                 # presentación oficial del módulo y enunciado de práctica
│   ├── React Avanzado.pdf
│   └── Práctica Next.js Marketplace de Anuncios.pdf
├── setup-db/               # entorno local de BD (Docker + PostgreSQL) y guía Prisma
│   ├── docker-compose.yml
│   └── README.md
└── src/                    # contenido de clases en curso
```

## Práctica a completar durante estas semanas

En el enunciado de la práctica `docs/Práctica Next.js Marketplace de Anuncios.pdf`, la entrega es una app Fullstack tipo marketplace en Next.js (App Router) con estos mínimos:

1. Listado de anuncios en servidor (sin `useEffect` para carga inicial), filtros por URL y `loading.js` para Streaming.
2. Detalle dinámico en `/ads/[id]` con `generateMetadata` para SEO básico.
3. Login y creación de anuncios con Server Actions, validación en servidor y `revalidatePath`.
4. Manejo de errores con `not-found.js` y `error.js`.
5. Testing: al menos 1 test unitario de una Server Action.

Extras para nota máxima: proteger `/ads/create` con middleware, implementar Optimistic UI y demostrar buena separación Server/Client Components.
