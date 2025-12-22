import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DSUpihBA.mjs';
import 'kleur/colors';
import { $ as $$Hero } from '../chunks/Hero_BLCyxNBJ.mjs';
import { a as $$PageLayout } from '../chunks/PageLayout_dlFw0N0L.mjs';
export { renderers } from '../renderers.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Services"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "tagline": "Services", "title": "Elevate your projects with our stunning templates", "subtitle": "Explore our meticulously crafted templates tailored to various industries and purposes. From captivating presentations to functional website designs, we offer the tools you need to succeed.", "actions": [], "image": {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    alt: "Kubekub Hero Image"
  } })} ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/services.astro", void 0);

const $$file = "/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
