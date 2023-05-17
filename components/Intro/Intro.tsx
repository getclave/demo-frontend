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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { ConnectionOptions } from 'types/connection';

import styles from './Intro.module.scss';

export function Intro(): JSX.Element {
    const loginModal = useModal();
    const infoModal = useModal();
    const userModal = useModal();
    const [infoMessage, setInfoMessage] = useState<string>('CREATEREGISTER');
    const connectionOption = useSelector(
        (state: RootState) => state.connection.connectionOption,
    );

    const account = useSelector((state: RootState) => state.account.account);
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );

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
