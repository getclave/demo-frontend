import { TextField } from '@mui/material';
import { ethers } from 'ethers';
import type { ModalController } from 'hooks/useModal';
import {
    authenticate,
    getChallange,
    sendUserOpToEntrypoint,
} from 'module/webauthn';
import { encodeChallenge } from 'module/webauthnUtils';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'ui';

import type { RootState } from '../../../../../store/index';
import styles from './AddBackup.module.scss';

export function AddBackup({
    setInfoMessage,
    infoModal,
    setStep,
}: {
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
    setStep: (step: 'create' | 'add') => void;
}): JSX.Element {
    const [guardian, setGuardian] = useState<string>('');
    const account = useSelector((state: RootState) => state.account.account);

    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );

    const handleAddGuardian = async (): Promise<void> => {
        if (!account) return;
        if (!selectedAccount && selectedAccount !== 0) return;
        const prepareData = (thisAddress: string, guard: string): string => {
            const thisAddressNo0x =
                thisAddress.slice(0, 2) === '0x'
                    ? thisAddress.slice(2)
                    : thisAddress;
            const guardianNo0x = guard.slice(2);
            return `0xb61d27f6000000000000000000000000${thisAddressNo0x}0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000246cd9f3be000000000000000000000000${guardianNo0x}00000000000000000000000000000000000000000000000000000000`;
        };
        const calldata = prepareData(account?.address, guardian);
        const challange = await getChallange(account?.address, '0x', calldata);
        const encodedChallenge: string = encodeChallenge(challange);
        const clientData = account.options[selectedAccount]?.client_id;
        const authenticationResponse = await authenticate(
            clientData ? [clientData] : [],
            encodedChallenge,
        );

        await sendUserOpToEntrypoint(
            challange,
            account.options[selectedAccount].public_key,
            encodedChallenge,
            authenticationResponse.signature,
            authenticationResponse.authenticatorData,
            authenticationResponse.clientData,
            account?.address,
            calldata,
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.subtitle}>
                After creating the Email-Wallet, enter the wallet address in the
                mail you receive from sepolia@sendeth.org.
            </div>
            <div className={styles.input}>
                <TextField
                    id="outlined-basic"
                    label="Email Wallet Address"
                    variant="outlined"
                    className={styles.inputField}
                    size="small"
                    value={guardian}
                    onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setGuardian(event.target.value);
                    }}
                />
            </div>
            <Button
                disabled={
                    guardian.length !== 42 || !ethers.utils.isAddress(guardian)
                }
                width="140px"
                height="40px"
                color="special"
                onClick={handleAddGuardian}
            >
                Add Backup
            </Button>
            <div className={styles.line}></div>
            <Button
                width="80px"
                height="40px"
                color="special"
                onClick={(): void => {
                    setStep('create');
                }}
            >
                Back
            </Button>
        </div>
    );
}
