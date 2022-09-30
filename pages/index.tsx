import { Layout } from '@ethylene/components';
import { useConnection } from '@ethylene/hooks/useConnection';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { connect, disconnect, isConnected } = useConnection();
  return (
    <Layout>
      <button onClick={connect}>
        {' '}
        {isConnected ? 'Connected' : 'Connect'}
      </button>
      <button onClick={disconnect}> Disconnect</button>
    </Layout>
  );
};

export default Home;
