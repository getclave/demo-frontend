import SEAL from 'assets/nft.png';
import { ethers } from 'ethers';
import { useGetBalance } from 'hooks/useGetBalance';
import type { ModalController } from 'hooks/useModal';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { parseAddress } from 'utils/parseAddress';

import styles from './User.module.scss';

export function User({
    userModal,
}: {
    userModal: ModalController;
}): JSX.Element {
    const account = useSelector((state: RootState) => state.account.account);
    const balance = useSelector((state: RootState) => state.account.balance);
    const { getBalance } = useGetBalance();

    useEffect(() => {
        if (!account) return;
        getBalance(account.address);
    }, [account]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.user} onClick={(): void => userModal.open()}>
                <div className={styles.balance}>
                    {ethers.utils.formatEther(balance.toString())} ETH
                </div>
                <div className={styles.account}>
                    <div className={styles.icon}>
                        <img src={SEAL.src} alt="seal"></img>
                    </div>
                    <div className={styles.address}>
                        {parseAddress(account ? account.address : '')}
                    </div>
                </div>
            </div>
        </div>
    );
}
