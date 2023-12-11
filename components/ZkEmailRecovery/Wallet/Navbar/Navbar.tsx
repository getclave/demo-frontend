import CLAVE from 'assets/clave-black-logo.png';
import { ethers } from 'ethers';
import { useResetAllStore } from 'hooks/useResetStore';
import { useBalanceQuery } from 'queries';
import { useEffect, useState } from 'react';
import { ImExit } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setBalance } from 'store/slicers/account';
import { parseAddress } from 'utils/parseAddress';

import styles from './Navbar.module.scss';

export function Navbar(): JSX.Element {
    const dispatch = useDispatch();
    const { zkResetAllStore } = useResetAllStore();
    const [copy, setCopy] = useState<'Copy' | 'Copied!'>('Copy');
    const account = useSelector((state: RootState) => state.zkaccount.account);
    const { balance } = useBalanceQuery(
        account?.address ? account.address : '',
    );

    useEffect(() => {
        if (!account) return;
        dispatch(setBalance(Number(balance.toString())));
    }, [balance]);

    useEffect(() => {
        if (copy === 'Copy') return;
        setTimeout(() => {
            setCopy('Copy');
        }, 1500);
    }, [copy]);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.user}
                onClick={(): void => {
                    if (!account) return;
                    navigator.clipboard.writeText(account?.address);
                    setCopy('Copied!');
                }}
            >
                <div className={styles.balance}>
                    {ethers.utils.formatEther(balance.toString())} ETH
                </div>
                <div className={styles.account}>
                    <div className={styles.icon}>
                        <img src={CLAVE.src} alt="logo"></img>
                    </div>
                    <div className={styles.address}>
                        {copy === 'Copy'
                            ? parseAddress(account ? account.address : '')
                            : copy}
                    </div>
                </div>
            </div>
            <div
                className={styles.logout}
                onClick={(): void => {
                    localStorage.removeItem('ClaveAccount');
                    zkResetAllStore();
                }}
            >
                <ImExit />
            </div>
        </div>
    );
}
