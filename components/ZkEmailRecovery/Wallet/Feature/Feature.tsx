import type { ModalController } from 'hooks/useModal';
import { useState } from 'react';

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
    const [isTransfer, setIsTransfer] = useState<boolean>(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                <div
                    className={!isTransfer ? styles.active : styles.deactive}
                    onClick={(): void => {
                        setIsTransfer(false);
                    }}
                >
                    Mint
                </div>
                <div
                    className={isTransfer ? styles.active : styles.deactive}
                    onClick={(): void => {
                        setIsTransfer(true);
                    }}
                >
                    Transfer
                </div>
            </div>
            {isTransfer ? (
                <Transfer
                    infoModal={infoModal}
                    setInfoMessage={setInfoMessage}
                />
            ) : (
                <Mint infoModal={infoModal} setInfoMessage={setInfoMessage} />
            )}
        </div>
    );
}
