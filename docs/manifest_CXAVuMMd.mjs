import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_DSUpihBA.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/juanpelaez/gitkubekub/kubekub.com/","cacheDir":"file:///Users/juanpelaez/gitkubekub/kubekub.com/node_modules/.astro/","outDir":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/","srcDir":"file:///Users/juanpelaez/gitkubekub/kubekub.com/src/","publicDir":"file:///Users/juanpelaez/gitkubekub/kubekub.com/public/","buildClientDir":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/client/","buildServerDir":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/server/","adapterName":"","routes":[{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/click-through/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/landing/click-through","isIndex":false,"type":"page","pattern":"^\\/landing\\/click-through$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"click-through","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/click-through.astro","pathname":"/landing/click-through","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/lead-generation/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/landing/lead-generation","isIndex":false,"type":"page","pattern":"^\\/landing\\/lead-generation$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"lead-generation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/lead-generation.astro","pathname":"/landing/lead-generation","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/pre-launch/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/landing/pre-launch","isIndex":false,"type":"page","pattern":"^\\/landing\\/pre-launch$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"pre-launch","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/pre-launch.astro","pathname":"/landing/pre-launch","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/product/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/landing/product","isIndex":false,"type":"page","pattern":"^\\/landing\\/product$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"product","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/product.astro","pathname":"/landing/product","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/sales/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/landing/sales","isIndex":false,"type":"page","pattern":"^\\/landing\\/sales$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"sales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/sales.astro","pathname":"/landing/sales","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/subscription/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/landing/subscription","isIndex":false,"type":"page","pattern":"^\\/landing\\/subscription$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"subscription","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/subscription.astro","pathname":"/landing/subscription","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/team/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/team","isIndex":false,"type":"page","pattern":"^\\/team$","segments":[[{"content":"team","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/team.astro","pathname":"/team","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"site":"https://Kubekub.vercel.app","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/utils/blog.ts",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/components/blog/RelatedPosts.astro",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/[...blog]/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/components/widgets/BlogHighlightedPosts.astro",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/[...blog]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/[...blog]/[category]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/[...blog]/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/landing/click-through.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/landing/lead-generation.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/landing/pre-launch.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/landing/product.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/landing/sales.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/landing/subscription.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/services.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/team.astro",{"propagation":"none","containsHead":true}],["/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/404.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/landing/click-through@_@astro":"pages/landing/click-through.astro.mjs","\u0000@astro-page:src/pages/landing/lead-generation@_@astro":"pages/landing/lead-generation.astro.mjs","\u0000@astro-page:src/pages/landing/pre-launch@_@astro":"pages/landing/pre-launch.astro.mjs","\u0000@astro-page:src/pages/landing/product@_@astro":"pages/landing/product.astro.mjs","\u0000@astro-page:src/pages/landing/sales@_@astro":"pages/landing/sales.astro.mjs","\u0000@astro-page:src/pages/landing/subscription@_@astro":"pages/landing/subscription.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/team@_@astro":"pages/team.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro":"pages/_---blog_/_category_/_---page_.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro":"pages/_---blog_/_tag_/_---page_.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro":"pages/_---blog_/_---page_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/[...blog]/index@_@astro":"pages/_---blog_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_CXAVuMMd.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/src/assets/images/app-store.png":"chunks/app-store_DzuLIXaQ.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/src/assets/images/default.png":"chunks/default_Bsv9ohuT.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/src/assets/images/google-play.png":"chunks/google-play_Bwp7DM9N.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/src/assets/images/hero-image.png":"chunks/hero-image_BpGopvEq.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/src/assets/images/kubekub-logo.png":"chunks/kubekub-logo_CGKOTuWN.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DBV2BRI_.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_3VTz890Y.mjs","/Users/juanpelaez/gitkubekub/kubekub.com/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","/Users/juanpelaez/gitkubekub/kubekub.com/src/components/ui/Form.astro?astro&type=script&index=0&lang.ts":"_astro/Form.astro_astro_type_script_index_0_lang.DpclRxQ4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/juanpelaez/gitkubekub/kubekub.com/src/components/ui/Form.astro?astro&type=script&index=0&lang.ts","const o=document.getElementById(\"contactForm\");o&&o.addEventListener(\"submit\",n=>{n.preventDefault();const e=new FormData(o),t=e.get(\"name\")||\"No name\",m=e.get(\"email\")||\"\",a=e.get(\"message\")||\"\",s=`Name: ${t}\nEmail: ${m}\n\nMessage:\n${a}`,c=`New Contact Form Submission from ${t}`,i=`mailto:hello@kubekub.com?subject=${encodeURIComponent(c)}&body=${encodeURIComponent(s)}`;window.location.href=i});"]],"assets":["/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/404.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/contact/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/click-through/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/lead-generation/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/pre-launch/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/product/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/sales/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/landing/subscription/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/rss.xml","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/services/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/team/index.html","/file:///Users/juanpelaez/gitkubekub/kubekub.com/docs/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"Feoh1OoiG1vZhD5jIOfiwn3XI/GxUMiCHbpWqj5yVTs="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
