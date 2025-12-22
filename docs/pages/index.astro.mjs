import { d as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, u as unescapeHTML, F as Fragment, a as renderTemplate, b as addAttribute } from '../chunks/astro/server_DSUpihBA.mjs';
import 'kleur/colors';
import { d as $$Icon, $ as $$Button, b as $$Image, a as $$PageLayout } from '../chunks/PageLayout_dlFw0N0L.mjs';
import { $ as $$Hero } from '../chunks/Hero_BLCyxNBJ.mjs';
import { $ as $$WidgetWrapper } from '../chunks/WidgetWrapper_D-XsvPyV.mjs';
import { twMerge } from 'tailwind-merge';
import { $ as $$Headline } from '../chunks/Headline_D3VVwGyB.mjs';
import { $ as $$Features2 } from '../chunks/Features2_o8cGMb-i.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_D4OaFPHt.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$7 = createAstro("https://Kubekub.vercel.app");
const $$Note = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Note;
  const {
    icon = "tabler:info-square",
    title = await Astro2.slots.render("title"),
    description = await Astro2.slots.render("description")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="bg-blue-50 dark:bg-slate-800 not-prose"> <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-md text-center font-medium"> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5 inline-block align-text-bottom font-bold" })} <span class="font-bold">${unescapeHTML(title)}</span> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(description)}` })} </div> </section>`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/widgets/Note.astro", void 0);

const $$Astro$6 = createAstro("https://Kubekub.vercel.app");
const $$ItemGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ItemGrid;
  const { items = [], columns, defaultIcon = "", classes = {} } = Astro2.props;
  const {
    container: containerClass = "",
    panel: panelClass = "",
    title: titleClass = "",
    description: descriptionClass = "",
    icon: defaultIconClass = "text-primary",
    action: actionClass = ""
  } = classes;
  return renderTemplate`${items && items.length > 0 && renderTemplate`${maybeRenderHead()}<div${addAttribute(twMerge(
    `grid mx-auto gap-8 md:gap-y-12 ${columns === 4 ? "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2" : columns === 3 ? "lg:grid-cols-3 sm:grid-cols-2" : columns === 2 ? "sm:grid-cols-2 " : ""}`,
    containerClass
  ), "class")}>${items.map(({ title, description, icon, callToAction, classes: itemClasses = {} }) => renderTemplate`<div class="intersect-once motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade"><div${addAttribute(twMerge("flex flex-row max-w-md", panelClass, itemClasses?.panel), "class")}><div class="flex justify-center">${(icon || defaultIcon) && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon || defaultIcon, "class": twMerge("w-7 h-7 mr-2 rtl:mr-0 rtl:ml-2", defaultIconClass, itemClasses?.icon) })}`}</div><div class="mt-0.5">${title && renderTemplate`<h3${addAttribute(twMerge("text-xl font-bold", titleClass, itemClasses?.title), "class")}>${title}</h3>`}${description && renderTemplate`<p${addAttribute(twMerge(`${title ? "mt-3" : ""} text-muted`, descriptionClass, itemClasses?.description), "class")}>${unescapeHTML(description)}</p>`}${callToAction && renderTemplate`<div${addAttribute(twMerge(`${title || description ? "mt-3" : ""}`, actionClass, itemClasses?.actionClass), "class")}>${renderComponent($$result, "Button", $$Button, { "variant": "link", ...callToAction })}</div>`}</div></div></div>`)}</div>`}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/ui/ItemGrid.astro", void 0);

const $$Astro$5 = createAstro("https://Kubekub.vercel.app");
const $$Features = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Features;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    items = [],
    columns = 2,
    defaultIcon,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-5xl ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": classes?.headline })} ${renderComponent($$result2, "ItemGrid", $$ItemGrid, { "items": items, "columns": columns, "defaultIcon": defaultIcon, "classes": {
    container: "",
    title: "md:text-[1.3rem]",
    icon: "text-white bg-primary rounded-full w-10 h-10 p-2 md:w-12 md:h-12 md:p-3 mr-4 rtl:ml-4 rtl:mr-0",
    ...classes?.items ?? {}
  } })} ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/widgets/Features.astro", void 0);

