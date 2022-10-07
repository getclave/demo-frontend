import { Container } from '@ethylene/components';
import {
  AVAX_FUJI_C_CHAIN,
  ERC20,
  ETHEREUM_MAINNET,
} from '@ethylene/constants';
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
import Moralis from 'moralis';
import { CONFIG } from 'config';
import { EvmChain } from '@moralisweb3/evm-utils';
import { useRightNetwork } from '@ethylene/hooks/useRightNetwork';

const Components: NextPage = () => {
  const { connect, disconnect, isConnected } = useConnection({
    onConnect: () => {
      console.log('Connected');
    },
  });

  const provider = useProvider();
  const signer = useSigner();
  const address = useAddress();

  const { balance } = useBalance();

  useOnAccountsChange(() => window.location.reload());
  const { switchTo, isRightNetwork } = useRightNetwork(ETHEREUM_MAINNET);

  useEffect(() => {
    if (provider == null) return;
    console.log('here');
    const fetch = async () => {
      const res = await provider.send('eth_chainId', []);
      console.log(res);
    };
    fetch();
  }, [provider]);

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
  }, [address]);

  const test = async () => {
    Moralis.start({
      apiKey: CONFIG.MORALIS?.API_KEY,
    });
    const params = {
      address: address as string,
      chain: EvmChain.FUJI,
    };
    const response = await Moralis.EvmApi.balance.getNativeBalance(params);

    console.log(fn.isLoading);
    console.log(response);
  };

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
      <button onClick={async () => await test()}>Test</button>
      <button onClick={switchTo}>Test</button>
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
