import type { ModalController } from 'hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Modal, Spinner } from 'ui';

import styles from './InfoModal.module.scss';

const MESSAGES: { [key: string]: string } = {
    CREATEREGISTER:
        'Create a new key pair with your fingerprint on your device',
    CREATEAUTH: 'Sign the transaction to create a new contract',
    MINTAUTH: 'Sign the transaction to mint NFT',
    TXSENT: 'The transaction has been sent. Please wait for confirmation',
};
export function InfoModal({
    modalController,
    info,
}: {
    modalController: ModalController;
    info: string;
}): JSX.Element {
    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div className={styles.message}>{MESSAGES[info]}</div>
            {info !== 'TXSENT' && (
                <div className={styles.toDo}>
                    Touch ID or enter your password to allow this.
                </div>
            )}
            <div>
                <Spinner size={20} />
            </div>
        </Modal>
    );
}
