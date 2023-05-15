import { BYTECODES } from 'constants/bytecode';
import { useNotify } from 'hooks';
import type { ModalController } from 'hooks/useModal';
import {
    authenticate,
    getChallange,
    sendUserOpToEntrypoint,
} from 'module/webauthn';
import { encodeChallenge } from 'module/webauthnUtils';
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
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );
    const registrationResponse = useSelector(
        (state: RootState) => state.account.registrationResponse,
    );

    const handleAuthentication = async (): Promise<void> => {
        if (!account || !selectedAccount) return;
        try {
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
                // notify.success('Minted successfully!');
                setInfoMessage('MINTED');
                setTimeout(() => {
                    infoModal.close();
                }, 3000);
            } else {
                infoModal.close();
                notify.error('Something went wrong!');
            }
        } catch (e) {
            console.log(e);
            infoModal.close();
        }
    };
    return (
        <Button
            className={styles.wrapper}
            // loading={!account ? false : loading}
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
