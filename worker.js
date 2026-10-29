// Servidor intermedio OPCIONAL (Cloudflare Workers, plan gratuito).
// Sirve para que la clave del buscador NO quede en el navegador y para evitar bloqueos CORS.
// Uso en la app: ⚙️ Ajustes → "Servidor intermedio" = la URL de tu Worker.
// Secretos a crear en Cloudflare (Settings → Variables → Secrets): TAVILY_KEY, SERPER_KEY, EXA_KEY, JINA_KEY (solo los que uses).
// Opcional: ALLOWED_ORIGIN = https://TU_USUARIO.github.io  (para que solo tu página pueda usarlo).
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const u = new URL(req.url), q = u.searchParams.get('q') || '', p = u.searchParams.get('p') || 'tavily';
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'content-type': 'application/json' } });
    if (!q) return json({ error: 'falta q' }, 400);
    let r;
    if (p === 'tavily')
      r = await fetch('https://api.tavily.com/search', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + env.TAVILY_KEY }, body: JSON.stringify({ query: q, max_results: 5, include_answer: true, search_depth: 'basic' }) });
    else if (p === 'serper')
      r = await fetch('https://google.serper.dev/search', { method: 'POST', headers: { 'X-API-KEY': env.SERPER_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ q, hl: 'es', num: 5 }) });
    else if (p === 'exa')
      r = await fetch('https://api.exa.ai/search', { method: 'POST', headers: { 'x-api-key': env.EXA_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ query: q, numResults: 5, contents: { text: { maxCharacters: 400 } } }) });
    else if (p === 'jina')
      r = await fetch('https://s.jina.ai/?q=' + encodeURIComponent(q), { headers: { Authorization: 'Bearer ' + env.JINA_KEY, Accept: 'application/json' } });
    else return json({ error: 'proveedor desconocido' }, 400);
    return new Response(r.body, { status: r.status, headers: { ...cors, 'content-type': 'application/json' } });
  },
};
