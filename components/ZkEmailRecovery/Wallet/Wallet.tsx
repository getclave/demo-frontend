import type { ModalController } from 'hooks/useModal';

import { Backup } from './Backup/Backup';
import { Feature } from './Feature/Feature';
import { Navbar } from './Navbar/Navbar';
import styles from './Wallet.module.scss';

export function Wallet({
    infoModal,
    setInfoMessage,
}: {
    infoModal: ModalController;
    setInfoMessage: (value: string) => void;
}): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <Feature infoModal={infoModal} setInfoMessage={setInfoMessage} />
            <div className={styles.line}></div>
            <Backup infoModal={infoModal} setInfoMessage={setInfoMessage} />
        </div>
    );
}
