import type { ModalController } from '@ethylene/ui-hooks/useModal';
import DONE from 'assets/done.gif';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Modal } from 'ui';

import styles from './RemoveThis.module.scss';

export function RemoveThis({
    modalController,
}: {
    modalController: ModalController;
}): JSX.Element {
    const account = useSelector((state: RootState) => state.account.account);
    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <img src={DONE.src} alt="done"></img>
        </Modal>
    );
}
