import BG from 'assets/bg.png';
import GALAXY from 'assets/galaxy.png';
import { Header, MintButton, NFT } from 'components';

import styles from './Intro.module.scss';

export function Intro(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <Header />
            <NFT />
            <MintButton />
            <img src={BG.src} className={styles.bg}></img>
            <img src={GALAXY.src} className={styles.galaxy}></img>
        </div>
    );
}
