// Claves de API de ESTA app. No se piden a quien la usa: se editan aquí y se vuelve a subir.
// Ojo: si el repositorio es público, estas claves se pueden ver. Para claves de pago o de uso limitado,
// mejor usa el servidor intermedio (servidor-intermedio/worker.js) y deja aquí solo su dirección.
window.CLAVES = {
  nasa: 'ndwBwK8tT9Wc7DKJwpzzhR6BWNwQGKhhCQFNhzbK', // api.nasa.gov (gratuita)
  buscador: 'tavily',   // para las preguntas: tavily | serper | exa | jina
  tavily: '',           // clave de Tavily (1.000 búsquedas gratis al mes)
  serper: '',           // clave de Serper (2.500 búsquedas gratis)
  exa: '',              // clave de Exa
  jina: '',             // clave de Jina
  servidor: '',         // opcional: dirección de tu servidor intermedio (Cloudflare Worker)
  mymemory: '',         // opcional: tu correo; sube 10 veces el límite diario de traducción
  google: ''            // opcional: clave de Google Books (agrega más libros gratis)
};
