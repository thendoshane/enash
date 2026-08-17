import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { company, projects, services } from '../data/siteData';
import { insightPosts } from '../data/insights';

const SITE_URL = 'https://www.enash.co.za';
const DEFAULT_IMAGE = `${SITE_URL}/enash-og.png`;

const basePages = {
  '/': {
    title: 'ENASH | Software Development, AI & Cloud Solutions South Africa',
    description: 'ENASH is a Johannesburg-based technology company delivering custom software development, web applications, AI automation, data solutions, cloud engineering and ICT procurement across South Africa and remotely worldwide.',
  },
  '/about': {
    title: 'About ENASH | South African Technology Company',
    description: 'Meet ENASH, the customer-facing technology brand of INDESIGN AND DEVELOPERS (Pty) Ltd. We build practical software, data, AI, cloud and digital solutions from Johannesburg, South Africa.',
  },
  '/services': {
    title: 'Technology Services South Africa | Software, AI, Cloud & Automation | ENASH',
    description: 'Explore ENASH technology services including custom software development, web development, AI and data solutions, cloud engineering, automation, databases, consulting and technical support in South Africa.',
  },
  '/projects': {
    title: 'Systems Developed by ENASH | KitchCore, TaxiFind & What\'s There?',
    description: 'Explore working digital products developed by ENASH Developers, including KitchCore, TaxiFind and What\'s There?.',
  },
  '/industries': {
    title: 'Technology Solutions for Businesses & Organisations | ENASH South Africa',
    description: 'ENASH builds software, automation, data, AI and cloud solutions for SMEs, education, hospitality, transport, professional services and public-sector supply environments.',
  },
  '/procurement': {
    title: 'ICT Procurement & Technology Sourcing South Africa | ENASH',
    description: 'ENASH supports ICT procurement, technology sourcing, supplier comparisons, RFQ responses and delivery coordination for South African organisations.',
  },
  '/compliance': {
    title: 'ENASH Company Documents | CIPC, B-BBEE & CSD Requests',
    description: 'Request official ENASH supplier documents including CIPC registration, B-BBEE and CSD documentation by email.',
  },
  '/request-service': {
    title: 'Start a Technology Project with ENASH',
    description: 'Send ENASH your software, website, AI, automation, cloud, data, ICT procurement or digital project requirement.',
    noindex: true,
  },
  '/contact': {
    title: 'Contact ENASH | Technology Company Johannesburg, South Africa',
    description: 'Contact ENASH in Johannesburg, South Africa for software development, AI, cloud, automation, data, web and ICT technology enquiries.',
  },
  '/insights': {
    title: 'ENASH Insights | Software, AI, Cloud, Data & Digital Delivery',
    description: 'Practical ENASH articles about software development, AI automation, cloud platforms, data, web security, ICT procurement and digital delivery.',
  },
  '/faq': {
    title: 'ENASH FAQ | Software, AI, Cloud & Technology Projects',
    description: 'Answers to common questions about working with ENASH on software development, web, AI, cloud, automation, support and ICT procurement projects.',
  },
  '/privacy': {
    title: 'Privacy | ENASH',
    description: 'ENASH privacy information.',
    noindex: true,
  },
  '/terms': {
    title: 'Terms | ENASH',
    description: 'ENASH website terms.',
    noindex: true,
  },
};

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function setLink(rel, href, extra = {}) {
  let element = document.head.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  Object.entries(extra).forEach(([key, value]) => element.setAttribute(key, value));
}

