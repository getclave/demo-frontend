import styles from './NFT.module.scss';
import NFTIMG from 'assets/nft.png';

export function NFT() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.frame}>
        <img src={NFTIMG.src}></img>
      </div>
    </div>
  );
}
