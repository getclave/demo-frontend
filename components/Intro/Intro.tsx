import { useModal } from '@ethylene/ui-hooks';
import BG from 'assets/bg.png';
import GALAXY from 'assets/galaxy.png';
import { Header, LoginModal, MintButton, NFT, User } from 'components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';

import styles from './Intro.module.scss';

export function Intro(): JSX.Element {
    const loginModal = useModal();
    const deployedContractAddress = useSelector(
        (state: RootState) => state.account.deployedContractAddress,
    );
    const account = useSelector((state: RootState) => state.account.account);
    useEffect(() => {
        if (!account) return;
        loginModal.close();
    }, [account]);
    return (
        <div className={styles.wrapper}>
            {account && <User />}
            <LoginModal modalController={loginModal} />
            <Header />
            <NFT />
            <MintButton open={loginModal.open} />
            <img src={BG.src} className={styles.bg}></img>
            <img src={GALAXY.src} className={styles.galaxy}></img>
        </div>
    );
}
