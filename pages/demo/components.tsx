import { Container } from '@ethylene/components';
import { useConnection, useSigner } from '@ethylene/hooks';
import { NextPage } from 'next';
import { useRef } from 'react';

const Components: NextPage = () => {
  const { connect, isConnected } = useConnection({
    onConnect: () => {
      console.log('Connected');
    },
  });

  const signer = useSigner();

  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Container forwardedRef={ref}>components</Container>
      <button onClick={connect}>Connect</button>
      <button onClick={() => console.log(signer)}>Signer</button>
    </div>
  );
};

export default Components;
