import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { TextField } from '@mui/material';
import { ethers } from 'ethers';
import { useSetTransferTx } from 'hooks/useSetTransferTX';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Button } from 'ui';

import styles from './Transfer.module.scss';

export function Transfer({
    modalController,
    setPage,
}: {
    modalController: ModalController;
    setPage: (page: 'buttons' | 'transfer') => void;
}): JSX.Element {
    const account = useSelector((state: RootState) => state.account.account);
    const balance = useSelector((state: RootState) => state.account.balance);
    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const { transfer } = useSetTransferTx();

    const handleSend = async (): Promise<void> => {
        if (
            !account ||
            recipient.slice(0, 2) !== '0x' ||
            Number(ethers.utils.formatEther(balance.toString())) <
                Number(amount)
        ) {
            return;
        } else {
            await transfer(
                account?.address,
                recipient,
                ethers.utils.parseEther(amount),
            );
        }
    };
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.back}
                onClick={(): void => {
                    setPage('buttons');
                }}
            >
                <IoIosArrowBack size={16} />
            </div>
            <div className={styles.input}>
                <TextField
                    id="outlined-basic"
                    label="Recipient Address"
                    variant="outlined"
                    color="secondary"
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
                    color="secondary"
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
                // disabled={
                //     accountName === '' || isLoading || errorMessage !== ''
                // }
                width="120px"
                height="40px"
                color="purple"
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
