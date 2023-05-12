import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { useResetAllStore } from 'hooks/useResetStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Input } from 'ui';

import styles from './Transfer.module.scss';

export function Transfer({
    modalController,
    setPage,
}: {
    modalController: ModalController;
    setPage: (page: 'buttons' | 'transfer') => void;
}): JSX.Element {
    const account = useSelector((state: RootState) => state.account.account);
    const [copy, setCopy] = useState<string>('Copy Address');
    const { resetAllStore } = useResetAllStore();

    useEffect(() => {
        if (copy === 'Copy Address') return;
        setTimeout(() => {
            setCopy('Copy Address');
        }, 1500);
    }, [copy]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <div> Recipient Address</div>
                <Input
                    // rightEl={<div>Hello</div>}
                    placeholder="Recipient Address"
                    height="35px"
                    color="light"
                ></Input>
            </div>
            <div className={styles.input}>
                <div>Amount</div>
                <Input
                    // rightEl={<div>Hello</div>}
                    placeholder="Amount"
                    height="35px"
                    color="light"
                ></Input>
            </div>
        </div>
    );
}
