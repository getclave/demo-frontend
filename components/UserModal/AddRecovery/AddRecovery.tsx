import { TextField } from '@mui/material';
import type { ModalController } from 'hooks/useModal';
import {
    authenticate,
    getChallange,
    sendUserOpToEntrypoint,
} from 'module/webauthn';
import { encodeChallenge } from 'module/webauthnUtils';
import { useMemo, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Button } from 'ui';

import type { RootState } from '../../../store/index';
import styles from './AddRecovery.module.scss';
import { getCreateEmailLink } from './createLink';

export function AddRecovery({
    modalController,
    setPage,
    setInfoMessage,
    infoModal,
}: {
    modalController: ModalController;
    setPage: (page: 'buttons' | 'transfer' | 'addRecovery') => void;
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
}): JSX.Element {
    const [state, setState] = useState<'add' | 'create'>('create');
    const [guardian, setGuardian] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const account = useSelector((state: RootState) => state.account.account);

    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );

    const handleCreate = async (): Promise<void> => {
        const [, sendLink] = getCreateEmailLink(email);
        window.open(sendLink, '_blank');
    };

    const handleAlreadyCreated = async (): Promise<void> => {
        setState('add');
    };

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

        setPage('buttons');
    };

    const isValidEmail = useMemo(() => {
        return email.includes('@') && email.includes('.');
    }, [email]);

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
            {state === 'create' ? (
                <div className={styles.createZkEmail}>
                    <div className={styles.flex}>
                        <div className={styles.input}>
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                color="secondary"
                                className={styles.inputField}
                                size="small"
                                value={email}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>,
                                ): void => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>
                        <Button
                            width="160px"
                            height="40px"
                            color="purple"
                            onClick={handleCreate}
                            disabled={!isValidEmail}
                        >
                            Create
                        </Button>
                    </div>
                    <div className={styles.line}></div>
                    <Button
                        width="160px"
                        height="40px"
                        color="purple"
                        onClick={handleAlreadyCreated}
                    >
                        Already Created
                    </Button>
                </div>
            ) : (
                <>
                    <div className={styles.input}>
                        <TextField
                            id="outlined-basic"
                            label="Email Wallet Address"
                            variant="outlined"
                            color="secondary"
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
                        // disabled={recipient === '' || amount === ''}
                        width="140px"
                        height="40px"
                        color="purple"
                        onClick={handleAddGuardian}
                    >
                        Add Backup
                    </Button>
                </>
            )}
        </div>
    );
}
