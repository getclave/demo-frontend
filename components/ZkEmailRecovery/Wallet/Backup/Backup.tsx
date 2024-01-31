import type { ModalController } from 'hooks/useModal';
import { useState } from 'react';

import { AddBackup } from './AddBackup/AddBackup';
import styles from './Backup.module.scss';
import { CreateZkEmail } from './CreateZkEmail/CreateZkEmail';

export function Backup({
    infoModal,
    setInfoMessage,
}: {
    infoModal: ModalController;
    setInfoMessage: (value: string) => void;
}): JSX.Element {
    const [step, setStep] = useState<'create' | 'add'>('create');
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}> ZK Email Backup</div>
            {step === 'create' ? (
                <CreateZkEmail
                    infoModal={infoModal}
                    setInfoMessage={setInfoMessage}
                    setStep={setStep}
                />
            ) : (
                <AddBackup
                    infoModal={infoModal}
                    setInfoMessage={setInfoMessage}
                    setStep={setStep}
                />
            )}
        </div>
    );
}
