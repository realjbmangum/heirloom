globalThis.process ??= {}; globalThis.process.env ??= {};
import { q as decodeKey } from './chunks/astro/server_DBiZJRUQ.mjs';
import './chunks/astro-designed-error-pages_CMm7lYD2.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_CdA5YnOH.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jbm/new-project/app-heirloom/apps/landing/","cacheDir":"file:///Users/jbm/new-project/app-heirloom/apps/landing/node_modules/.astro/","outDir":"file:///Users/jbm/new-project/app-heirloom/apps/landing/dist/","srcDir":"file:///Users/jbm/new-project/app-heirloom/apps/landing/src/","publicDir":"file:///Users/jbm/new-project/app-heirloom/apps/landing/public/","buildClientDir":"file:///Users/jbm/new-project/app-heirloom/apps/landing/dist/","buildServerDir":"file:///Users/jbm/new-project/app-heirloom/apps/landing/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/waitlist","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/waitlist\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"waitlist","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/waitlist.ts","pathname":"/api/waitlist","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://theheirloom.site","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jbm/new-project/app-heirloom/apps/landing/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/jbm/new-project/app-heirloom/apps/landing/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jbm/new-project/app-heirloom/apps/landing/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["/Users/jbm/new-project/app-heirloom/apps/landing/src/pages/terms.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/waitlist@_@ts":"pages/api/waitlist.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_sXkfCAK5.mjs","/Users/jbm/new-project/app-heirloom/apps/landing/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Users/jbm/new-project/app-heirloom/apps/landing/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DcBpjfyj.mjs","/Users/jbm/new-project/app-heirloom/apps/landing/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BJGlDrN1.js","/Users/jbm/new-project/app-heirloom/apps/landing/src/components/WaitlistForm.astro?astro&type=script&index=0&lang.ts":"_astro/WaitlistForm.astro_astro_type_script_index_0_lang.DjlUl2NC.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/jbm/new-project/app-heirloom/apps/landing/src/components/Header.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"mobile-menu-btn\"),e=document.getElementById(\"mobile-menu\"),s=document.getElementById(\"menu-icon-open\"),d=document.getElementById(\"menu-icon-close\");n?.addEventListener(\"click\",()=>{const t=e?.classList.contains(\"hidden\");e?.classList.toggle(\"hidden\"),s?.classList.toggle(\"hidden\"),d?.classList.toggle(\"hidden\"),n.setAttribute(\"aria-expanded\",t?\"true\":\"false\")});e?.querySelectorAll(\"a\").forEach(t=>{t.addEventListener(\"click\",()=>{e.classList.add(\"hidden\"),s?.classList.remove(\"hidden\"),d?.classList.add(\"hidden\"),n?.setAttribute(\"aria-expanded\",\"false\")})});"],["/Users/jbm/new-project/app-heirloom/apps/landing/src/components/WaitlistForm.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"waitlist-form\"),a=document.getElementById(\"email-input\"),e=document.getElementById(\"submit-btn\"),d=document.getElementById(\"success-message\"),n=document.getElementById(\"error-message\");s?.addEventListener(\"submit\",async i=>{i.preventDefault();const t=a.value;if(t){e.disabled=!0,e.textContent=\"Joining...\",n?.classList.add(\"hidden\");try{if((await fetch(\"/api/waitlist\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:t})})).ok)s.classList.add(\"hidden\"),d?.classList.remove(\"hidden\");else throw new Error(\"Failed to join waitlist\")}catch{n?.classList.remove(\"hidden\"),e.disabled=!1,e.textContent=\"Join Waitlist\"}}});"]],"assets":["/_astro/about.CqQfRZfu.css","/_headers","/favicon.svg","/heirloom1.mp4","/heirloom2.mp4","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/_worker.js/_astro/about.CqQfRZfu.css","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/about.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/privacy.astro.mjs","/_worker.js/pages/terms.astro.mjs","/_worker.js/chunks/Footer_DcWAqMEc.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_753tSWRD.mjs","/_worker.js/chunks/astro-designed-error-pages_CMm7lYD2.mjs","/_worker.js/chunks/astro_BVToPCQC.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/image-endpoint_Bw86mCzA.mjs","/_worker.js/chunks/index_DooHWiN9.mjs","/_worker.js/chunks/noop-middleware_CdA5YnOH.mjs","/_worker.js/chunks/path_CH3auf61.mjs","/_worker.js/chunks/remote_CrdlObHx.mjs","/_worker.js/chunks/sharp_DcBpjfyj.mjs","/_worker.js/pages/api/waitlist.astro.mjs","/_worker.js/chunks/astro/server_DBiZJRUQ.mjs","/about/index.html","/privacy/index.html","/terms/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"+1l3cFWmdL/KYBFVdReJLg1gtp9oG2Nsh92VeORFgaY=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
