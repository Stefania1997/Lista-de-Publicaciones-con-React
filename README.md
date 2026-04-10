# 🐾 PawCare -- Sistema de Gestión de Cuidadores de Mascotas

Aplicación web desarrollada como solución digital para la búsqueda y
gestión de cuidadores de mascotas, creada durante el **Módulo de React
-- Desarrollo de Aplicaciones Modernas**.

El sistema permite visualizar un directorio de cuidadores profesionales,
gestionar el acceso de usuarios y simular la contratación de servicios
utilizando **React** y consumo de **APIs externas**.

------------------------------------------------------------------------

# 📚 Tabla de Contenido
* [Contexto del Proyecto](#contexto-del-proyecto)
* [Objetivo del Proyecto](#objetivo-del-proyecto)
* [Tecnologías Utilizadas](#tecnologías-utilizadas)
* [Arquitectura del Proyecto](#arquitectura-del-proyecto)
* [Estructura de Carpetas](#estructura-de-carpetas)
* [Funcionalidades Implementadas](#funcionalidades-implementadas)
* [Manejo de Estados y Hooks](#manejo-de-estados-y-hooks)
* [Diseño y UX](#diseño-y-ux)
* [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
* [Estado del Proyecto](#estado-del-proyecto)

------------------------------------------------------------------------
<a name="contexto-del-proyecto"></a>
# 🧠 Contexto del Proyecto

**PawCare** nace de la necesidad de centralizar la búsqueda de personas
calificadas para el cuidado de mascotas. En un entorno donde la
confianza es clave, la plataforma ofrece un directorio dinámico donde
los dueños pueden revisar perfiles, valoraciones y precios en un solo
lugar.

### Problemas que resuelve

-   Dispersión de información de cuidadores
-   Falta de transparencia en precios y reseñas
-   Dificultad para visualizar la disponibilidad inmediata

------------------------------------------------------------------------
<a name="objetivo-del-proyecto"></a>
# 🎯 Objetivo del Proyecto

Construir una **Single Page Application (SPA)** funcional que permita:

✔ Visualizar una red de cuidadores mediante una API externa
✔ Implementar un sistema de autenticación simulado (Login / Registro)
✔ Gestionar la interfaz mediante renderizado condicional
✔ Ofrecer una experiencia fluida con estados de carga y error

Utilizando:

-   **React Hooks** (`useState`, `useEffect`)
-   **Fetch API** para datos asíncronos
-   **Bootstrap 5** para el sistema de diseño

------------------------------------------------------------------------
<a name="tecnologías-utilizadas"></a>
# 🧰 Tecnologías Utilizadas

  Tecnología        Uso
  ----------------- ------------------------
  React 18          Biblioteca principal
  Vite              Entorno de desarrollo
  Bootstrap 5       Estilos y Layout
  CSS3              Estilos personalizados
  JSONPlaceholder   API de datos simulados

### Fuentes utilizadas

-   **Fraunces** (Títulos)
-   **Plus Jakarta Sans** (Cuerpo)

------------------------------------------------------------------------
<a name="arquitectura-del-proyecto"></a>
# 🏗 Arquitectura del Proyecto

El sistema está construido bajo una **arquitectura de componentes
reutilizables**.

Los datos de los cuidadores se obtienen asíncronamente y se complementan
con lógica interna:

``` javascript
const fetchCuidadores = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  setCuidadores(data.slice(0, 10));
};
```

El estado global del usuario se gestiona en el componente raíz
(`App.jsx`) para permitir el acceso protegido a las funciones de la app.

------------------------------------------------------------------------
<a name="estructura-de-carpetas"></a>
# 📂 Estructura de Carpetas

    project-root
    │
    ├── src
    │   ├── components
    │   │   ├── CuidadoresList.jsx   # Listado y lógica de API
    │   │   ├── Login.jsx            # Formulario de acceso / registro
    │   │   └── Footer.jsx           # Pie de página
    │   │
    │   ├── App.jsx                  # Componente principal
    │   ├── App.css                  # Estilos globales
    │   └── main.jsx                 # Punto de entrada React
    │
    ├── public                       # Recursos estáticos
    └── README.md

------------------------------------------------------------------------
<a name="funcionalidades-implementadas"></a>
# ⚙ Funcionalidades Implementadas

## 🔐 Autenticación de Usuario

Sistema simple que permite al usuario **iniciar sesión o registrarse**.

Una vez autenticado:

-   Se guarda el nombre del usuario
-   Se actualiza el encabezado dinámicamente

------------------------------------------------------------------------

## 🐶 Directorio Dinámico

Los perfiles de cuidadores se generan dinámicamente utilizando `map()`
sobre los datos obtenidos desde la API.

Cada tarjeta incluye:

-   Avatar personalizado
-   Sistema de calificación por estrellas
-   Precio por jornada
-   Descripción del servicio

------------------------------------------------------------------------

## ⏳ Gestión de Carga (Loading State)

Se implementa un **estado de carga con una animación 🐾** mientras se
obtienen los datos desde la API.

Esto mejora la **percepción de rendimiento de la aplicación**.

------------------------------------------------------------------------
<a name="manejo-de-estados-y-hooks"></a>
# 🧠 Manejo de Estados y Hooks

Durante el desarrollo se aplicaron conceptos fundamentales de React:

## useState

Se utiliza para:

-   Controlar visibilidad del login
-   Almacenar los cuidadores
-   Guardar datos del formulario

## useEffect

Permite ejecutar la petición a la API **cuando el componente se monta**.

## Props

Se utilizan para comunicar información entre componentes, por ejemplo:

-   Enviar datos de autenticación desde `Login` hacia `App`.

------------------------------------------------------------------------
<a name="diseño-y-ux"></a>
# 🎨 Diseño y UX

El diseño de **PawCare** busca una estética **Pet-Friendly**.

### Interfaz cálida

Uso de **colores tierra y tonos naranjas orgánicos**.

### Glassmorphism

Efectos de **desenfoque en la navegación** para un estilo moderno.

### Responsive Design

Grid adaptable:

-   1 columna en móvil
-   2 columnas en tablet
-   3 columnas en escritorio

### Feedback visual

-   Botones con efectos **hover**
-   Transiciones suaves

------------------------------------------------------------------------
<a name="como-ejecutar-el-proyecto"></a>
# ▶ Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio

``` bash
git clone https://github.com/TU_USUARIO/pawcare.git
```

### 2️⃣ Instalar dependencias

``` bash
npm install
```

### 3️⃣ Ejecutar en modo desarrollo

``` bash
npm run dev
```

------------------------------------------------------------------------
<a name="estado-del-proyecto"></a>
# 📌 Estado del Proyecto

✔ **MVP Completo**\
Sistema de login y visualización de API funcional.

✔ **Consumo de API**\
Integración exitosa con JSONPlaceholder.

✔ **Navegación SPA**\
Transiciones entre vistas sin recarga de página.

------------------------------------------------------------------------

# 👩‍💻 Autor

Este proyecto fue desarrollado por **Gloria Cornelio** como
parte del programa de formación en **Desarrollo Frontend**.

------------------------------------------------------------------------

# 📄 Licencia

Este proyecto es **open source con fines educativos**.\
Puedes clonarlo, estudiarlo y mejorarlo libremente. 🐾
