import BG from 'assets/bg.png';
import GALAXY from 'assets/galaxy.png';
import {
    Header,
    InfoModal,
    LoginModal,
    MintButton,
    NFT,
    User,
    UserModal,
} from 'components';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAccount, setSelectedAccount } from 'store/slicers/account';

import styles from './Intro.module.scss';

export function Intro(): JSX.Element {
    const dispatch = useDispatch();
    const loginModal = useModal();
    const infoModal = useModal();
    const userModal = useModal();
    const [infoMessage, setInfoMessage] = useState<string>('CREATEREGISTER');

    const account = useSelector((state: RootState) => state.account.account);
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );

    useEffect(() => {
        const lStorage = localStorage.getItem('ClaveAccount');
        if (!lStorage) return;
        const accountData = JSON.parse(lStorage);

        if (
            accountData &&
            accountData.account &&
            (accountData.selectedAccount || accountData.selectedAccount === 0)
        ) {
            dispatch(setAccount(accountData.account));
            dispatch(setSelectedAccount(accountData.selectedAccount));
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            {account && (selectedAccount || selectedAccount === 0) && (
                <User userModal={userModal} />
            )}
            <LoginModal
                loginModal={loginModal}
                infoModal={infoModal}
                setInfoMessage={setInfoMessage}
            />
            <Header />
            <NFT />
            <MintButton
                open={loginModal.open}
                setInfoMessage={setInfoMessage}
                infoModal={infoModal}
            />
            <img src={BG.src} className={styles.bg}></img>
            <img src={GALAXY.src} className={styles.galaxy}></img>
            <UserModal
                modalController={userModal}
                setInfoMessage={setInfoMessage}
                infoModal={infoModal}
                loginModal={loginModal}
            />
            <InfoModal modalController={infoModal} info={infoMessage} />
        </div>
    );
}
