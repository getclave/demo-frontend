import { Container } from '@ethylene/components';
import { ERC20, ETHEREUM_MAINNET } from '@ethylene/constants';
import {
  useAddress,
  useConnection,
  useProvider,
  useSigner,
  useBalance,
  useOnAccountsChange,
} from '@ethylene/hooks';
import { useContractFunction } from '@ethylene/hooks/useContractFunction';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { NextPage } from 'next';
import { useEffect, useRef } from 'react';

const Components: NextPage = () => {
  const { connect, disconnect, isConnected } = useConnection();

  const provider = useProvider();
  const signer = useSigner();
  const address = useAddress();

  const { balance } = useBalance();

  useOnAccountsChange(() => window.location.reload());
  // const { switchTo, isRightNetwork } = useRightNetwork(ETHEREUM_MAINNET);

  const fn = useContractFunction<BigNumber>({
    abi: ERC20,
    address: '0xFeDFAF1A10335448b7FA0268F56D2B44DBD357de',
    method: 'balanceOf',
    onFail: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('here');
    },
  });

  useEffect(() => {
    if (address != null) {
      fn.read<[string | null]>(address);
    }
    // eslint-disable-next-line
  }, [address]);

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
      {/* <button onClick={switchTo}>Switch to right</button> */}
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
