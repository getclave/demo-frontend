import { CONFIG } from 'config';
import { useEffect } from 'react';

export const useStyling = (): void => {
    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.append(`
      h1, h2, h3, h4, h5, h6, input, p, span, div {
        font-family: ${CONFIG.FONT_FAMILY}
      }
    `);
        document.head.append(styleEl);
    }, []);
};
