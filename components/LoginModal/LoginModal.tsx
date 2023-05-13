import FINGERPRINT from 'assets/fingerprint.png';
import { CreateAccount, SelectAccount } from 'components';
import { ConnectAccount } from 'components';
import type { ModalController } from 'hooks/useModal';
import { useEffect, useState } from 'react';
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
    const [accountName, setAccountName] = useState<string>('');
    const connectionOption = useSelector(
        (state: RootState) => state.connection.connectionOption,
    );

    useEffect(() => {
        setAccountName('');
        if (loginModal.isOpen === true) return;
        dispatch(setConnectionOption(ConnectionOptions.CONNECT));
    }, [loginModal.isOpen]);

    useEffect(() => {
        if (!account) {
            return;
        } else if (connectionOption !== ConnectionOptions.SELECT) {
            loginModal.close();
        }
    }, [account]);

    useEffect(() => {
        if (connectionOption === ConnectionOptions.SELECT) {
            setAccountName('');
        }
    }, [connectionOption]);

    return (
        <Modal className={styles.wrapper} modalController={loginModal}>
            <div className={styles.header}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>Clave Kit</span>
            </div>
            {connectionOption === ConnectionOptions.CONNECT ? (
                <ConnectAccount
                    accountName={accountName}
                    setAccountName={setAccountName}
                />
            ) : connectionOption === ConnectionOptions.SELECT ? (
                <SelectAccount modalController={loginModal} />
            ) : (
                <CreateAccount
                    infoModal={infoModal}
                    setInfo={setInfoMessage}
                    accountName={accountName}
                    setAccountName={setAccountName}
                />
            )}
        </Modal>
    );
}
