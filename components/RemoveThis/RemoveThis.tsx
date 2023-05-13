import DONE from 'assets/done.gif';
import type { ModalController } from 'hooks/useModal';
import { Modal } from 'ui';

import styles from './RemoveThis.module.scss';

export function RemoveThis({
    modalController,
}: {
    modalController: ModalController;
}): JSX.Element {
    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <img src={DONE.src} alt="done"></img>
        </Modal>
    );
}
