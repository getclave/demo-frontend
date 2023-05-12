import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { BYTECODES } from 'constants/bytecode';
import { useNotify } from 'hooks';
import {
    authenticate,
    getChallange,
    sendUserOpToEntrypoint,
} from 'module/webauthn';
import { encodeChallenge } from 'module/webauthnUtils';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAuthenticationResponse } from 'store/slicers/account';
import { Button } from 'ui';

import styles from './MintButton.module.scss';

export function MintButton({
    open,
    setInfoMessage,
    infoModal,
}: {
    open: () => void;
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
}): JSX.Element {
    const dispatch = useDispatch();
    const notify = useNotify();
    const account = useSelector((state: RootState) => state.account.account);
    const [loading, setLoading] = useState<boolean>(false);
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );
    const registrationResponse = useSelector(
        (state: RootState) => state.account.registrationResponse,
    );

    const handleAuthentication = async (): Promise<void> => {
        if (!account) return;
        try {
            setLoading(true);
            setInfoMessage('MINTAUTH');
            infoModal.open();

            const challange: string = await getChallange(
                account?.address,
                '0x',
                BYTECODES.mintFunction,
            );
            const encodedChallenge: string = encodeChallenge(challange);
            const authenticationResponse = await authenticate(
                registrationResponse ? registrationResponse.credential.id : '',
                encodedChallenge,
            );

            setInfoMessage('TXSENT');
            dispatch(setAuthenticationResponse(authenticationResponse));
            const res = await sendUserOpToEntrypoint(
                challange,
                account.options[selectedAccount].public_key,
                encodedChallenge,
                authenticationResponse.signature,
                authenticationResponse.authenticatorData,
                authenticationResponse.clientData,
                account?.address,
                BYTECODES.mintFunction,
            );
            console.log(res, 'res');
            if (res) {
                setLoading(false);
                infoModal.close();
                notify.success('Minted successfully!');
            } else {
                setLoading(false);
                infoModal.close();
                notify.error('Something went wrong!');
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            infoModal.close();
        }
    };
    return (
        <Button
            className={styles.wrapper}
            loading={!account ? false : loading}
            onClick={async (): Promise<void> => {
                if (!account) {
                    open();
                } else {
                    await handleAuthentication();
                }
            }}
        >
            {account ? 'Mint' : 'Connect'}
        </Button>
    );
}
