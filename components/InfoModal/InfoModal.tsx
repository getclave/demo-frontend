import fingerprinting from 'assets/lottie/fingerprinting.json';
import loading from 'assets/lottie/loading.json';
import successful from 'assets/lottie/successful.json';
import transfered from 'assets/lottie/transfer.json';
import wallet from 'assets/lottie/wallet.json';
import type { ModalController } from 'hooks/useModal';
import Lottie from 'lottie-react';
import { Modal } from 'ui';

import styles from './InfoModal.module.scss';

const MESSAGES: { [key: string]: string } = {
    CREATEREGISTER:
        'Create a new key pair with your fingerprint on your device',
    CREATEAUTH: 'Sign the transaction to create a new account',
    MINTAUTH: 'Sign the transaction to mint NFT',
    TXSENT: 'The transaction has been sent. Please wait for confirmation',
    SENDTX: 'Sign the transaction to make the transfer',
    MINTED: "You've successfully minted NFT",
    AUTHED: 'Device authorized successfully',
    AUTH: 'Verify that you own the account',
    LOGINED: 'You have successfully logged in',
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
    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div className={styles.step}>{STEP[info]}</div>
            <div className={styles.message}>{MESSAGES[info]}</div>
            {info !== 'TXSENT' &&
                info !== 'CREATEDWALLET' &&
                info !== 'TRANSFERED' &&
                info !== 'MINTED' &&
                info !== 'AUTHED' &&
                'LOGINED' !== info && (
                    <div className={styles.toDo}>
                        Touch ID or enter your password to allow this.
                    </div>
                )}
            <div className={styles.animation}>
                {'MINTAUTH' === info ||
                    'CREATEREGISTER' === info ||
                    'SENDTX' === info ||
                    'CREATEAUTH' === info ||
                    (info === 'AUTH' && (
                        <Lottie
                            animationData={fingerprinting}
                            loop={true}
                            style={{
                                width: '120px',
                                margin: '-20px',
                                marginBottom: '-40px',
                            }}
                        />
                    ))}
                {'TXSENT' === info && (
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
