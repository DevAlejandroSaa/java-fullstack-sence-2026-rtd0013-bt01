# 💳 Billetera Digital

## 📌 Consigna

Continuamos con nuestra wallet. La idea es incorporar dinamismo a las pantallas de:

- Inicio de sesión
- Menú principal
- Depósito
- Envío de dinero
- Últimos movimientos

---

# 📋 Instrucciones

## 🏗️ Estructura de la Aplicación

La aplicación debe incluir las siguientes pantallas:

| Archivo | Descripción |
|----------|-------------|
| `login.html` | Pantalla de inicio de sesión |
| `menu.html` | Pantalla del menú principal |
| `deposit.html` | Pantalla de depósito |
| `sendmoney.html` | Pantalla de envío de dinero |
| `transactions.html` | Pantalla de últimos movimientos |

---

# 🔐 Pantalla de Inicio de Sesión (`login.html`)

## Requisitos

### Inicio de sesión

- Agregar un evento al botón:
  - **Iniciar sesión**

### Validación de credenciales

Implementar la funcionalidad de validar las credenciales ingresadas utilizando JavaScript.

#### Si las credenciales son correctas

- Mostrar un mensaje de éxito.
- Redirigir a:
  - `menu.html`

#### Si las credenciales son incorrectas

- Mostrar un mensaje de error.

### Navegación

- El botón de acceso al menú principal no debe mostrarse en la pantalla de inicio de sesión.
- El acceso al menú principal debe realizarse únicamente mediante un inicio de sesión exitoso.

---

# 🏠 Pantalla del Menú Principal (`menu.html`)

## Requisitos

### Eventos de navegación

Agregar eventos a los siguientes botones:

- **Depositar**
- **Enviar Dinero**
- **Últimos Movimientos**

### Mensaje de redirección

Al hacer clic en cualquiera de los botones, mostrar una leyenda indicando la pantalla seleccionada.

**Ejemplo:**

> Redirigiendo a Últimos Movimientos

### Navegación

Implementar la funcionalidad mediante JavaScript para redirigir a las pantallas correspondientes.

---

# 💰 Pantalla de Depósito (`deposit.html`)

## Requisitos

### Depósito

Agregar un evento al botón:

- **Realizar depósito**

### Actualización de saldo

Implementar la funcionalidad para:

- Obtener el monto ingresado.
- Incrementar el saldo actual de la cuenta.
- Actualizar el saldo mostrado en el menú principal.
- Mostrar el nuevo saldo después de realizar el depósito.

---

# 💸 Pantalla de Envío de Dinero (`sendmoney.html`)

## Requisitos

### Gestión de contactos

Agregar un evento al botón:

- **Agregar nuevo contacto**

### Formulario emergente

Al presionar el botón, abrir un formulario emergente para registrar nuevos contactos.

### Datos requeridos

El formulario debe solicitar:

- Nombre y apellido
- Número de CBU
- Alias
- Nombre del banco

### Envío de dinero

Al seleccionar un contacto y hacer clic en:

- **Enviar dinero**

Se debe:

- Mostrar un mensaje de confirmación.
- Actualizar el saldo de la cuenta.
- Reflejar el nuevo saldo en el menú principal.

---

# 📄 Pantalla de Últimos Movimientos (`transactions.html`)

## Requisitos

### Historial de movimientos

Mostrar una lista con los movimientos realizados.

### Información mostrada

La lista debe reflejar los detalles de las últimas operaciones efectuadas por el usuario.

---

# ⚙️ Interactividad con JavaScript

## Manejo de eventos

Capturar los eventos de:

- Formularios
- Botones

utilizando JavaScript.

## Validaciones

Validar los campos de los formularios antes de procesar la información.

## Actualización dinámica

Actualizar dinámicamente la información mostrada en la aplicación cuando se realicen acciones como:

- Depósitos
- Envíos de dinero
- Registro de movimientos

---

# 🎨 Personalización de la Interfaz

## CSS y Bootstrap

Utilizar:

- CSS
- Bootstrap

para personalizar la apariencia de las pantallas.

### Consideraciones

- Diseños atractivos.
- Diseño responsive.
- Navegación clara entre pantallas.
- Compatibilidad con distintos tamaños de pantalla.

---

# ✅ Objetivo

Incorporar interactividad a la billetera digital mediante JavaScript, permitiendo validar accesos, gestionar depósitos, realizar transferencias, registrar movimientos y actualizar dinámicamente la información mostrada al usuario.

---

## 🔎 Referencia

👉 Solución: `link`

Utilizar la solución proporcionada para comparar las pantallas y validar el resultado obtenido.