# Jaime Portfolio Angular

Starter kit de landing page + backoffice para `jaimequiceno.es`.

## Qué resuelve

- Landing profesional enfocada a contratación fija como Arquitecto de Software.
- Soporte multidioma en runtime (`es`, `en`) sin recompilar por idioma.
- Área `/admin` para activar o desactivar secciones públicas, skills, experiencia y proyectos.
- Datos seed basados en tu CV y preparados para evolucionar a CMS real.

## Stack

- Angular standalone + router lazy loaded
- Signals para estado local
- CMS demo con `localStorage`
- Estructura preparada para sustituir auth y persistencia por Firebase/Auth0/Supabase

## Arranque

```bash
npm install
npm start
```

## Roadmap recomendado

1. Reemplazar `AuthService` por Firebase Authentication.
2. Sustituir `PortfolioCmsService` por Firestore o API .NET.
3. Añadir SEO dinámico, Open Graph y analytics.
4. Cargar una foto profesional real en `src/assets/images/`.
5. Incorporar más idiomas extendiendo `Locale` y los ficheros `src/assets/i18n`.

## Despliegue

Para una landing pública en tu dominio, lo más práctico es:

- Frontend Angular estático en Firebase Hosting, Netlify o Azure Static Web Apps.
- Auth + datos en Firebase si quieres ir rápido.
- Alternativa enterprise: API .NET + Azure App Service + Azure SQL/Cosmos.
