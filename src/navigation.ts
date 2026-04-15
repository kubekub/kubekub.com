import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

type Locale = 'en' | 'es';

const localizePath = (locale: Locale, path: string) => {
  if (locale === 'es') {
    return path === '/' ? '/es' : `/es${path}`;
  }
  return path;
};

export const getHeaderData = (locale: Locale = 'en') => {
  if (locale === 'es') {
    return {
      links: [
        {
          text: 'Inicio',
          href: localizePath(locale, '/'),
        },
        {
          text: 'Técnico',
          href: localizePath(locale, '/technical'),
        },
        {
          text: 'Blueprint',
          href: localizePath(locale, '/blueprint'),
        },
        {
          text: 'Patrones',
          href: localizePath(locale, '/emerging-patterns'),
        },
        {
          text: 'Blog',
          href: localizePath(locale, '/blog'),
        },
        {
          text: 'Equipo',
          href: localizePath(locale, '/team'),
        },
        {
          text: 'Contacto',
          href: localizePath(locale, '/contact'),
        },
      ],
    };
  }

  return {
    links: [
      {
        text: 'Home',
        href: localizePath(locale, '/'),
      },
      {
        text: 'Technical',
        href: localizePath(locale, '/technical'),
      },
      {
        text: 'Blueprint',
        href: localizePath(locale, '/blueprint'),
      },
      {
        text: 'Emerging Patterns',
        href: localizePath(locale, '/emerging-patterns'),
      },
      {
        text: 'Blog',
        href: localizePath(locale, '/blog'),
      },
      {
        text: 'Team',
        href: localizePath(locale, '/team'),
      },
      {
        text: 'Contact',
        href: localizePath(locale, '/contact'),
      },
    ],
  };
};

export const headerData = getHeaderData('en');

export const footerData = {}
 

