import { Layout } from '@ethylene/core';
import { useTitle } from '@ethylene/hooks/useTitle';
import type { NextPage } from 'next';

const Example: NextPage = () => {
  useTitle('Example');

  return <Layout>Home</Layout>;
};

export default Example;