const $$Astro$4 = createAstro("https://Kubekub.vercel.app");
const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Timeline;
  const { items = [], classes = {}, defaultIcon } = Astro2.props;
  const {
    container: containerClass = "",
    panel: panelClass = "",
    title: titleClass = "",
    description: descriptionClass = "",
    icon: defaultIconClass = "text-primary dark:text-slate-200 border-primary dark:border-blue-700"
  } = classes;
  return renderTemplate`${items && items.length > 0 && renderTemplate`${maybeRenderHead()}<div${addAttribute(containerClass, "class")}>${items.map(({ title, description, icon, classes: itemClasses = {} }, index = 0) => renderTemplate`<div${addAttribute(twMerge(
    "flex intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade",
    panelClass,
    itemClasses?.panel
  ), "class")}><div class="flex flex-col items-center mr-4 rtl:mr-0 rtl:ml-4"><div><div class="flex items-center justify-center">${(icon || defaultIcon) && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon || defaultIcon, "class": twMerge("w-10 h-10 p-2 rounded-full border-2", defaultIconClass, itemClasses?.icon) })}`}</div></div>${index !== items.length - 1 && renderTemplate`<div class="w-px h-full bg-black/10 dark:bg-slate-400/50"></div>`}</div><div${addAttribute(`pt-1 ${index !== items.length - 1 ? "pb-8" : ""}`, "class")}>${title && renderTemplate`<p${addAttribute(twMerge("text-xl font-bold", titleClass, itemClasses?.title), "class")}>${unescapeHTML(title)}</p>`}${description && renderTemplate`<p${addAttribute(twMerge("text-muted mt-2", descriptionClass, itemClasses?.description), "class")}>${unescapeHTML(description)}</p>`}</div></div>`)}</div>`}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/ui/Timeline.astro", void 0);

const $$Astro$3 = createAstro("https://Kubekub.vercel.app");
const $$Steps = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Steps;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    items = [],
    image = await Astro2.slots.render("image"),
    isReversed = false,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-5xl ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(["flex flex-col gap-8 md:gap-12", { "md:flex-row-reverse": isReversed }, { "md:flex-row": image }], "class:list")}> <div${addAttribute(["md:py-4 md:self-center", { "md:basis-1/2": image }, { "w-full": !image }], "class:list")}> ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": {
    container: "text-left rtl:text-right",
    title: "text-3xl lg:text-4xl",
    ...classes?.headline ?? {}
  } })} ${renderComponent($$result2, "Timeline", $$Timeline, { "items": items, "classes": classes?.items })} </div> ${image && renderTemplate`<div class="relative md:basis-1/2"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "inset-0 object-cover object-top w-full rounded-md shadow-lg md:absolute md:h-full bg-gray-400 dark:bg-slate-700", "widths": [400, 768], "sizes": "(max-width: 768px) 100vw, 432px", "width": 432, "height": 768, "layout": "cover", "src": image?.src, "alt": image?.alt || "" })}`} </div>`} </div> ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/widgets/Steps.astro", void 0);

const $$Astro$2 = createAstro("https://Kubekub.vercel.app");
const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Content;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    content = await Astro2.slots.render("content"),
    callToAction,
    items = [],
    columns,
    image = await Astro2.slots.render("image"),
    isReversed = false,
    isAfterContent = false,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-7xl mx-auto ${isAfterContent ? "pt-0 md:pt-0 lg:pt-0" : ""} ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": {
    container: "max-w-xl sm:mx-auto lg:max-w-2xl",
    title: "text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-heading",
    subtitle: "max-w-3xl mx-auto sm:text-center text-xl text-muted dark:text-slate-400"
  } })} ${maybeRenderHead()}<div class="mx-auto max-w-7xl p-4 md:px-8"> <div${addAttribute(`md:flex ${isReversed ? "md:flex-row-reverse" : ""} md:gap-16`, "class")}> <div class="md:basis-1/2 self-center"> ${content && renderTemplate`<div class="mb-12 text-lg dark:text-slate-400">${unescapeHTML(content)}</div>`} ${callToAction && renderTemplate`<div class="mt-[-40px] mb-8 text-primary"> ${renderComponent($$result2, "Button", $$Button, { "variant": "link", ...callToAction })} </div>`} ${renderComponent($$result2, "ItemGrid", $$ItemGrid, { "items": items, "columns": columns, "defaultIcon": "tabler:check", "classes": {
    container: `gap-y-4 md:gap-y-8`,
    panel: "max-w-none",
    title: "text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2",
    description: "text-muted dark:text-slate-400 ml-2 rtl:ml-0 rtl:mr-2",
    icon: "flex h-7 w-7 items-center justify-center rounded-full bg-green-600 dark:bg-green-700 text-gray-50 p-1",
    action: "text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2"
  } })} </div> <div aria-hidden="true" class="mt-10 md:mt-0 md:basis-1/2"> ${image && renderTemplate`<div class="relative m-auto max-w-4xl"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "mx-auto w-full rounded-lg bg-gray-500 shadow-lg", "width": 500, "height": 500, "widths": [400, 768], "sizes": "(max-width: 768px) 100vw, 432px", "layout": "responsive", ...image })}`} </div>`} </div> </div> </div> ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/widgets/Content.astro", void 0);

