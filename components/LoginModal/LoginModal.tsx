import type { ModalController } from '@ethylene/ui-hooks/useModal';
import FINGERPRINT from 'assets/fingerprint.png';
import { CreateAccount, SelectAccount } from 'components';
import { ConnectAccount } from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setConnectionOption } from 'store/slicers/connection';
import { ConnectionOptions } from 'types/connection';
import { Modal } from 'ui';

import styles from './LoginModal.module.scss';

export function LoginModal({
    loginModal,
    infoModal,
    setInfoMessage,
}: {
    loginModal: ModalController;
    infoModal: ModalController;
    setInfoMessage: (message: string) => void;
}): JSX.Element {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account.account);
    const connectionOption = useSelector(
        (state: RootState) => state.connection.connectionOption,
    );

    useEffect(() => {
        if (loginModal.isOpen === true) return;
        dispatch(setConnectionOption(ConnectionOptions.CONNECT));
    }, [loginModal.isOpen]);

    useEffect(() => {
        if (!account) {
            return;
        } else if (connectionOption === ConnectionOptions.CONNECT) {
            dispatch(setConnectionOption(ConnectionOptions.SELECT));
        } else {
            loginModal.close();
        }
    }, [account]);

    return (
        <Modal className={styles.wrapper} modalController={loginModal}>
            <div className={styles.header}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>Seal Kit</span>
            </div>
            {connectionOption === ConnectionOptions.CONNECT ? (
                <ConnectAccount />
            ) : connectionOption === ConnectionOptions.SELECT ? (
                <SelectAccount modalController={loginModal} />
            ) : (
                <CreateAccount infoModal={infoModal} setInfo={setInfoMessage} />
            )}
        </Modal>
    );
}
