import type { ModalController } from 'hooks/useModal';
import { useState } from 'react';

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
    const [isBackup, setIsBackup] = useState<boolean>(false);
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.buttons}>
                <div
                    className={!isBackup ? styles.active : styles.deactive}
                    onClick={(): void => {
                        setIsBackup(false);
                    }}
                >
                    Features
                </div>
                <div
                    className={isBackup ? styles.active : styles.deactive}
                    onClick={(): void => {
                        setIsBackup(true);
                    }}
                >
                    Backup
                </div>
            </div>
            {isBackup ? (
                <Backup infoModal={infoModal} setInfoMessage={setInfoMessage} />
            ) : (
                <Feature
                    infoModal={infoModal}
                    setInfoMessage={setInfoMessage}
                />
            )}
        </div>
    );
}
