import {
  AppWindow,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Handshake,
  Layers3,
  LifeBuoy,
  Palette,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Workflow,
} from 'lucide-react';

export const company = {
  brand: 'ENASH',
  legalName: 'INDESIGN AND DEVELOPERS (PTY) LTD',
  registrationNumber: '2020/588040/07',
  registrationDate: '27 July 2020',
  status: 'In Business',
  companyType: 'Private Company',
  csdSupplierNumber: 'MAAA1650436',
  bbbeeLevel: 'Level 1 Contributor',
  bbbeeRecognition: '135% procurement recognition',
  bbbeeExpiry: '2026-09-25',
  address: '63 Panther Street, Kensington, Johannesburg, Gauteng, 2101',
};

export const services = [
  {
    slug: 'software-development',
    title: 'Custom Software Development',
    short: 'Web applications, internal systems, portals and workflow tools built around the way your organisation works.',
    icon: Code2,
    bullets: ['React applications', 'Business portals', 'Firebase systems', 'API integrations', 'Responsive web platforms'],
  },
  {
    slug: 'data-ai',
    title: 'Data & AI Solutions',
    short: 'Data platforms, dashboards, AI assistants and intelligent workflows that turn information into action.',
    icon: Bot,
    bullets: ['AI assistants', 'Data engineering', 'Dashboards & analytics', 'Azure AI integrations', 'Automation'],
  },
  {
    slug: 'cloud-platforms',
    title: 'Cloud & Platform Engineering',
    short: 'Cloud-ready application architecture and deployment across Firebase and Microsoft Azure.',
    icon: Cloud,
    bullets: ['Firebase hosting', 'Cloud Functions', 'Azure App Service', 'Authentication', 'Secure configuration'],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    short: 'Connected forms, approvals, notifications and reporting that reduce repetitive operational work.',
    icon: Workflow,
    bullets: ['Process automation', 'Email workflows', 'Approval flows', 'Notifications', 'Operational dashboards'],
  },
  {
    slug: 'web-digital',
    title: 'Web & Digital Experiences',
    short: 'Corporate websites and customer-facing experiences designed to communicate clearly and convert interest into action.',
    icon: AppWindow,
    bullets: ['Corporate websites', 'Landing pages', 'Service portals', 'UI implementation', 'SEO-ready structure'],
  },
  {
    slug: 'database-solutions',
    title: 'Database Solutions',
    short: 'Database design, integration and reporting for reliable and structured information systems.',
    icon: Database,
    bullets: ['SQL Server', 'Firestore', 'Data modelling', 'Reporting data', 'Integration support'],
  },
  {
    slug: 'ui-ux-brand',
    title: 'UI/UX & Digital Brand',
    short: 'Clear interfaces and digital presentation that make systems easier to use and businesses easier to trust.',
    icon: Palette,
    bullets: ['Interface design', 'Design systems', 'Brand implementation', 'Prototype screens', 'User journeys'],
  },
  {
    slug: 'research-prototyping',
    title: 'Research & Prototyping',
    short: 'Technical exploration, proofs of concept and applied research for new digital ideas.',
    icon: SearchCheck,
    bullets: ['Proofs of concept', 'Technical feasibility', 'Prototype builds', 'Research support', 'Solution experiments'],
  },
  {
    slug: 'training-enablement',
    title: 'Training & Digital Enablement',
    short: 'Practical technical training and enablement for teams adopting software, data and digital workflows.',
    icon: GraduationCap,
    bullets: ['System training', 'Technical workshops', 'User onboarding', 'Documentation', 'Knowledge transfer'],
  },
  {
    slug: 'technology-consulting',
    title: 'Technology Consulting',
    short: 'Technology planning and implementation support from business problem to working solution.',
    icon: BriefcaseBusiness,
    bullets: ['Solution planning', 'Architecture guidance', 'Vendor evaluation', 'Digital roadmaps', 'Implementation support'],
  },
  {
    slug: 'procurement-sourcing',
    title: 'ICT Procurement & Sourcing',
    short: 'Structured sourcing support for technology products and services, backed by formal supplier registration.',
    icon: ShoppingCart,
    bullets: ['Supplier sourcing', 'RFQ response support', 'ICT equipment', 'Software sourcing', 'Delivery coordination'],
  },
  {
    slug: 'support-maintenance',
    title: 'Support & Maintenance',
    short: 'Ongoing application support, fixes, enhancements and operational assistance after launch.',
    icon: LifeBuoy,
    bullets: ['Bug fixes', 'Feature updates', 'Monitoring support', 'Content updates', 'Operational assistance'],
  },
];

