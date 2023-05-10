import { useNotify } from 'hooks';
import {
    authenticate,
    getChallange,
    sendUserOpToEntrypoint,
} from 'module/webauthn';
import { encodeChallenge } from 'module/webauthnUtils';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAuthenticationResponse } from 'store/slicers/account';

import styles from './MintButton.module.scss';

export function MintButton({ open }: { open: () => void }): JSX.Element {
    const dispatch = useDispatch();
    const notify = useNotify();
    const account = useSelector((state: RootState) => state.account.account);
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );
    const registrationResponse = useSelector(
        (state: RootState) => state.account.registrationResponse,
    );

    const handleAuthentication = async (): Promise<void> => {
        if (!account) return;
        const challange: string = await getChallange(account?.address);
        const encodedChallenge: string = encodeChallenge(challange);
        const authenticationResponse = await authenticate(
            registrationResponse ? registrationResponse.credential.id : '',
            encodedChallenge,
        );
        dispatch(setAuthenticationResponse(authenticationResponse));
        const res = await sendUserOpToEntrypoint(
            challange,
            account.options[selectedAccount].public_key,
            encodedChallenge,
            authenticationResponse.signature,
            authenticationResponse.authenticatorData,
            authenticationResponse.clientData,
            account?.address,
        );
        console.log(res, 'res');
        if (res) {
            notify.success('Minted successfully <3');
        } else {
            notify.error('something went wrong!');
        }
    };
    return (
        <div
            className={styles.wrapper}
            onClick={async (): Promise<void> => {
                if (!account) {
                    open();
                } else {
                    await handleAuthentication();
                }
            }}
        >
            {account ? 'Mint' : 'Connect'}
        </div>
    );
}
