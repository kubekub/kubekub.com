import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [

    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
  
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
 

