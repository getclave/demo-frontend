import fingerprinting from 'assets/lottie/fingerprinting.json';
import loading from 'assets/lottie/loading.json';
import successful from 'assets/lottie/successful.json';
import transfered from 'assets/lottie/transfer.json';
import wallet from 'assets/lottie/wallet.json';
import type { ModalController } from 'hooks/useModal';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { Modal } from 'ui';

import styles from './InfoModal.module.scss';

const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

const MESSAGES: { [key: string]: string } = {
    CREATEREGISTER:
        'Create a new key pair with your fingerprint on your device',
    CREATEAUTH: 'Sign the transaction to create a new account',
    STARTRECOVERY:
        'Send email to recover your accout. You can start using your account again 30 sn after sending the email.',
    MINTAUTH: 'Sign the transaction to mint NFT',
    TXSENT: 'The transaction has been sent. Wait for confirmation on Sepolia',
    SENDTX: 'Sign the transaction to make the transfer',
    MINTED: "You've successfully minted NFT",
    AUTHED: 'Device authorized successfully',
    AUTH: 'Verify that you own the account',
    LOGINED: 'You have successfully logged in',
    ADDGUARDIAN: 'Sign the transaction to add guardian',
    CREATEANDADDGUARDIAN:
        'Send email to create Email-Wallet. \n After the wallet is created, sign the transaction to add it as a guardian.',
};
const STEP: { [key: string]: string } = {
    CREATEREGISTER: '1/2',
    CREATEAUTH: '2/2',
};
export function InfoModal({
    modalController,
    info,
}: {
    modalController: ModalController;
    info: string;
}): JSX.Element {
    const [count, setCount] = useState(30);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCount(30);
        }
    }, [count]);

    useEffect(() => {
        if (info === 'CREATEANDADDGUARDIAN') {
            setCount(90);
        } else {
            setCount(30);
        }
    }, [info]);

    const isCloseWork = useMemo(() => {
        if (info === 'CREATEANDADDGUARDIAN') {
            return false;
        } else {
            return true;
        }
    }, [info]);
    return (
        <Modal
            className={styles.wrapper}
            modalController={modalController}
            closeOnClickOutside={isCloseWork}
        >
            <div className={styles.step}>{STEP[info]}</div>
            <div className={styles.message}>{MESSAGES[info]}</div>
            {(info === 'TXSENT' || info === 'CREATEANDADDGUARDIAN') && (
                <div className={styles.timer}>{count}</div>
            )}
            {info !== 'TXSENT' &&
                info !== 'CREATEDWALLET' &&
                info !== 'TRANSFERED' &&
                info !== 'MINTED' &&
                info !== 'ADDGUARDIAN' &&
                info !== 'AUTHED' &&
                info !== 'STARTRECOVERY' &&
                'LOGINED' !== info && (
                    <div className={styles.toDo}>
                        Touch ID or enter your password to allow this.
                    </div>
                )}
            <div className={styles.animation}>
                {('MINTAUTH' === info ||
                    'CREATEREGISTER' === info ||
                    'SENDTX' === info ||
                    'ADDGUARDIAN' === info ||
                    'CREATEAUTH' === info ||
                    'CREATEANDADDGUARDIAN' === info ||
                    info === 'AUTH') && (
                    <Lottie
                        animationData={fingerprinting}
                        loop={true}
                        style={{
                            width: '120px',
                            margin: '-20px',
                            marginBottom: '-40px',
                        }}
                    />
                )}
                {('TXSENT' === info || 'STARTRECOVERY' === info) && (
                    <Lottie
                        animationData={loading}
                        loop={true}
                        style={{
                            width: '150px',
                            margin: '-30px',
                            marginBottom: '-40px',
                        }}
                    />
                )}
                {'CREATEDWALLET' === info && (
                    <Lottie
                        animationData={wallet}
                        loop={true}
                        style={{
                            width: '300px',
                            margin: '-50px',
                        }}
                    />
                )}
                {'TRANSFERED' === info && (
                    <Lottie
                        animationData={transfered}
                        loop={true}
                        style={{
                            width: '300px',
                            margin: '-50px',
                        }}
                    />
                )}
                {('MINTED' === info ||
                    info === 'AUTHED' ||
                    'LOGINED' === info) && (
                    <Lottie
                        animationData={successful}
                        loop={true}
                        style={{
                            width: '60px',
                            marginBottom: '-20px',
                        }}
                    />
                )}
            </div>
        </Modal>
    );
}
