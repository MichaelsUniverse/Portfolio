import { useEffect } from 'react';

export function Title({ Title, Description }) {
  useEffect(() => {
    if (Title) document.title = Title;

    if (Description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', Description);
    }
  }, [Title, Description]);

  return null;
}