import { Container } from '@ethylene/components';
import {
  useAddress,
  useConnection,
  useProvider,
  useSigner,
  useBalance,
  useOnAccountsChange,
} from '@ethylene/hooks';
import { formatEther } from 'ethers/lib/utils';
import { NextPage } from 'next';
import { useRef } from 'react';

const Components: NextPage = () => {
  const { connect, disconnect, isConnected } = useConnection({
    onConnect: () => {
      console.log('Connected');
    },
  });

  const { provider } = useProvider();
  const signer = useSigner();
  const address = useAddress();

  const { balance } = useBalance();

  useOnAccountsChange(() => window.location.reload());

  const ref = useRef<HTMLDivElement>(null);
  return (
    <Container forwardedRef={ref}>
      <div>Components</div>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>disconnect</button>
      <button onClick={() => console.log(provider)}>Provider</button>
      <button onClick={async () => console.log(await provider?.getNetwork())}>
        Chain
      </button>
      <button onClick={() => console.log(signer)}>Signer</button>
      <button onClick={() => console.log(address)}>Address</button>
      <div>
        {isConnected && (
          <div>
            <div>Connected: {address}</div>
            <div>Balance: {formatEther(balance)}</div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Components;
