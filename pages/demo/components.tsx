import { Container } from '@ethylene/components';
import { useConnection } from '@ethylene/hooks';
import { NextPage } from 'next';
import { useRef } from 'react';

const Components: NextPage = () => {
  const { connect, isConnected } = useConnection({
    onConnect: () => {
      console.log('Connected');
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Container forwardedRef={ref}>components</Container>
      <button onClick={connect}>Connect</button>
    </div>
  );
};

export default Components;
