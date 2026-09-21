export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  cardDescription: string;
  seoTitle: string;
  seoDescription: string;
  hero: string;
  intro: string;
  bestFor: string[];
  deliverables: string[];
  technologies: string[];
  steps: { title: string; text: string }[];
  pricing: { label: string; price: string; note: string }[];
  timeline: string;
  faq: { q: string; a: string }[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "software-development",
    number: "01",
    title: "Custom software development",
    shortTitle: "Software development",
    cardDescription: "Web applications, portals, internal tools, APIs and business systems built around the way your company works.",
    seoTitle: "Affordable Custom Software Development South Africa",
    seoDescription: "Custom software development for South African startups and growing companies. Web apps, portals, APIs and business systems with a free initial scope review.",
    hero: "Software built around the business — not the other way around.",
    intro: "We design and build focused software for businesses that have outgrown spreadsheets, manual processes or off-the-shelf tools. The goal is a maintainable product that solves the actual workflow without adding unnecessary complexity.",
    bestFor: ["Customer or staff portals", "Internal business systems", "Booking and workflow platforms", "Dashboards and admin tools", "API integrations", "Replacing spreadsheet-heavy processes"],
    deliverables: ["Requirements and solution outline", "UX flows and interface design", "Frontend and backend development", "Database and authentication", "Testing and production deployment", "Handover, documentation and post-launch options"],
    technologies: ["Next.js", "React", "Node.js", "Python", "PostgreSQL", "Microsoft Azure", "REST APIs", "GitHub"],
    steps: [
      { title: "Scope", text: "We clarify the users, workflow, must-have features, integrations and success criteria." },
      { title: "Plan", text: "The project is divided into a practical first release, milestones and a clear technical approach." },
      { title: "Build", text: "The system is developed in working increments with regular review points." },
      { title: "Test", text: "Core flows, permissions, responsive behaviour and production readiness are checked before launch." },
      { title: "Launch", text: "We deploy the application, verify the live environment and provide handover information." },
      { title: "Improve", text: "Optional support can cover fixes, enhancements, monitoring and later phases." },
    ],
    pricing: [
      { label: "Initial scope review", price: "Free", note: "A first discussion to understand the problem and confirm the next step." },
      { label: "Focused MVP", price: "From R18,000", note: "A small working first release with tightly controlled scope." },
      { label: "Custom business system", price: "Quoted after scope", note: "For larger workflows, integrations, roles or multi-phase builds." },
    ],
    timeline: "Small builds can start from roughly 2–4 weeks. Larger systems are planned in phases after scope.",
    faq: [
      { q: "Can you start from only an idea?", a: "Yes. A complete specification is not required. We can turn a rough idea or business problem into a structured first scope." },
      { q: "Can you improve an existing application?", a: "Yes. We can review an existing codebase or system and propose a sensible improvement path before work starts." },
    ],
    keywords: ["custom software development South Africa", "affordable software development", "software developers Johannesburg", "startup software development", "web application development"],
  },
  {
    slug: "websites-ecommerce",
    number: "02",
    title: "Websites & ecommerce",
    shortTitle: "Websites & ecommerce",
    cardDescription: "Fast, search-ready websites and ecommerce experiences for startups, new companies and growing brands.",
    seoTitle: "Affordable Website Development South Africa",
    seoDescription: "Affordable website and ecommerce development for startups and small businesses in South Africa. SEO-ready Next.js sites with a free initial consultation.",
    hero: "A website that explains the business clearly and helps people take action.",
    intro: "We build lean, fast websites for companies that need a credible online presence without bloated templates or unnecessary effects. Pages are structured for humans first and search engines second, with strong technical SEO from launch.",
    bestFor: ["New company websites", "Startup landing pages", "Professional services websites", "Product and SaaS websites", "Small ecommerce stores", "Website rebuilds and SEO clean-up"],
    deliverables: ["Content and page structure", "Responsive interface development", "Technical SEO foundations", "Forms and conversion paths", "Analytics-ready implementation", "Deployment and domain support"],
    technologies: ["Next.js", "React", "HTML/CSS", "Schema.org structured data", "Microsoft Azure", "Resend", "Google Search Console", "GitHub"],
    steps: [
      { title: "Content map", text: "We define the pages, user goals and search topics that matter to the business." },
      { title: "Design direction", text: "A clean interface system is created around the brand and required actions." },
      { title: "Build", text: "The site is developed responsively with reusable components and accessible markup." },
      { title: "SEO setup", text: "Metadata, canonical URLs, sitemap, robots rules and structured data are implemented." },
      { title: "Quality check", text: "Forms, mobile behaviour, performance basics and content links are reviewed." },
      { title: "Launch", text: "We deploy, connect the domain and provide indexing steps for Google Search Console." },
    ],
    pricing: [
      { label: "Initial consultation", price: "Free", note: "We confirm the site type, pages and required functionality." },
      { label: "Landing page", price: "From R4,500", note: "A focused one-page presence for a service, product or launch." },
      { label: "Company website", price: "From R8,500", note: "A multi-page business website with forms and SEO foundations." },
      { label: "Ecommerce", price: "From R15,000", note: "Pricing depends on catalogue size, payments and integrations." },
    ],
    timeline: "Simple sites can launch in about 1–3 weeks once content is ready. Ecommerce and custom integrations take longer.",
    faq: [
      { q: "Will the website be ready for Google indexing?", a: "Yes. We implement crawlable pages, metadata, sitemap, robots rules, canonicals and structured data where relevant. Ranking still depends on competition, content quality, authority and time." },
      { q: "Can you move an existing website without losing indexed pages?", a: "Yes. Existing important URLs should be kept where possible, and changed URLs should use permanent redirects so search engines and visitors reach the correct replacement page." },
    ],
    keywords: ["website development South Africa", "affordable web design Johannesburg", "startup website developer", "small business website South Africa", "ecommerce development South Africa"],
  },
  {
    slug: "ai-automation",
    number: "03",
    title: "AI & automation",
    shortTitle: "AI & automation",
    cardDescription: "Practical AI assistants, workflow automation and intelligent features that remove repetitive work.",
    seoTitle: "AI Automation Services South Africa",
    seoDescription: "AI automation, assistants and workflow integrations for South African startups and companies. Start with a free use-case review and build only what creates value.",
    hero: "Use AI where it saves time, improves service or makes a product more useful.",
    intro: "We focus on practical AI rather than adding AI for its own sake. A project starts by identifying the repetitive task, decision or customer interaction that can be improved, then choosing the smallest useful implementation.",
    bestFor: ["Internal knowledge assistants", "Customer support assistants", "Document and text workflows", "Lead qualification", "Business process automation", "AI features inside an existing product"],
    deliverables: ["Use-case and risk review", "Prompt and workflow design", "Model/API integration", "Guardrails and validation", "Interface or system integration", "Usage monitoring guidance"],
    technologies: ["Azure OpenAI", "Microsoft Foundry", "OpenAI-compatible APIs", "Python", "Node.js", "Next.js", "REST APIs", "Azure services"],
    steps: [
      { title: "Use-case review", text: "We identify the task, users, available information and what a useful result looks like." },
      { title: "Data and controls", text: "Inputs, privacy boundaries, failure cases and required human checks are defined." },
      { title: "Prototype", text: "A narrow proof of concept validates whether the chosen approach produces useful results." },
      { title: "Integrate", text: "The AI workflow is connected to the relevant website, application or internal process." },
      { title: "Test", text: "We test common cases, weak cases and expected fallback behaviour." },
      { title: "Operate", text: "Usage, costs and output quality can be reviewed after launch and improved over time." },
    ],
    pricing: [
      { label: "AI use-case review", price: "Free", note: "A short first review to decide whether AI is appropriate for the problem." },
      { label: "Focused automation / prototype", price: "From R7,500", note: "For one well-defined workflow or proof of concept." },
      { label: "Integrated AI assistant", price: "From R15,000", note: "For production integration, interface work and business-specific controls." },
    ],
    timeline: "A focused prototype can take 1–2 weeks. Production integrations depend on systems, data access and controls.",
    faq: [
      { q: "Do we need our own AI model?", a: "Usually not. Many business use cases can use secure model APIs combined with your workflow, permissions and business context." },
      { q: "Can AI be added to our existing software?", a: "Yes, if the current system exposes the required data or integration points. We first review the existing architecture and the specific use case." },
    ],
    keywords: ["AI automation South Africa", "AI development Johannesburg", "business AI assistant", "workflow automation South Africa", "Azure OpenAI development"],
  },
  {
    slug: "cloud-backend",
    number: "04",
    title: "Cloud & backend systems",
    shortTitle: "Cloud & backend",
    cardDescription: "Cloud architecture, APIs, databases, authentication and deployment foundations for reliable digital products.",
    seoTitle: "Cloud & Backend Development South Africa",
    seoDescription: "Cloud and backend development for startups and businesses in South Africa: APIs, databases, authentication, Azure deployments and production setup.",
    hero: "A reliable backend gives the product somewhere solid to grow from.",
    intro: "We build and improve the server-side foundations behind websites, apps and digital products — including APIs, data storage, authentication, integrations and cloud deployment.",
    bestFor: ["New product backends", "API development", "Database-backed systems", "Authentication and roles", "Cloud migration", "Deployment and environment setup"],
    deliverables: ["Architecture recommendation", "API and backend development", "Database design", "Authentication and permissions", "Cloud deployment configuration", "Operational documentation"],
    technologies: ["Microsoft Azure", "Azure App Service", "Azure SQL", "PostgreSQL", "Node.js", "Python", "GitHub Actions", "REST APIs"],
    steps: [
      { title: "Review", text: "We identify traffic, data, integration, security and operational requirements." },
      { title: "Architecture", text: "A suitable backend and cloud design is selected without over-engineering the first version." },
      { title: "Implement", text: "APIs, database models, authentication and required services are built or configured." },
      { title: "Automate", text: "Source control and deployment steps are made repeatable where appropriate." },
      { title: "Verify", text: "Environment configuration, permissions and key production flows are checked." },
      { title: "Handover", text: "The deployment structure and operating requirements are documented." },
    ],
    pricing: [
      { label: "Initial architecture review", price: "Free", note: "A first discussion for a new or existing backend." },
      { label: "Cloud setup / deployment", price: "From R7,500", note: "For a focused production environment and deployment setup." },
      { label: "Custom backend / API", price: "From R15,000", note: "Final cost depends on endpoints, data models, roles and integrations." },
    ],
    timeline: "Focused backend or deployment work can start from 1–3 weeks. Larger migrations or integrations are scoped separately.",
    faq: [
      { q: "Do you only work with Microsoft Azure?", a: "Azure is a common option, but the choice depends on the product, existing environment and team requirements." },
      { q: "Can you deploy an application we already have?", a: "Yes. We can review the application requirements, environment variables, database dependencies and deployment process before moving it into production." },
    ],
    keywords: ["Azure cloud development South Africa", "backend developer Johannesburg", "API development South Africa", "cloud migration startup", "Azure App Service developer"],
  },
  {
    slug: "data-analytics",
    number: "05",
    title: "Data & analytics",
    shortTitle: "Data & analytics",
    cardDescription: "Dashboards, data preparation, reporting and pipelines that turn operational data into useful information.",
    seoTitle: "Data Analytics & Dashboard Development South Africa",
    seoDescription: "Dashboards, reporting, data pipelines and analytics solutions for South African startups and growing companies. Practical reporting without unnecessary complexity.",
    hero: "Turn scattered business data into reporting people can actually use.",
    intro: "We help small and growing teams organise data, automate recurring reporting and build dashboards that answer real operational questions rather than creating more manual work.",
    bestFor: ["Management dashboards", "Recurring business reports", "Data cleaning and preparation", "Combining multiple data sources", "Operational metrics", "Simple analytics pipelines"],
    deliverables: ["Reporting requirements", "Data source assessment", "Data cleaning and transformation", "Dashboard or reporting layer", "Refresh process or pipeline", "Documentation and handover"],
    technologies: ["Python", "SQL", "Microsoft Fabric", "Power BI", "Azure SQL", "PostgreSQL", "APIs", "Excel-compatible exports"],
    steps: [
      { title: "Questions first", text: "We define what the business needs to know and who will use the result." },
      { title: "Source review", text: "Files, databases, APIs and existing reports are assessed for quality and access." },
      { title: "Prepare", text: "Data is cleaned, transformed and combined into a usable reporting structure." },
      { title: "Build", text: "The dashboard, report or pipeline is created around the agreed questions." },
      { title: "Validate", text: "Key totals and calculations are checked against source information." },
      { title: "Operate", text: "Refresh, ownership and future improvement steps are documented." },
    ],
    pricing: [
      { label: "Reporting review", price: "Free", note: "A first look at the reporting problem and likely data sources." },
      { label: "Starter dashboard", price: "From R8,500", note: "For a focused dashboard from a small number of clean sources." },
      { label: "Data integration / pipeline", price: "From R15,000", note: "For multiple sources, transformation or automated refresh workflows." },
    ],
    timeline: "A focused dashboard can take 1–3 weeks. Data quality and access are the biggest factors in larger analytics work.",
    faq: [
      { q: "Can you work from Excel files?", a: "Yes. Excel can be a valid starting source. We review the structure and decide whether it should remain a file workflow or move into a more reliable data store." },
      { q: "Do we need a large data platform?", a: "Not necessarily. Smaller organisations often benefit from a simpler reporting setup first, then expand only when volume and complexity justify it." },
    ],
    keywords: ["data analytics South Africa", "Power BI dashboard development", "data dashboard Johannesburg", "data pipeline development South Africa", "startup analytics"],
  },
  {
    slug: "mvp-product-development",
    number: "06",
    title: "MVP & product development",
    shortTitle: "MVP development",
    cardDescription: "Turn an early idea into a focused prototype or working first release that can be tested with real users.",
    seoTitle: "MVP Development for Startups South Africa",
    seoDescription: "MVP and digital product development for South African startups. Scope the idea, prototype the product and launch a focused first version without overbuilding.",
    hero: "Start with the smallest useful product, learn, then build the next thing with evidence.",
    intro: "For founders and new companies, the first version should prove the core workflow before the product becomes expensive or complicated. We help shape the scope, choose what to leave out, build the first release and plan what comes next.",
    bestFor: ["Startup MVPs", "Founder-led product ideas", "Proofs of concept", "Clickable prototypes", "First customer pilots", "New digital services"],
    deliverables: ["Problem and user definition", "Feature prioritisation", "Prototype or first-release plan", "Product design and development", "Launch setup", "Post-launch iteration plan"],
    technologies: ["Next.js", "React", "Node.js", "Python", "PostgreSQL", "Microsoft Azure", "Azure OpenAI", "GitHub"],
    steps: [
      { title: "Define", text: "We identify the user, problem, core action and evidence the first version should produce." },
      { title: "Cut scope", text: "Nice-to-have features are separated from what is required to test the product idea." },
      { title: "Prototype", text: "Where useful, a clickable or technical prototype reduces uncertainty before the full build." },
      { title: "Build MVP", text: "The smallest practical product is developed with production-minded foundations." },
      { title: "Launch", text: "The product is deployed and prepared for first users, demos or pilot customers." },
      { title: "Learn", text: "Feedback and usage inform the next release rather than guessing the entire roadmap upfront." },
    ],
    pricing: [
      { label: "Initial product scope", price: "Free", note: "A first discussion to test the problem, user and likely MVP shape." },
      { label: "Clickable prototype", price: "From R6,500", note: "Useful for validating flows, demos or early stakeholder feedback." },
      { label: "Functional MVP", price: "From R20,000", note: "Final cost depends on the number of workflows, roles, data and integrations." },
    ],
    timeline: "Prototypes can be ready in 1–2 weeks. Focused MVPs commonly start from 3–6 weeks depending on scope.",
    faq: [
      { q: "Do I need a technical co-founder to start?", a: "No. You need a clear problem and enough business context to evaluate the first product scope. Technical choices can be worked through during discovery." },
      { q: "Can you continue after the MVP?", a: "Yes. The first release can be followed by support, fixes, new features and later product phases as evidence and priorities become clearer." },
    ],
    keywords: ["MVP development South Africa", "startup app development Johannesburg", "prototype development South Africa", "startup product development", "affordable MVP developer"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
