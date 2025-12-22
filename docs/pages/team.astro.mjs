import { c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_DSUpihBA.mjs';
import 'kleur/colors';
import { $ as $$Features2 } from '../chunks/Features2_o8cGMb-i.mjs';
import { a as $$PageLayout } from '../chunks/PageLayout_dlFw0N0L.mjs';
export { renderers } from '../renderers.mjs';

const $$Team = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Team"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Features2", $$Features2, { "title": "Our Team", "subtitle": "Expert-led AI Platform Engineering", "items": [
    {
      title: "Juan Carlos Garcia Pelaez",
      description: "Founder & Cloud Native AI Platform Engineer with 25+ years of IT Architecture experience. Specializing in KServe, Gateway API, MLOps, and production AI infrastructure on Kubernetes. Certified Kubernetes Administrator (CKA) and AWS/GCP certified.",
      icon: "tabler:user",
      callToAction: {
        text: "LinkedIn Profile",
        href: "https://www.linkedin.com/in/juancarlosgpelaez/",
        target: "_blank"
      }
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}` })} ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/team.astro", void 0);

const $$file = "/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/team.astro";
const $$url = "/team";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Team,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