export const serviceGroups = [
  {
    title: 'Build digital products',
    text: 'Customer-facing and internal software designed around a real workflow.',
    slugs: ['software-development', 'web-digital', 'ui-ux-brand', 'research-prototyping'],
  },
  {
    title: 'Automate & understand',
    text: 'Use data, AI and automation where they remove friction or improve decisions.',
    slugs: ['data-ai', 'business-automation', 'database-solutions'],
  },
  {
    title: 'Run & scale',
    text: 'Deploy, integrate and support systems on reliable cloud platforms.',
    slugs: ['cloud-platforms', 'support-maintenance'],
  },
  {
    title: 'Advise, source & enable',
    text: 'Planning, training and ICT sourcing when the requirement is broader than software alone.',
    slugs: ['technology-consulting', 'training-enablement', 'procurement-sourcing'],
  },
];

export const projects = [
  {
    slug: 'kitchen-manager',
    name: 'KitchCore',
    label: 'Live product',
    url: 'https://kitchcore.app/',
    displayUrl: 'kitchcore.app',
    title: 'Kitchen operations management platform',
    description: 'A digital operations platform for kitchen and hospitality workflows, developed by ENASH Developers.',
    tags: ['Operations', 'Workflow', 'Web App'],
  },
  {
    slug: 'taxifind',
    name: 'TaxiFind',
    label: 'Live product',
    url: 'https://impeesa-f35d2.web.app/',
    displayUrl: 'impeesa-f35d2.web.app',
    title: 'Public transport route discovery platform',
    description: 'A mobility product designed around route discovery, journey guidance and South African public transport use cases.',
    tags: ['Mobility', 'Maps', 'Community'],
  },
  {
    slug: 'whats-there',
    name: "What's There?",
    label: 'Live product',
    url: 'https://whatsthere.co.za/',
    displayUrl: 'whatsthere.co.za',
    title: 'Nearby discovery and planning platform',
    description: 'A consumer-facing product for finding useful options nearby and turning location-based discovery into a practical plan.',
    tags: ['Discovery', 'Local', 'Consumer App'],
  },
];

export const industries = [
  { title: 'SMEs & Startups', text: 'Customer platforms, workflow systems, prototypes and operational automation.' },
  { title: 'Education', text: 'Learning systems, academic workflows, technical training and digital enablement.' },
  { title: 'Hospitality & Retail', text: 'Operational tools, dashboards and customer-facing digital experiences.' },
  { title: 'Transport & Mobility', text: 'Route information, maps, location-aware products and commuter-facing systems.' },
  { title: 'Professional Services', text: 'Portals, data management, automation, dashboards and workflow optimisation.' },
  { title: 'Public Sector Supply', text: 'ICT sourcing, software delivery and supplier documentation for procurement participation.' },
];

export const capabilities = [
  { title: 'Build', text: 'Full-stack digital products from requirement to deployment.', icon: Layers3 },
  { title: 'Integrate', text: 'Connect cloud, data, APIs and communication services.', icon: Handshake },
  { title: 'Protect', text: 'Keep privileged operations server-side and use controlled data access.', icon: ShieldCheck },
  { title: 'Measure', text: 'Turn useful system information into decision-ready reporting.', icon: ChartNoAxesCombined },
];

export const faqs = [
  ['What does ENASH build?', 'ENASH builds custom web applications, corporate websites, business workflows, data and AI solutions, cloud integrations, dashboards and selected digital products.'],
  ['Can I request a quotation online?', 'Yes. Use the Start a Project page to send your requirements, timing and budget range.'],
  ['Do you work with small businesses?', 'Yes. Projects can start with a focused website, prototype or workflow and expand as the business grows.'],
  ['Can you maintain a system after launch?', 'Yes. Support can include fixes, updates, enhancements and operational assistance.'],
  ['Does ENASH provide procurement services?', 'Yes. ICT procurement and sourcing can be requested where the requirement fits the company supplier scope.'],
  ['Are the developed systems live?', 'Yes. KitchCore, TaxiFind and What\'s There? link to their live applications from the Developed Systems page.'],
];
