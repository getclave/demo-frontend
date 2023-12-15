import { TextField } from '@mui/material';
import { Alchemy, Network } from 'alchemy-sdk';
import { CONFIG } from 'config';
import { ABIs } from 'constants/abi';
import { ADDRESSES } from 'constants/address';
import { ethers } from 'ethers';
import { useNotify } from 'hooks';
import { type ModalController } from 'hooks/useModal';
import {
    authenticate,
    getChallange,
    sendUserOpToEntrypoint,
} from 'module/webauthn';
import { encodeChallenge } from 'module/webauthnUtils';
import { useGetLogsMutation } from 'queries';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { opProvider, provider } from 'restapi';
import { type RootState } from 'store';
import { Button } from 'ui';

import styles from './CreateZkEmail.module.scss';
import { getCreateEmailLink } from './createLink';

const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_FOR_SEPOLIA,
    network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

const wallet: ethers.Wallet = new ethers.Wallet(CONFIG.PRIVATE_KEY, opProvider);

const dbContract = new ethers.Contract(
    ADDRESSES.dbContract,
    ABIs.dbContract,
    wallet,
);

export function CreateZkEmail({
    setInfoMessage,
    infoModal,
    setStep,
}: {
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
    setStep: (step: 'create' | 'add') => void;
}): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const notify = useNotify();
    const getLogsMutation = useGetLogsMutation();
    const account = useSelector((state: RootState) => state.zkaccount.account);
    const selectedAccount = useSelector(
        (state: RootState) => state.zkaccount.selectedAccount,
    );

    const trial = async (): Promise<void> => {
        const address = account?.address;
        if (!address) return;
        let walletAddress: string | undefined;
        const block = await provider.getBlockNumber();
        setInfoMessage('ADDGUARDIAN');
        infoModal.open();
        let internalCount = 0;

        await dbContract.update();
        const receipt = await dbContract.isAlone();

        if (!receipt) {
            await handleCreate();
        } else {
            const [, sendLink] = getCreateEmailLink(email);
            window.open(sendLink, '_blank');
        }

        const interval = setInterval(async () => {
            if (internalCount > 16) clearInterval(interval);
            internalCount++;
            const logs = await getLogsMutation.mutateAsync({
                block: block,
                address: '0x50ea0748316e3d6823cc27CE3A8ceA5EE3b1B792',
            });
            const data = logs as Array<{
                transactionHash: string;
                topics: Array<string>;
            }>;

            if (data.length > 0) {
                const checkData =
                    '0xa67edfb1574973cc13ebf7c178328ec2097c4c164d9595c006e65c0ff02fba66';
                const lastDataLogs = data[data.length - 1]?.topics;
                const realIndex = lastDataLogs.includes(checkData) ? 1 : 2;
                const lastData = data[data.length - realIndex]?.transactionHash;
                if (lastData == null) return;
                const tx = await alchemy.core.getTransactionReceipt(lastData);
                walletAddress = tx?.logs[0].address;
            }

            if (walletAddress != null) {
                console.log('recoverer address: ', walletAddress);
                handleAddGuardian(walletAddress);
                clearInterval(interval);
            } else {
                console.log('interval: ', internalCount);
            }
        }, 10000);
    };

    const handleCreate = async (): Promise<void> => {
        const [, sendLink] = getCreateEmailLink(email);
        window.open(sendLink, '_blank');
        setTimeout(() => {
            setStep('add');
        }, 2500);
    };

    const handleAddGuardian = async (guardian: string): Promise<void> => {
        if (!account) return;
        if (!selectedAccount && selectedAccount !== 0) return;
        try {
            const prepareData = (
                thisAddress: string,
                guard: string,
            ): string => {
                const thisAddressNo0x =
                    thisAddress.slice(0, 2) === '0x'
                        ? thisAddress.slice(2)
                        : thisAddress;
                const guardianNo0x = guard.slice(2);
                return `0xb61d27f6000000000000000000000000${thisAddressNo0x}0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000246cd9f3be000000000000000000000000${guardianNo0x}00000000000000000000000000000000000000000000000000000000`;
            };
            setInfoMessage('ADDGUARDIAN');
            infoModal.open();
            const calldata = prepareData(account?.address, guardian);
            const challange = await getChallange(
                account?.address,
                '0x',
                calldata,
            );
            const encodedChallenge: string = encodeChallenge(challange);
            const clientData = account.options[selectedAccount]?.client_id;
            const authenticationResponse = await authenticate(
                clientData ? [clientData] : [],
                encodedChallenge,
            );
            setInfoMessage('TXSENT');
            const res = await sendUserOpToEntrypoint(
                challange,
                account.options[selectedAccount].public_key,
                encodedChallenge,
                authenticationResponse.signature,
                authenticationResponse.authenticatorData,
                authenticationResponse.clientData,
                account?.address,
                calldata,
            );
            if (res) {
                notify.success('Guardian added');
                setInfoMessage('TRANSFERED');
                setStep('create');
                setTimeout(() => {
                    infoModal.close();
                }, 2500);
            }
        } catch (e) {
            console.log(e);
            infoModal.close();
            notify.error('Guardian not added');
        }
    };

    const isValidEmail = useMemo(() => {
        return email.includes('@') && email.includes('.');
    }, [email]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.subtitle}>
                Have you created Email-Wallet before?
            </div>
            <div className={styles.createZkEmail}>
                <div className={styles.subtitle}>If yes, pass this step.</div>
                <Button
                    width="160px"
                    height="40px"
                    color="special"
                    onClick={(): void => {
                        setStep('add');
                    }}
                >
                    Already Created
                </Button>
                <div className={styles.line}></div>
                <div className={styles.subtitle}>
                    If no, enter your email and send it. After you receive
                    email, sign tx to add backup.
                </div>
                <div className={styles.flex}>
                    <div className={styles.input}>
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
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
                        width="220px"
                        height="40px"
                        color="special"
                        onClick={trial}
                        disabled={!isValidEmail}
                    >
                        Create and Add Backup
                    </Button>
                </div>
            </div>
        </div>
    );
}
