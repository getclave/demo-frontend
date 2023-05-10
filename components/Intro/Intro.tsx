import { useModal } from '@ethylene/ui-hooks';
import BG from 'assets/bg.png';
import GALAXY from 'assets/galaxy.png';
import { Header, LoginModal, MintButton, NFT, User } from 'components';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { ConnectionOptions } from 'types/connection';

import styles from './Intro.module.scss';

export function Intro(): JSX.Element {
    const loginModal = useModal();
    const connectionOption = useSelector(
        (state: RootState) => state.connection.connectionOption,
    );

    const account = useSelector((state: RootState) => state.account.account);

    return (
        <div className={styles.wrapper}>
            {account && connectionOption !== ConnectionOptions.SELECT && (
                <User />
            )}
            <LoginModal modalController={loginModal} />
            <Header />
            <NFT />
            <MintButton open={loginModal.open} />
            <img src={BG.src} className={styles.bg}></img>
            <img src={GALAXY.src} className={styles.galaxy}></img>
        </div>
    );
}