function cleanPath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function routeSeo(pathname) {
  const path = cleanPath(pathname);
  if (basePages[path]) return { ...basePages[path], path };

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = services.find((item) => item.slug === serviceMatch[1]);
    if (service) {
      return {
        path,
        title: service.seoTitle || `${service.title} South Africa | ENASH`,
        description: service.seoDescription || `${service.short} ENASH serves organisations across South Africa from Johannesburg and supports remote international delivery.`,
        type: 'service',
        entity: service,
      };
    }
  }

  const projectMatch = path.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = projects.find((item) => item.slug === projectMatch[1]);
    if (project) {
      return {
        path,
        title: `${project.name} | Developed by ENASH Developers`,
        description: `${project.title}. ${project.description}`,
        type: 'software',
        entity: project,
      };
    }
  }

  const insightMatch = path.match(/^\/insights\/([^/]+)$/);
  if (insightMatch) {
    const post = insightPosts.find((item) => item.slug === insightMatch[1]);
    if (post) {
      return {
        path,
        title: post.seoTitle || `${post.title} | ENASH`,
        description: post.description,
        type: 'article',
        entity: post,
      };
    }
  }

  return {
    path,
    title: 'Page not found | ENASH',
    description: 'The requested ENASH page could not be found.',
    noindex: true,
  };
}

function breadcrumbItems(path, config) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'ENASH', item: `${SITE_URL}/` }];
  if (path === '/') return items;
  const parts = path.split('/').filter(Boolean);
  let current = '';
  parts.forEach((part, index) => {
    current += `/${part}`;
    let name = part.replaceAll('-', ' ');
    if (index === parts.length - 1 && config.entity?.title) name = config.entity.title;
    if (index === parts.length - 1 && config.entity?.name) name = config.entity.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    items.push({ '@type': 'ListItem', position: index + 2, name, item: `${SITE_URL}${current}` });
  });
  return items;
}

function jsonLdFor(config) {
  const canonical = `${SITE_URL}${config.path === '/' ? '/' : config.path}`;
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'ENASH',
    alternateName: ['ENASH Developers', 'InDesign and Developers'],
    legalName: company.legalName,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/enash-logo-512.png`,
      width: 512,
      height: 512,
    },
    foundingDate: '2020-07-27',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '63 Panther Street',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      postalCode: '2101',
      addressCountry: 'ZA',
    },
    areaServed: [
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Place', name: 'Worldwide remote delivery' },
    ],
    sameAs: company.socials.map((item) => item.url),
    knowsAbout: [
      'Custom software development',
      'Web application development',
      'Artificial intelligence',
      'Data engineering',
      'Business automation',
      'Cloud computing',
      'Microsoft Azure',
      'Firebase',
      'Database solutions',
      'ICT procurement',
      'Technology consulting',
    ],
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'ENASH',
    alternateName: 'ENASH Developers',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-ZA',
  };

  const webpage = {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: config.title,
    description: config.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-ZA',
  };

  const graph = [organization, website, webpage];

  if (config.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbItems(config.path, config),
    });
  }

  if (config.type === 'service') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: config.entity.title,
      serviceType: config.entity.title,
      description: config.description,
      url: canonical,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'South Africa' },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: canonical,
        availableLanguage: 'English',
      },
    });
  }

  if (config.type === 'software') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonical}#software`,
      name: config.entity.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: config.entity.url,
      description: config.entity.description,
      author: { '@id': `${SITE_URL}/#organization` },
    });
  }

  if (config.type === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': `${canonical}#article`,
      headline: config.entity.title,
      description: config.entity.description,
      datePublished: config.entity.datePublished,
      dateModified: config.entity.dateModified || config.entity.datePublished,
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@id': `${canonical}#webpage` },
      image: DEFAULT_IMAGE,
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const config = routeSeo(pathname);
    const canonical = `${SITE_URL}${config.path === '/' ? '/' : config.path}`;

    document.title = config.title;
    document.documentElement.lang = 'en-ZA';

    setMeta('meta[name="description"]', { name: 'description', content: config.description });
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: config.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: config.type === 'article' ? 'article' : 'website' });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'ENASH' });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_ZA' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: config.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: config.description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
    setMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    setMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: config.title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: config.description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_IMAGE });

    setLink('canonical', canonical);
    setLink('alternate', canonical, { hreflang: 'en-ZA' });
    setLink('alternate', canonical, { hreflang: 'x-default' });

    let script = document.head.querySelector('#enash-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'enash-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLdFor(config));
  }, [pathname]);

  return null;
}
