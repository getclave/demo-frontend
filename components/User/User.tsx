import SEAL from 'assets/nft.png';
import { ethers } from 'ethers';
import type { ModalController } from 'hooks/useModal';
import { useBalanceQuery } from 'queries';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setBalance } from 'store/slicers/account';
import { parseAddress } from 'utils/parseAddress';

import styles from './User.module.scss';

export function User({
    userModal,
}: {
    userModal: ModalController;
}): JSX.Element {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account.account);
    const { balance } = useBalanceQuery(
        account?.address ? account.address : '',
    );

    useEffect(() => {
        if (!account) return;
        dispatch(setBalance(Number(balance.toString())));
    }, [balance]);

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
