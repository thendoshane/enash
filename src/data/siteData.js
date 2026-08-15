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
    short: 'Web applications, internal systems, portals and workflow tools built around the way your organisation actually works.',
    icon: Code2,
    bullets: ['React applications', 'Business portals', 'Firebase systems', 'API integrations', 'Responsive web platforms'],
  },
  {
    slug: 'data-ai',
    title: 'Data & AI Solutions',
    short: 'Practical data platforms, dashboards, AI assistants and intelligent workflows that turn information into action.',
    icon: Bot,
    bullets: ['AI assistants', 'Data engineering', 'Dashboards & analytics', 'Azure AI integrations', 'Automation'],
  },
  {
    slug: 'cloud-platforms',
    title: 'Cloud & Platform Engineering',
    short: 'Cloud-ready application architecture and deployment across Firebase and Microsoft Azure environments.',
    icon: Cloud,
    bullets: ['Firebase hosting', 'Cloud Functions', 'Azure App Service', 'Authentication', 'Secure configuration'],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    short: 'Reduce repetitive work with connected forms, approvals, notifications, reporting and custom operational workflows.',
    icon: Workflow,
    bullets: ['Process automation', 'Email workflows', 'Approval flows', 'Notifications', 'Operational dashboards'],
  },
  {
    slug: 'web-digital',
    title: 'Web & Digital Experiences',
    short: 'Modern websites and customer-facing experiences designed to communicate clearly and convert interest into action.',
    icon: AppWindow,
    bullets: ['Corporate websites', 'Landing pages', 'Service portals', 'UI implementation', 'SEO-ready structure'],
  },
  {
    slug: 'database-solutions',
    title: 'Database Solutions',
    short: 'Database design, integration and reporting for organisations that need reliable and structured information systems.',
    icon: Database,
    bullets: ['SQL Server', 'Firestore', 'Data modelling', 'Reporting data', 'Integration support'],
  },
  {
    slug: 'ui-ux-brand',
    title: 'UI/UX & Digital Brand',
    short: 'Clean interfaces, product structure and digital presentation that make systems easier to use and businesses easier to trust.',
    icon: Palette,
    bullets: ['Interface design', 'Design systems', 'Brand implementation', 'Prototype screens', 'User journeys'],
  },
  {
    slug: 'research-prototyping',
    title: 'Research & Prototyping',
    short: 'Rapid technical exploration, proof-of-concept development and applied research for new digital ideas.',
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
    short: 'Technology planning and implementation support for organisations that need a clear path from business problem to working solution.',
    icon: BriefcaseBusiness,
    bullets: ['Solution planning', 'Architecture guidance', 'Vendor evaluation', 'Digital roadmaps', 'Implementation support'],
  },
  {
    slug: 'procurement-sourcing',
    title: 'ICT Procurement & Sourcing',
    short: 'Structured sourcing support for technology products and services, backed by formal supplier registration and procurement credentials.',
    icon: ShoppingCart,
    bullets: ['Supplier sourcing', 'RFQ response support', 'ICT equipment', 'Software sourcing', 'Delivery coordination'],
  },
  {
    slug: 'support-maintenance',
    title: 'Support & Maintenance',
    short: 'Ongoing application support, fixes, enhancements and operational assistance after a system goes live.',
    icon: LifeBuoy,
    bullets: ['Bug fixes', 'Feature updates', 'Monitoring support', 'Content updates', 'Operational assistance'],
  },
];

export const projects = [
  {
    slug: 'kitchen-manager',
    name: 'Kitchen Manager',
    label: 'Live application',
    url: 'https://kitchenmanagerv1.web.app/',
    displayUrl: 'kitchenmanagerv1.web.app',
    title: 'Operations-focused kitchen management platform',
    description: 'A live system developed by ENASH Developers for digital operational workflows in a kitchen and hospitality environment.',
    tags: ['Operations', 'Workflow', 'Web App'],
  },
  {
    slug: 'taxifind',
    name: 'TaxiFind / Niyaphi',
    label: 'Live application',
    url: 'https://impeesa-f35d2.web.app/',
    displayUrl: 'impeesa-f35d2.web.app',
    title: 'Public transport route discovery platform',
    description: 'A live mobility product designed around route discovery, journey guidance and South African public transport use cases.',
    tags: ['Mobility', 'Maps', 'Community'],
  },
  {
    slug: 'whats-there',
    name: "What's There?",
    label: 'Live application',
    url: 'https://whatstherev1.web.app/',
    displayUrl: 'whatstherev1.web.app',
    title: 'Nearby discovery and planning experience',
    description: 'A live consumer-facing product for finding options nearby and turning location-based discovery into a practical plan.',
    tags: ['Discovery', 'Local', 'Consumer App'],
  },
];

export const industries = [
  { title: 'SMEs & Startups', text: 'Launch customer-facing platforms, automate operations and build the first version of a digital product.' },
  { title: 'Education', text: 'Learning systems, academic workflows, training platforms and practical digital enablement.' },
  { title: 'Hospitality & Retail', text: 'Operational tools, inventory-adjacent workflows, dashboards and customer-facing digital experiences.' },
  { title: 'Transport & Mobility', text: 'Route information, maps, location-aware products and commuter-facing systems.' },
  { title: 'Professional Services', text: 'Portals, data management, automation, dashboards and workflow optimisation.' },
  { title: 'Public Sector Suppliers', text: 'ICT sourcing, software delivery and documented supplier credentials for procurement participation.' },
];

export const capabilities = [
  { title: 'Build', text: 'Full-stack digital products from idea to deployment.', icon: Layers3 },
  { title: 'Integrate', text: 'Connect cloud, data, APIs and communication services.', icon: Handshake },
  { title: 'Protect', text: 'Keep secrets server-side and use controlled data access patterns.', icon: ShieldCheck },
  { title: 'Measure', text: 'Capture useful information and convert it into decision-ready reporting.', icon: ChartNoAxesCombined },
];

export const faqs = [
  ['What does ENASH build?', 'ENASH builds custom web applications, corporate websites, business workflows, data and AI solutions, cloud integrations, dashboards and selected digital products.'],
  ['Can I request a quotation online?', 'Yes. Use the Request a Service page to send your project requirements, timing and budget range. The request is recorded securely and sent to the ENASH business inbox.'],
  ['Do you work with small businesses?', 'Yes. Projects can start with a focused website, prototype or workflow and expand as the business grows.'],
  ['Can you maintain a system after launch?', 'Yes. Ongoing support can include fixes, updates, feature enhancements, operational assistance and content changes.'],
  ['Does ENASH provide procurement services?', 'Yes. ICT procurement and sourcing can be requested where the requirement fits the company\'s capabilities and supplier scope.'],
  ['Are the developed systems live?', 'Yes. Kitchen Manager, TaxiFind / Niyaphi and What\'s There? are linked from the Developed Systems page so visitors can open the live applications.'],
];
