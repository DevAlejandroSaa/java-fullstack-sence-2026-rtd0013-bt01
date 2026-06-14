# 💳 Billetera Digital

## 📌 Consigna

Implementar interactividad en la interfaz de la billetera digital.

La idea es mostrar una estructura básica de una wallet con las siguientes pantallas:

- Inicio de sesión
- Menú principal
- Depósito
- Envío de dinero
- Últimos movimientos

---

# 📋 Instrucciones

## 🏗️ Estructura de la Aplicación

Crear una billetera digital básica que incluya las siguientes pantallas:

| Archivo | Descripción |
|----------|-------------|
| `login.html` | Pantalla de inicio de sesión |
| `menu.html` | Pantalla del menú principal |
| `deposit.html` | Pantalla de depósito |
| `sendmoney.html` | Pantalla de envío de dinero |
| `transactions.html` | Pantalla de últimos movimientos |

---

# 🔐 Pantalla de Inicio de Sesión (`login.html`)

### Requisitos

- Agregar un encabezado `<h2>` con el texto:
  - **Inicio de sesión**

- Crear un formulario con dos campos:
  - Email
  - Contraseña

- Agregar un botón:
  - **Iniciar sesión**

---

# 🏠 Pantalla del Menú Principal (`menu.html`)

### Requisitos

- Agregar un encabezado `<h2>` con el texto:
  - **Menú Principal**

- Mostrar el saldo actual de la cuenta del usuario.

- Agregar los siguientes botones:
  - **Depositar**
  - **Enviar Dinero**
  - **Últimos Movimientos**

- Implementar la funcionalidad con HTML para redirigir a las pantallas correspondientes.

---

# 💰 Pantalla de Depósito (`deposit.html`)

### Requisitos

- Agregar un encabezado `<h2>` con el texto:
  - **Depositar**

- Crear un formulario con un campo para ingresar el monto a depositar.

- Agregar un botón:
  - **Realizar depósito**

---

# 💸 Pantalla de Envío de Dinero (`sendmoney.html`)

### Requisitos

- Agregar un encabezado `<h2>` con el texto:
  - **Enviar Dinero**

- Crear un formulario que contenga:
  - Un campo para buscar en la agenda de transferencias.
  - Un botón **Buscar**.

- Agregar un botón:
  - **Agregar nuevo contacto**

- Este botón debe abrir un formulario emergente donde se puedan agregar nuevos contactos.

---

# 📄 Pantalla de Últimos Movimientos (`transactions.html`)

### Requisitos

- Agregar un encabezado `<h2>` con el texto:
  - **Últimos Movimientos**

- Mostrar una lista de los últimos movimientos realizados en la cuenta.

- Agregar un botón:
  - **Volver al Menú Principal**

- Este botón debe regresar a la pantalla principal.

---

# 🎨 Personalización de la Interfaz

## CSS y Bootstrap

Personalizar la apariencia de cada pantalla utilizando:

- CSS
- Bootstrap

### Aplicar estilos a:

- Encabezados
- Formularios
- Botones
- Elementos de la lista

### Diseño Responsive

Utilizar clases de Bootstrap para:

- Crear un diseño atractivo.
- Mejorar la experiencia visual.
- Garantizar compatibilidad con distintos tamaños de pantalla.

---

# ✅ Objetivo

Desarrollar una billetera digital básica compuesta por múltiples pantallas interconectadas, aplicando HTML, CSS y Bootstrap para crear una interfaz funcional, visualmente atractiva y responsive.