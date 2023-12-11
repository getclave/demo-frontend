import { TextField } from '@mui/material';
import { ethers } from 'ethers';
import type { ModalController } from 'hooks/useModal';
import { useSetTransferTx } from 'hooks/useSetTransferTX';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Button } from 'ui';

import styles from './Transfer.module.scss';

export function Transfer({
    setInfoMessage,
    infoModal,
}: {
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
}): JSX.Element {
    const account = useSelector((state: RootState) => state.zkaccount.account);
    const balance = useSelector((state: RootState) => state.zkaccount.balance);
    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const { zktransfer } = useSetTransferTx();

    const handleSend = async (): Promise<void> => {
        if (
            !account ||
            recipient.slice(0, 2) !== '0x' ||
            Number(ethers.utils.formatEther(balance.toString())) <
                Number(amount)
        ) {
            return;
        } else {
            const reset = (): void => {
                setRecipient('');
                setAmount('');
            };
            await zktransfer(
                account?.address,
                recipient,
                ethers.utils.parseEther(amount),
                reset,
                setInfoMessage,
                infoModal,
            );
        }
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <TextField
                    id="outlined-basic"
                    label="Recipient Address"
                    variant="outlined"
                    className={styles.inputField}
                    size="small"
                    value={recipient}
                    onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setRecipient(event.target.value);
                    }}
                />
            </div>
            <div className={styles.input}>
                <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    className={styles.inputField}
                    size="small"
                    value={amount}
                    onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setAmount(event.target.value);
                    }}
                />
            </div>
            <Button
                disabled={recipient === '' || amount === ''}
                width="120px"
                height="40px"
                color="special"
                // loading={!accountName === null ? isLoading : false || loading}
                onClick={async (): Promise<void> => {
                    await handleSend();
                }}
            >
                Send
            </Button>
        </div>
    );
}
