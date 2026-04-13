# PawCare — Directorio de Cuidadores de Mascotas

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Aplicación web desarrollada como **proyecto integrador  – Fundamentos de React**.

PawCare es un directorio interactivo de cuidadores de mascotas que consume una API externa para obtener datos reales, los combina con información local y los presenta en tarjetas visuales. Incluye un sistema de login y registro de usuarios.

---

## Tabla de Contenido

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Componentes](#componentes)
- [Consumo de API](#consumo-de-api)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
- [Estado del Proyecto](#estado-del-proyecto)
- [Mejoras Futuras](#mejoras-futuras)
- [Autores](#autores)

---

## Descripción del Proyecto

PawCare permite a los dueños de mascotas encontrar cuidadores disponibles en su ciudad. Cada cuidador muestra su nombre, ciudad, calificación, precio por día, servicios ofrecidos y un botón de contacto.

La aplicación maneja tres estados posibles al cargar el directorio:

- **Cargando** — muestra una animación de patitas 🐾 mientras espera la respuesta de la API
- **Error** — muestra un mensaje descriptivo y un botón para reintentar
- **Éxito** — renderiza las 10 tarjetas de cuidadores

---

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2 | Biblioteca principal de UI |
| Vite | 8.0 | Bundler y servidor de desarrollo |
| Bootstrap | 5.3 | Estilos y componentes visuales |
| CSS3 | — | Estilos personalizados por componente |
| JSONPlaceholder | API pública | Datos simulados de cuidadores |

---

## Arquitectura del Proyecto

La aplicación es una **Single Page Application (SPA)** sin React Router. La navegación entre la vista principal y el login se maneja con `useState` en el componente raíz `App.jsx`.

```
App.jsx
  │
  ├── useState: usuario        →  nombre del usuario logueado (o null)
  ├── useState: showLogin      →  controla qué vista mostrar
  │
  ├── showLogin = true  →  <Login />
  └── showLogin = false →  <CuidadoresList />
```

Los datos de los cuidadores se obtienen desde una API externa al montar el componente, usando `useEffect` + `fetch`.

---

## Estructura de Carpetas

```
src/
│
├── main.jsx                        # Punto de entrada — enciende React
├── App.jsx                         # Componente raíz — maneja la navegación
├── App.css                         # Estilos del layout principal
├── index.css                       # Estilos globales
│
├── Components/
│   ├── CuidadoresList.jsx          # Lista completa de cuidadores
│   ├── CuidadoresList.css          # Estilos de las tarjetas
│   └── Login.jsx                   # Formulario de login y registro
│
└── assets/
    ├── hero.png                    # Imagen principal
    ├── react.svg                   # Logo de React
    └── vite.svg                    # Logo de Vite
```

---

## Componentes

### `App.jsx`

Componente raíz de la aplicación. Controla dos estados:

| Estado | Tipo | Descripción |
|---|---|---|
| `usuario` | `string \| null` | Nombre del usuario autenticado. `null` si no hay sesión |
| `showLogin` | `boolean` | Si es `true` muestra el login, si es `false` muestra el directorio |

Renderiza la **Navbar** y el **Footer** en todas las vistas. Decide qué mostrar en el área principal según `showLogin`.

---

### `CuidadoresList.jsx`

Componente principal del directorio. Maneja la obtención de datos y el renderizado de tarjetas.

**Estados internos:**

| Estado | Tipo | Descripción |
|---|---|---|
| `cuidadores` | Array | Lista de cuidadores obtenida de la API |
| `loading` | boolean | `true` mientras espera la respuesta |
| `error` | `string \| null` | Mensaje de error si la petición falla |

**Datos locales complementarios:**

Como la API de prueba no provee datos específicos de cuidadores, el componente define arrays locales que se combinan con la respuesta de la API por índice:

```javascript
const PRECIOS    = [8500, 12000, 9800, ...]   // Precio por día en CLP
const ESTRELLAS  = [4, 5, 5, 4, ...]          // Calificación sobre 5
const RESENAS    = [38, 124, 57, ...]          // Número de reseñas
const SERVICIOS  = [['Paseo', 'Guardería'], ...]
const COMENTARIOS = ['Ama a los perros desde pequeña...', ...]
const AVATARES   = ['🧑', '👩‍🦰', '👨‍🦳', ...]
```

**Subcomponentes internos:**

- `StarRating` — Renderiza estrellas llenas (★) y vacías (☆) según la calificación
- `CuidadorCard` — Tarjeta individual de un cuidador con todos sus datos

---

### `Login.jsx`

Formulario con dos modos que alterna con `useState`:

- **Iniciar Sesión** — solicita correo y contraseña
- **Crear Cuenta** — solicita nombre, correo y contraseña

Al enviar el formulario llama a `onAuth(nombre)` que notifica a `App.jsx` para actualizar el estado de sesión.

---

## Consumo de API

El componente `CuidadoresList` consume la API pública **JSONPlaceholder** para obtener datos de usuarios de prueba:

```
GET https://jsonplaceholder.typicode.com/users
```

Se utilizan los primeros 10 resultados. De cada usuario se usan los campos `name`, `email` y `address.city`.

**Implementación con `useEffect` y `fetch`:**

```javascript
useEffect(() => {
  const fetchCuidadores = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
      const data = await res.json()
      setCuidadores(data.slice(0, 10))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchCuidadores()
}, [])
```

El array vacío `[]` al final indica que el efecto se ejecuta **una sola vez**, al montar el componente.

---

## Cómo Ejecutar el Proyecto

**Requisitos previos:** Node.js 18 o superior instalado.

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>

# 2. Entrar a la carpeta
cd Lista-de-Publicaciones-con-React

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

**Otros comandos disponibles:**

```bash
npm run build    # Genera la versión de producción en /dist
npm run preview  # Previsualiza la versión de producción localmente
npm run lint     # Revisa errores de código con ESLint
```

---

## Estado del Proyecto

- ✅ Consumo de API externa con manejo de estados (loading / error / éxito)
- ✅ Renderizado dinámico de 10 tarjetas de cuidadores
- ✅ Sistema de login y registro de usuarios
- ✅ Navbar con estado de sesión (muestra nombre del usuario o botón de ingreso)
- ✅ Diseño responsive con Bootstrap y CSS personalizado
- ⏳ Sin React Router (navegación manejada con `useState`)
- ⏳ Sin backend ni persistencia de datos

---

## Mejoras Futuras

- Agregar React Router para navegación con URLs
- Implementar buscador y filtros por ciudad o servicio
- Conectar con backend real para datos de cuidadores reales
- Autenticación con JWT
- Página de detalle individual por cuidador
- Sistema de reservas de cuidadores
- Despliegue en producción (Vercel / Netlify)

---

## Autores

Proyecto desarrollado con fines educativos en el marco de un bootcamp de desarrollo Fullstack JavaScript.

---

*Este proyecto es de código abierto. Siéntete libre de explorarlo, clonarlo y proponer mejoras.*
