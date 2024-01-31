import type { ModalController } from 'hooks/useModal';

import styles from './Feature.module.scss';
import { Mint } from './Mint/Mint';
import { Transfer } from './Transfer/Transfer';

export function Feature({
    infoModal,
    setInfoMessage,
}: {
    infoModal: ModalController;
    setInfoMessage: (value: string) => void;
}): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <Transfer infoModal={infoModal} setInfoMessage={setInfoMessage} />
            <div className={styles.line}></div>
            <Mint infoModal={infoModal} setInfoMessage={setInfoMessage} />
        </div>
    );
}
