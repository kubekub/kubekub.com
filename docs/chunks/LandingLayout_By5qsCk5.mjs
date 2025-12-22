import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, f as renderSlot } from './astro/server_DSUpihBA.mjs';
import 'kleur/colors';
import { a as $$PageLayout, c as $$Header, h as headerData } from './PageLayout_dlFw0N0L.mjs';

const $$Astro = createAstro("https://Kubekub.vercel.app");
const $$LandingLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LandingLayout;
  const { metadata } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderSlot($$result2, $$slots["default"])} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["header"], renderTemplate` ${renderComponent($$result3, "Header", $$Header, { "links": headerData?.links[2] ? [headerData.links[2]] : void 0, "actions": [
    {
      text: "Download",
      href: "https://github.com/arthelokyo/Kubekub"
    }
  ], "showToggleTheme": true, "position": "right" })} `)} ` })}` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/layouts/LandingLayout.astro", void 0);

export { $$LandingLayout as $ };
