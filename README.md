# E-commerce Mueblería Hermanos Jota
## Grupo 11 – Code Breakers

- Fabrizio, Jazmin Maia  
- Gentille, Agostina Abril  
- Giménez, Agustín José  
- Insaurralde, Mariano Gastón  
- Vila, Juan Manuel

---

## Introducción

Este proyecto corresponde al desarrollo del e-commerce “Mueblería Hermanos Jota” del programa NEXUS. En esta etapa se integran todas las funcionalidades esenciales para completar el flujo de compra de un usuario, incorporando autenticación, roles, rutas protegidas, persistencia de carrito, CRUD completos y una experiencia de navegación más robusta.  
El trabajo extiende lo realizado en los sprints previos y consolida la estructura general de la aplicación bajo el stack MERN.

---

## Tecnologías utilizadas

### Frontend
- React  
- React Router  
- Context API (Autenticación, Carrito, Tema)  
- CSS  
- JWT Decode  
- Fetch API  

### Backend
- Node.js con Express  
- MongoDB Atlas y Mongoose  
- JSON Web Token (JWT)  
- bcryptjs  
- dotenv  
- Middleware reCAPTCHA (Google)

---

## Descripción del desarrollo

### Autenticación y roles

Se implementó un sistema de registro e inicio de sesión con encriptación de contraseñas utilizando bcrypt.  
La autenticación se gestiona mediante JWT y permite proteger rutas del backend según el rol del usuario.  
Los roles definidos son:
- visitante (predeterminado)
- editor
- administrador

El frontend integra AuthContext para mantener el estado de sesión, validar tokens y ofrecer distintas vistas según el rol.

---

### Gestión de productos, categorías y usuarios

Dentro del panel administrativo se desarrollaron las siguientes funcionalidades:

- Alta, baja y modificación de productos.  
- CRUD de categorías.  
- Listado de usuarios y modificación de roles.  
- Visualización de compras registradas en el sistema.

Estas funcionalidades están restringidas a usuarios con rol editor o administrador.

---

### Carrito de compras y flujo de compra

El carrito se implementó utilizando Context API, permitiendo gestionar cantidades, totales y costo de envío.  
El contenido del carrito se guarda localmente y en el backend asociado a cada usuario autenticado.  

El flujo de compra incluye:
- Completado de datos personales y de envío.  
- Generación de una compra en MongoDB con número de pedido secuencial.  
- Vaciamiento del carrito una vez finalizada la compra.  
- Sección “Mis compras” donde el usuario visualiza todas sus operaciones realizadas.

---

### Formulario de contacto y validación

Se creó un formulario de contacto con envío al backend.  
Para evitar envíos automatizados se implementó verificación mediante Google reCAPTCHA.  
Los datos se validan desde backend y se descartan solicitudes inválidas.

---

### Interfaz general y navegación

Se mejoró la estructura de la aplicación incorporando:
- Tema claro/oscuro configurable.  
- Carrito lateral visible en todas las páginas.  
- Vista de detalle de producto.  
- Filtros por categoría en la sección de productos.  
- Página de error 404 para rutas inexistentes.

---

## Estructura del proyecto

```text
HermanosJota/
├─ backend/
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
│
├─ client/
│  ├─ public/
│  └─ src/
│     ├─ components/
│     ├─ context/
│     ├─ pages/
│     ├─ styles/
│     ├─ config/
│     └─ App.js
│
└─ README.md
```

---

## Ejecución en entorno local

1. Clonar el repositorio
2. Instalar dependencias
    * Backend:
        * `cd backend`
        * `npm install`
    * Frontend:
        * `cd client`
        * `npm install`
3. Configurar variables de entorno
    * backend/.env
        * `PORT=4000`
        * `MONGO_URI=tu_cadena_de_mongodb_atlas`
        * `JWT_SECRET=tu_clave_jwt_segura`
        * `RECAPTCHA_SECRET=tu_clave_secreta_recaptcha`
    * client/.env
        * `REACT_APP_API_URL=http://backend/api`
        * `REACT_APP_RECAPTCHA_SITE_KEY=tu_site_key_recaptcha`
4. Iniciar los servidores
    * `Backend: npm run dev`
    * `Frontend: npm start`
