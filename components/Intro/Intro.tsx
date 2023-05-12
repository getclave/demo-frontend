import { useModal } from '@ethylene/ui-hooks';
import BG from 'assets/bg.png';
import GALAXY from 'assets/galaxy.png';
import {
    Header,
    InfoModal,
    LoginModal,
    MintButton,
    NFT,
    RemoveThis,
    User,
    UserModal,
} from 'components';
import { useEffect, useState } from 'react';
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
    const auth = useSelector(
        (state: RootState) => state.account.authenticationResponse,
    );

    return (
        <div className={styles.wrapper}>
            {account && <User userModal={userModal} />}
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
            <InfoModal modalController={infoModal} info={infoMessage} />
            <UserModal modalController={userModal} />
        </div>
    );
}
