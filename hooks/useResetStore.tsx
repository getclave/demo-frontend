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
import {
    setZKAccount,
    setZKAuthenticationResponse,
    setZKBalance,
    setZKDeployedContractAddress,
    setZKRegistrationResponse,
    setZKSelectedAccount,
} from 'store/slicers/zkaccount';
import { setZKConnectionOption } from 'store/slicers/zkconnection';
import { ConnectionOptions } from 'types/connection';

export const useResetAllStore = (): {
    resetAllStore: () => void;
    zkResetAllStore: () => void;
} => {
    const dispatch = useDispatch();

    const resetAllStore = (): void => {
        dispatch(setAccount(undefined));
        dispatch(setAuthenticationResponse(null));
        dispatch(setBalance(0));
        dispatch(setDeployedContractAddress(null));
        dispatch(setRegistrationResponse(null));
        dispatch(setSelectedAccount(null));
        dispatch(setConnectionOption(ConnectionOptions.CONNECT));
    };

    const zkResetAllStore = (): void => {
        dispatch(setZKAccount(undefined));
        dispatch(setZKAuthenticationResponse(null));
        dispatch(setZKBalance(0));
        dispatch(setZKDeployedContractAddress(null));
        dispatch(setZKRegistrationResponse(null));
        dispatch(setZKSelectedAccount(null));
        dispatch(setZKConnectionOption(ConnectionOptions.CONNECT));
    };

    return { resetAllStore, zkResetAllStore };
};
