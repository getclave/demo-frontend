import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Modal, Spinner } from 'ui';

import styles from './InfoModal.module.scss';

const MESSAGES: { [key: string]: string } = {
    CREATEREGISTER:
        'Create a new key pair with your fingerprint on your device',
    CREATEAUTH: 'Sign the transaction to create a new contract',
    MINTAUTH: 'Sign the transaction to mint NFT',
};
export function InfoModal({
    modalController,
    info,
}: {
    modalController: ModalController;
    info: string;
}): JSX.Element {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account.account);

    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div className={styles.message}>{MESSAGES[info]}</div>
            <div className={styles.toDo}>
                Touch ID or etner your password to allow this.
            </div>
            <div>
                <Spinner size={20} />
            </div>
        </Modal>
    );
}
