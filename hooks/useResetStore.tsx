import { useDispatch } from 'react-redux';
import {
    setAccount,
    setAuthenticationResponse,
    setBalance,
    setDeployedContractAddress,
    setRegistrationResponse,
    setSelectedAccount,
} from 'store/slicers/account';
import { setConnectionOption } from 'store/slicers/connection';
import { ConnectionOptions } from 'types/connection';

export const useResetAllStore = (): {
    resetAllStore: () => void;
} => {
    const dispatch = useDispatch();

    const resetAllStore = (): void => {
        dispatch(setAccount(undefined));
        dispatch(setAuthenticationResponse(null));
        dispatch(setBalance(0));
        dispatch(setDeployedContractAddress(null));
        dispatch(setRegistrationResponse(null));
        dispatch(setSelectedAccount(0));
        dispatch(setConnectionOption(ConnectionOptions.CONNECT));
    };

    return { resetAllStore };
};
