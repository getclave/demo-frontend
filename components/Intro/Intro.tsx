import { useModal } from '@ethylene/ui-hooks';
import BG from 'assets/bg.png';
import GALAXY from 'assets/galaxy.png';
import { Header, LoginModal, MintButton, NFT } from 'components';

import styles from './Intro.module.scss';

export function Intro(): JSX.Element {
    const loginModal = useModal();
    return (
        <div className={styles.wrapper}>
            <LoginModal modalController={loginModal} />
            <Header />
            <NFT />
            <MintButton open={loginModal.open} />
            <img src={BG.src} className={styles.bg}></img>
            <img src={GALAXY.src} className={styles.galaxy}></img>
        </div>
    );
}
