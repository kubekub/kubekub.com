import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [

    {
      text: 'Home',
      href: '/',
    },

    {
      text: 'Technical',
      href: getPermalink('/technical'),
    },
    {
      text: 'Blueprint',
      href: getPermalink('/blueprint'),
    },

    {
      text: 'Emerging Patterns',
      href: getPermalink('/emerging-patterns'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Team',
      href: getPermalink('/team'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },    
  ]
  // ,
  // actions: [{ text: 'Download', href: 'https://github.com/arthelokyo/Kubekub', target: '_blank' }],
};

export const footerData = {}
 

