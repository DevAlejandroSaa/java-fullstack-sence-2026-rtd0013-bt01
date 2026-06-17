# 💳 Billetera Digital

## 📌 Consigna

Continuamos con nuestra wallet. La idea es incorporar dinamismo utilizando **jQuery** en las pantallas de:

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

### Uso de Selectores jQuery

Utilizar selectores de jQuery para obtener los valores de los campos del formulario.

Ejemplo:

```javascript
$('#email').val();
$('#password').val();
```

En lugar de utilizar:

```javascript
document.getElementById('email').value;
document.getElementById('password').value;
```

### Envío del formulario con jQuery

Reemplazar el evento tradicional del formulario por un evento utilizando jQuery.

Ejemplo:

```javascript
$('#loginForm').submit(...)
```

### Redirección

Después de una autenticación exitosa, redirigir al usuario al menú principal.

Ejemplo:

```javascript
window.location.href = '../HTML/menu.html';
```

### Alertas Bootstrap

Reemplazar las alertas tradicionales de JavaScript por alertas de Bootstrap para mostrar:

- Mensajes de éxito
- Mensajes de error

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

Implementar la redirección mediante JavaScript hacia la pantalla correspondiente.

---

# 💰 Pantalla de Depósito (`deposit.html`)

## Requisitos

### Mostrar saldo actual

Al cargar la página:

- Obtener el saldo actual desde Local Storage utilizando jQuery.
- Mostrar el saldo disponible antes de realizar un depósito.

### Mostrar monto depositado

Después de realizar un depósito:

- Mostrar una leyenda debajo del formulario indicando el monto depositado.
- Utilizar jQuery para agregar esta información dinámicamente.

### Mensaje de éxito

Mostrar una alerta Bootstrap generada dinámicamente mediante jQuery.

La alerta debe agregarse dentro de:

```html
<div id="alert-container"></div>
```

### Redirección automática

Después de realizar el depósito:

- Esperar 2 segundos.
- Redirigir automáticamente al menú principal utilizando:

```javascript
setTimeout(...)
```

---

# 💸 Pantalla de Envío de Dinero (`sendmoney.html`)

## Requisitos

### Mostrar y ocultar formulario de contactos

Al presionar:

- **Agregar nuevo contacto**

Mostrar un formulario para registrar contactos.

Al presionar:

- **Cancelar**

Ocultar nuevamente el formulario.

### Validación de contactos

Validar los campos del formulario antes de guardar la información.

Verificar:

- Campos obligatorios.
- Formato correcto del número de CBU.

### Búsqueda de contactos

Implementar una funcionalidad que permita buscar contactos mediante:

- Nombre
- Alias

La búsqueda debe filtrar dinámicamente los resultados mostrados.

### Mostrar y ocultar botón de envío

El botón:

- **Enviar dinero**

Debe mostrarse únicamente cuando exista un contacto seleccionado.

Además:

- Resaltar visualmente el contacto seleccionado.

### Confirmación de transferencia

Después de enviar dinero:

- Mostrar un mensaje de confirmación.
- Indicar que la operación fue realizada exitosamente.

---

# 📄 Pantalla de Últimos Movimientos (`transactions.html`)

## Requisitos

### Reemplazar lista estática

Reemplazar la lista codificada directamente en HTML por una lista de transacciones obtenida dinámicamente.

Ejemplo:

```javascript
const listaTransacciones = [];
```

### Filtro por tipo de movimiento

Agregar un campo `<select>` para filtrar movimientos por tipo.

Tipos sugeridos:

- Compra
- Depósito
- Transferencia recibida

### Actualización dinámica

Cada vez que el usuario cambie el filtro:

- Mostrar únicamente las transacciones correspondientes al tipo seleccionado.

Ejemplo:

```javascript
mostrarUltimosMovimientos(filtro);
```

### Formato legible

Utilizar una función auxiliar para obtener el nombre legible del tipo de movimiento.

Ejemplo:

```javascript
getTipoTransaccion(tipo);
```

---

# ⚙️ Interactividad con JavaScript y jQuery

## Manejo de eventos

Capturar eventos de:

- Formularios
- Botones
- Campos de búsqueda
- Selectores

utilizando JavaScript y jQuery.

## Validaciones

Validar todos los formularios antes de procesar los datos.

Ejemplos:

- Inicio de sesión
- Contactos
- Transferencias
- Depósitos

## Actualización dinámica

Actualizar dinámicamente la información de la aplicación cuando se realicen acciones como:

- Depósitos
- Transferencias
- Registro de contactos
- Visualización de movimientos

---

# 🎨 Personalización de la Interfaz

## CSS y Bootstrap

Utilizar:

- CSS
- Bootstrap
- jQuery

para mejorar la experiencia visual de la aplicación.

### Consideraciones

- Diseño responsive.
- Interfaz atractiva.
- Navegación clara.
- Uso de componentes Bootstrap.
- Mensajes visuales amigables para el usuario.

---

# ✅ Objetivo

Incorporar jQuery a la billetera digital para simplificar la manipulación del DOM, el manejo de eventos y la interacción con el usuario, mejorando la experiencia visual mediante componentes Bootstrap y actualizaciones dinámicas de la información.

---

## 🔎 Referencia

✅ Solución: `link`

Utilizar la solución proporcionada para comparar las pantallas y validar el resultado obtenido.