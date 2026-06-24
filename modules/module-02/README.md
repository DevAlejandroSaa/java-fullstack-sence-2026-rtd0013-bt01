# 🚀 Bootcamp Java Fullstack SENCE 2026

## 📚 Descripción general

Este repositorio contiene el desarrollo del **Módulo 02** del Bootcamp Fullstack Java, enfocado en la construcción progresiva de una **Billetera Digital**, junto con ejercicios de evaluación y proyectos adicionales de práctica.

## 📁 Estructura del proyecto

```
module-02/
│
├── 🕸️ web-marvel
├── 📁 portafolio
├── 💳 billetera-digital
├── 🧪 evaluacion
└── README.md
```

## 🕸️ Web Marvel

Proyecto de práctica consumiendo o simulando contenido tipo catálogo:

- Página única (SPA simple)
- Diseño temático Marvel

## 📁 Portafolio

Proyecto simple de presentación personal:

- Página principal HTML
- Estilos personalizados
- Imagen de proyecto

## 💳 Billetera Digital

Proyecto principal del módulo, desarrollado en 3 etapas evolutivas:

### 🧱 01 - Maquetación (HTML + CSS)
- Login
- Menú principal
- Depósitos
- Transferencias
- Transacciones

### ⚙️ 02 - JavaScript ES6
- Autenticación simulada
- Manejo de estado (store.js)
- Depósitos y transferencias
- Render dinámico de transacciones
- Utilidades comunes

### 🧩 03 - jQuery 4
- Manipulación del DOM simplificada
- Eventos con jQuery
- Reutilización de lógica
- Mejor organización del frontend

### 🐳 Docker
- docker-compose.yml
- default.conf
- scripts start.sh / stop.sh

## 🧪 Evaluación

Proyecto de evaluación del módulo con frontend completo y entorno Dockerizado.

### Características:
- UI funcional completa
- Gestión de usuarios simulada
- Flujo de transferencias
- Persistencia en frontend (mock)

## 🛠️ Tecnologías utilizadas

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="30"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="30"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="30"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" width="30"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="30"/>
</p>

## 🚀 Cómo ejecutar

### 💳 Billetera Digital (Docker)

### ⚙️ Configuración de versión

En el archivo `docker-compose.yml`, debes modificar la siguiente línea:

```yaml
"./${WEB_03}:/usr/share/nginx/html"

🔧 Solo debes cambiar el número de la variable:

- 01 → 01-,aquetacion
- 02 → 02-javascript
- 03 → 03-jquery
```
---

### 🐳 Levantar y detener el proyecto

```md id="run_fix_04"
### 🐳 Levantar y detener Billetera Digital

bash
# Levantar contenedores
./start.sh

# Detener contenedores
./stop.sh
```

---

### 🧪 Evaluación

```md id="run_fix_05"
### 🧪 Levantar y detener Evaluación

bash
# Levantar contenedores
./start.sh

# Detener contenedores
./stop.sh
```

## 🌐 Acceso a la aplicación

Una vez levantado el proyecto con Docker:

👉 http://localhost:8080/

### 📄 Navegación por páginas

Puedes acceder directamente a las vistas desde el navegador:

| Página | URL |
|--------|-----|
| 🔐 Login | http://localhost:8080/pages/login.html |
| 🏠 Menú principal | http://localhost:8080/pages/menu.html |
| 💰 Depósitos | http://localhost:8080/pages/deposit.html |
| 💸 Enviar dinero | http://localhost:8080/pages/sendmoney.html |
| 📊 Últimos movimientos | http://localhost:8080/pages/transactions.html |