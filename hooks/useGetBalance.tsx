import { CONFIG } from 'config';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { setBalance } from 'store/slicers/account';

interface trial {
    getBalance: (_address: string) => Promise<number>;
}

export const useGetBalance = (): trial => {
    const dispatch = useDispatch();
    const provider: ethers.providers.JsonRpcProvider =
        new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);

    const getBalance = async (_address: string): Promise<number> => {
        const balance = await provider.getBalance(_address);
        const toNumber = Number(balance.toString());
        dispatch(setBalance(toNumber));
        return Number(balance.toString());
    };

    return { getBalance };
};
