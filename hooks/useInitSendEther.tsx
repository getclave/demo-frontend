import { CONFIG } from 'config';
import { ethers } from 'ethers';
import { provider } from 'restapi/index';

export const useInitSendEther = async (_address: string): Promise<void> => {
    const wallet: ethers.Wallet = new ethers.Wallet(
        CONFIG.PRIVATE_KEY,
        provider,
    );
    const tx: { to: string; value: ethers.BigNumber } = {
        to: _address,
        value: ethers.utils.parseEther('0.01'),
    };

    await wallet.sendTransaction(tx);
};
