import type { Transaction, ethers } from 'ethers';
import { useNotify } from 'hooks/useNotify';
import {
    authenticate,
    getChallange,
    sendUserOpToEntrypoint,
} from 'module/webauthn';
import { abiEncoder } from 'module/webauthnHelper';
import type { HexString } from 'module/webauthnHelper';
import { encodeChallenge } from 'module/webauthnUtils';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAuthenticationResponse } from 'store/slicers/account';

export const useSetTransferTx = (): {
    encodeDirectTransactionCalldata: (
        to: string,
        value: ethers.BigNumber,
    ) => void;
    transfer: (
        _sender: string,
        _to: string,
        _value: ethers.BigNumber,
    ) => Promise<void>;
} => {
    const notify = useNotify();
    const dispatch = useDispatch();
    const registrationResponse = useSelector(
        (state: RootState) => state.account.registrationResponse,
    );
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );
    const account = useSelector((state: RootState) => state.account.account);

    const encodeDirectTransactionCalldata = (
        to: string,
        value: ethers.BigNumber,
    ): HexString => {
        const encodedCalldata = abiEncoder(
            ['address', 'uint256', 'bytes'],
            [to, value, '0x'],
        );
        const EXECUTE_SELECTOR = '0xb61d27f6';

        return (EXECUTE_SELECTOR + encodedCalldata.slice(2)) as HexString;
    };

    const transfer = async (
        _sender: string,
        _to: string,
        _value: ethers.BigNumber,
    ): Promise<void> => {
        if (!account) return;
        const calldata = encodeDirectTransactionCalldata(_to, _value);

        const challange: string = await getChallange(_sender, '0x', calldata);
        const encodedChallenge: string = encodeChallenge(challange);
        const authenticationResponse = await authenticate(
            registrationResponse ? registrationResponse.credential.id : '',
            encodedChallenge,
        );

        dispatch(setAuthenticationResponse(authenticationResponse));
        const res: Transaction = await sendUserOpToEntrypoint(
            challange,
            account.options[selectedAccount].public_key,
            encodedChallenge,
            authenticationResponse.signature,
            authenticationResponse.authenticatorData,
            authenticationResponse.clientData,
            account?.address,
            calldata,
        );
        if (res) {
            notify.success('Transfer successful');
        } else {
            notify.error('Transfer failed');
        }
    };

    return { encodeDirectTransactionCalldata, transfer };
};
