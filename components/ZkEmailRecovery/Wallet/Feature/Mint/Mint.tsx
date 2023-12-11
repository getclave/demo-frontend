import CLAVE from 'assets/nft2.png';
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

import styles from './Mint.module.scss';

export function Mint({
    setInfoMessage,
    infoModal,
}: {
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
}): JSX.Element {
    const dispatch = useDispatch();
    const notify = useNotify();
    const account = useSelector((state: RootState) => state.account.account);
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );

    const handleAuthentication = async (): Promise<void> => {
        if (!selectedAccount && selectedAccount !== 0) return;
        if (!account) return;
        try {
            setInfoMessage('MINTAUTH');
            infoModal.open();

            const challange: string = await getChallange(
                account?.address,
                '0x',
                BYTECODES.mintFunction,
            );
            const encodedChallenge: string = encodeChallenge(challange);
            const clientData = account.options[selectedAccount]?.client_id;
            const authenticationResponse = await authenticate(
                clientData ? [clientData] : [],
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
            if (res) {
                // notify.success('Minted successfully!');
                setInfoMessage('MINTED');
                setTimeout(() => {
                    infoModal.close();
                }, 3000);
            } else {
                notify.error('Something went wrong!');
                infoModal.close();
            }
        } catch (e) {
            console.log(e);
            infoModal.close();
        }
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.nft}>
                <img src={CLAVE.src} alt="logo"></img>
            </div>
            <Button
                color="special"
                width="120px"
                height="40px"
                className={styles.btn}
                onClick={async (): Promise<void> => {
                    await handleAuthentication();
                }}
            >
                Mint
            </Button>
        </div>
    );
}
