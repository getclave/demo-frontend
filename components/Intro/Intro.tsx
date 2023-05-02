import styles from './Intro.module.scss';
import BG from 'assets/bg.png';
import GALAXY from 'assets/galaxy.png';
import { Header, MintButton, NFT } from 'components';
import { useMediaQuery } from 'react-responsive';

export function Intro() {
  const isDesktopOrMobile = useMediaQuery({
    query: '(min-width: 1000px)',
  });
  return (
    <div className={styles.wrapper}>
      <Header />
      <NFT />
      <MintButton />
      <img src={BG.src} className={styles.bg}></img>
      {isDesktopOrMobile && (
        <img src={GALAXY.src} className={styles.galaxy}></img>
      )}
    </div>
  );
}
