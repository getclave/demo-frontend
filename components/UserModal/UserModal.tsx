import FINGERPRINT from 'assets/fingerprint.png';
import { ethers } from 'ethers';
import type { ModalController } from 'hooks/useModal';
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
}: {
    modalController: ModalController;
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
                <img src={FINGERPRINT.src} alt="seal"></img>
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
                <Buttons modalController={modalController} setPage={setPage} />
            ) : (
                <Transfer modalController={modalController} setPage={setPage} />
            )}
        </Modal>
    );
}
