import { CONFIG } from 'config';
import HeadComponent from 'next/head';

const Head = () => {
  return (
    <HeadComponent>
      <title>{CONFIG.APP}</title>
      <meta name="description" content={CONFIG.APP_DESCRIPTION} />
      <link rel="icon" href="/favicon.ico" />
    </HeadComponent>
  );
};

export { Head };
