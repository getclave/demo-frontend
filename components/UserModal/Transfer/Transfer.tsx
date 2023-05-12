import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { TextField } from '@mui/material';
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
    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [copy, setCopy] = useState<string>('Copy Address');

    useEffect(() => {
        if (copy === 'Copy Address') return;
        setTimeout(() => {
            setCopy('Copy Address');
        }, 1500);
    }, [copy]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <TextField
                    id="outlined-basic"
                    label="Recipient Address"
                    variant="outlined"
                    color="secondary"
                    className={styles.inputField}
                    size="small"
                    value={recipient}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setRecipient(event.target.value);
                    }}
                />
            </div>
            <div className={styles.input}>
                <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    color="secondary"
                    className={styles.inputField}
                    size="small"
                    value={amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setAmount(event.target.value);
                    }}
                />
            </div>
        </div>
    );
}