const $$Astro$1 = createAstro("https://Kubekub.vercel.app");
const $$FAQs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FAQs;
  const {
    title = "",
    subtitle = "",
    tagline = "",
    items = [],
    columns = 2,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-7xl mx-auto ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline })} ${renderComponent($$result2, "ItemGrid", $$ItemGrid, { "items": items, "columns": columns, "defaultIcon": "tabler:chevron-right", "classes": {
    container: `${columns === 1 ? "max-w-4xl" : ""} gap-y-8 md:gap-y-12`,
    panel: "max-w-none",
    icon: "flex-shrink-0 mt-1 w-6 h-6 text-primary"
  } })} ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/widgets/FAQs.astro", void 0);

const $$Astro = createAstro("https://Kubekub.vercel.app");
const $$Stats = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Stats;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    stats = [],
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-6xl mx-auto ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline })} ${maybeRenderHead()}<div class="flex flex-wrap justify-center -m-4 text-center"> ${stats && stats.map(({ amount, title: title2, icon }) => renderTemplate`<div class="p-4 md:w-1/4 sm:w-1/2 w-full min-w-[220px] text-center md:border-r md:last:border-none dark:md:border-slate-500 intersect-once motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade intersect-quarter"> ${icon && renderTemplate`<div class="flex items-center justify-center mx-auto mb-4 text-primary"> ${renderComponent($$result2, "Icon", $$Icon, { "name": icon, "class": "w-10 h-10" })} </div>`} ${amount && renderTemplate`<div class="font-heading text-primary text-[2.6rem] font-bold dark:text-white lg:text-5xl xl:text-6xl"> ${amount} </div>`} ${title2 && renderTemplate`<div class="text-sm font-medium uppercase tracking-widest text-gray-800 dark:text-slate-400 lg:text-base"> ${title2} </div>`} </div>`)} </div> ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/components/widgets/Stats.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Kubekub \u2014 Cloud Native AI Platform Engineering",
    ignoreTitleTemplate: true
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "actions": [
    {
      variant: "primary",
      text: "Schedule a Consultation",
      href: "/contact",
      icon: "tabler:message-circle"
    },
    { text: "Learn More", href: "#about" }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<span class="font-semibold">25 years of IT Architecture expertise</span> focused on the hardest infrastructure challenge today:
<span class="font-semibold">transforming experimental AI models into production-ready platforms on Kubernetes.</span> ` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Operationalizing <span class="text-accent dark:text-white highlight">Generative AI</span> at Scale
` })}` })}  ${renderComponent($$result2, "Note", $$Note, {}, { "default": ($$result3) => renderTemplate`
Independent Freelance AI Platform Engineer specializing in short-term, high-impact strategic engagements (part-time contracts)
` })}  ${renderComponent($$result2, "Features", $$Features, { "id": "about", "tagline": "Expertise", "title": "Cloud Native AI Platform Stack", "subtitle": "Building production-ready AI infrastructure using cutting-edge Cloud Native technologies", "items": [
    {
      title: "Model Serving & Inference",
      description: "KServe for standardized model deployment, autoscaling, and multi-framework support (TensorFlow, PyTorch, vLLM, Hugging Face).",
      icon: "tabler:box-model"
    },
    {
      title: "API Gateway & Traffic Management",
      description: "Gateway API with Inference Extensions for intelligent routing, load balancing, and request orchestration across AI endpoints.",
      icon: "tabler:route"
    },
    {
      title: "AI Agent Orchestration",
      description: "KAgent and Model Context Protocol (MCP) for Kubernetes-native control plane and governance of intelligent AI workloads.",
      icon: "tabler:robot"
    },
    {
      title: "Platform Engineering",
      description: "Internal Developer Platforms (IDP) with ArgoCD, Crossplane, Backstage, and GitOps workflows for self-service AI infrastructure.",
      icon: "tabler:hexagon-3d"
    },
    {
      title: "Observability",
      description: "Grafana, and OpenTelemetry for end-to-end ML lifecycle management and monitoring.",
      icon: "tabler:chart-dots"
    },
    {
      title: "Security & Compliance",
      description: "Istio service mesh, Kyverno policies, OPA/Gatekeeper, and external-secrets for enterprise-grade governance and compliance.",
      icon: "tabler:building"
    }
  ] })}  ${renderComponent($$result2, "Content", $$Content, { "isReversed": true, "tagline": "The Challenge", "title": "Platform Engineering for Kubernetes-Native AI", "items": [
    {
      title: "Standardized Workload Management",
      description: "Move beyond ad-hoc AI deployments to standardized Kubernetes workloads with proper resource management, autoscaling, and lifecycle governance."
    },
    {
      title: "Enterprise Security & Compliance",
      description: "Implement zero-trust networking, RBAC, network policies, and compliance controls without vendor lock-in using open standards (Istio, Kyverno, OPA)."
    },
    {
      title: "Multi-Tenancy & Isolation",
      description: "Design platform layers that enable multiple teams and workloads to coexist safely, with proper resource quotas, namespace isolation, and governance."
    },
    {
      title: "Open Standards, Not Vendor Lock-In",
      description: "Build on Kubernetes-native patterns (KServe, Gateway API, MCP) that remain portable across cloud providers and on-premises infrastructure."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">
Building Platform Layers, Not Just AI Deployments
</h3>
The difference between a scattered AI infrastructure and a production-grade platform is intentional architecture. I design the specialized platform layer that enables Kubernetes to serve as the control plane for your entire AI ecosystem.
` })}` })}  ${renderComponent($$result2, "Stats", $$Stats, { "stats": [
    { title: "Years Experience", amount: "25" },
    { title: "Cloud Native Focus", amount: "10+" },
    { title: "Certifications", amount: "CKA, CKAD, AWS, GCP" }
  ] })}  ${renderComponent($$result2, "Steps", $$Steps, { "title": "Hands-On Implementation", "items": [
    {
      title: '<span class="font-medium">Assess & Diagnose</span>',
      description: "Deep-dive into existing infrastructure, identify bottlenecks, and understand real problems blocking production AI deployment.",
      icon: "tabler:stethoscope"
    },
    {
      title: '<span class="font-medium">Build & Fix</span>',
      description: "Roll up sleeves and implement solutions directly\u2014from Kubernetes manifests to CI/CD pipelines. No handoff, just hands-on execution.",
      icon: "tabler:tools"
    },
    {
      title: '<span class="font-medium">Deploy & Validate</span>',
      description: "Get AI models running in production. Troubleshoot issues in real-time, optimize performance, and ensure reliability under load.",
      icon: "tabler:rocket"
    },
    {
      title: '<span class="font-medium">Transfer Knowledge</span>',
      description: "Document what was built, why it works, and how to maintain it. Enable teams to operate independently after engagement.",
      icon: "tabler:school"
    }
  ], "image": {
    src: "https://images.unsplash.com/photo-1616198814651-e71f960c3180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    alt: "Kubernetes Platform"
  } })}  ${renderComponent($$result2, "Features2", $$Features2, { "title": "Why Choose Kubekub", "subtitle": "The discipline of a seasoned architect applied to the innovation of AI", "tagline": "Value Proposition", "items": [
    {
      title: "Battle-Tested Expertise",
      description: "Proven experience with Fortune 500 enterprises: Roche, Hexagon, European Commission.",
      icon: "tabler:award"
    },
    {
      title: "Certified Professional",
      description: "CKA, CKAD certified. Google Cloud and AWS certified architect.",
      icon: "tabler:certificate"
    },
    {
      title: "Bleeding-Edge Technology",
      description: "Specialized in KServe, Gateway API Inference Extension, KAgent, and KMCP.",
      icon: "tabler:atom"
    },
    {
      title: "Flexible Engagement",
      description: "Part-time, short-term strategic contracts designed for high-impact results.",
      icon: "tabler:calendar-check"
    },
    {
      title: "MLOps Focus",
      description: "Transform experimental models into compliant, production-ready AI services.",
      icon: "tabler:git-merge"
    },
    {
      title: "Strategic Leadership",
      description: "Fractional AI platform leadership to guide your long-term platform strategy.",
      icon: "tabler:bulb"
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}` })}  ${renderComponent($$result2, "FAQs", $$FAQs, { "title": "Frequently Asked Questions", "subtitle": "Common questions about working with Kubekub", "tagline": "FAQs", "classes": { container: "max-w-6xl" }, "items": [
    {
      title: "What is Cloud Native AI Platform Engineering?",
      description: "It's the specialized practice of building production-grade infrastructure for AI/ML workloads on Kubernetes. This includes model serving, autoscaling, traffic management, governance, and compliance\u2014transforming experimental AI into enterprise-ready services."
    },
    {
      title: "What types of engagements do you accept?",
      description: "I focus on short-term, high-impact strategic engagements on a part-time basis. This includes platform architecture design, infrastructure implementation, team enablement, and fractional leadership for AI platform strategy."
    },
    {
      title: "Do you work with startups or only enterprises?",
      description: "I work with organizations at any stage who are serious about operationalizing AI at scale. Whether you're a startup building your first production AI platform or an enterprise modernizing existing ML infrastructure, I can help."
    },
    {
      title: "What makes your approach different?",
      description: "I bring 25 years of IT architecture discipline to the rapidly evolving AI space. Rather than just deploying tools, I architect the specialized layer that enables data science teams to succeed\u2014focusing on standards like KServe, Gateway API, and Kubernetes-native patterns."
    },
    {
      title: "What certifications and experience do you have?",
      description: "CKA (Certified Kubernetes Administrator), CKAD (Certified Kubernetes Application Developer), Google Cloud certified, AWS certified. 25 years in IT Architecture with 10+ years focused on Cloud Native platforms. Proven track record with Roche, Hexagon, and European Commission."
    },
    {
      title: "How do I get started?",
      description: "Reach out via the contact form to schedule an initial consultation. We'll discuss your AI platform challenges, current infrastructure, and goals. From there, I'll propose a tailored engagement approach."
    }
  ] })}  ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Get in Touch",
      href: "/contact",
      icon: "tabler:message-circle"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Looking for a fractional leader to set your AI platform strategy? Let's connect and discuss how Kubekub can accelerate your journey to production-ready AI infrastructure.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Ready to Transform Your AI Platform?
` })}` })} ` })}`;
}, "/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/index.astro", void 0);

const $$file = "/Users/juanpelaez/gitkubekub/kubekub.com/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
