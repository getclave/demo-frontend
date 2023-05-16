import face from 'assets/lottie/face.json';
import { ethers } from 'ethers';
import type { ModalController } from 'hooks/useModal';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Modal } from 'ui';
import { parseAddress } from 'utils/parseAddress';

import { Buttons } from './Buttons/Buttons';
import { Transfer } from './Transfer/Transfer';
import styles from './UserModal.module.scss';

export function UserModal({
    modalController,
    setInfoMessage,
    infoModal,
    loginModal,
}: {
    modalController: ModalController;
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
    loginModal: ModalController;
}): JSX.Element {
    const account = useSelector((state: RootState) => state.account.account);
    const balance = useSelector((state: RootState) => state.account.balance);

    const [copy, setCopy] = useState<string>('Copy Address');
    const [page, setPage] = useState<'buttons' | 'transfer'>('buttons');

    useEffect(() => {
        if (copy === 'Copy Address') return;
        setTimeout(() => {
            setCopy('Copy Address');
        }, 1500);
    }, [copy]);

    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div className={styles.icon}>
                <Lottie
                    animationData={face}
                    loop={true}
                    style={{
                        width: '150px',
                        margin: '-50px',
                    }}
                />
            </div>
            <div className={styles.address}>
                {parseAddress(
                    account?.address ? account.address : '0xCla...ve',
                )}
            </div>
            <div className={styles.balance}>
                {ethers.utils.formatEther(balance.toString())} ETH
            </div>
            {page === 'buttons' ? (
                <Buttons
                    modalController={modalController}
                    setPage={setPage}
                    loginModal={loginModal}
                />
            ) : (
                <Transfer
                    modalController={modalController}
                    setPage={setPage}
                    setInfoMessage={setInfoMessage}
                    infoModal={infoModal}
                />
            )}
        </Modal>
    );
}
