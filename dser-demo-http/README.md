# dser-demo-http

## Descripción
Pequeña aplicación Node.js que consta de un frontend simple (HTML) y un backend Express. Permite ver cómo funciona una consulta condicional mediante ETag:

- El backend genera y devuelve un recurso (por ejemplo, HTML o JSON) junto con un encabezado `ETag`.
- El cliente puede volver a solicitar el recurso usando `If-None-Match`: si no ha cambiado, el servidor responde `304 Not Modified`; si cambió, responde `200 OK` con el nuevo contenido.

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/sdominguez/dser-demo-http.git
   cd dser-demo-http
   ```

2. Instala dependencias del backend y del frontend:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

---

## ¿Qué es ETag y cómo funciona?

Un **ETag** (Entity Tag) es un identificador único que representa el contenido de un recurso. Se usa para optimizar las solicitudes y ahorrar ancho de banda:

- Si el cliente manda el mismo ETag con `If-None-Match`, y el servidor detecta que el contenido no cambió, responde con `304 Not Modified` (sin cuerpo).
- Si cambió, se devuelve `200 OK` con el nuevo contenido y un nuevo ETag.

Esto es útil tanto para **caché eficiente** como para **integridad de datos** y evitar colisiones de actualización.

---

## Enlaces útiles

- [Guía de HTTP conditional requests (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests)
- [Documentación del encabezado ETag (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)

---

## Licencia

Proyecto de ejemplo para uso educativo.
