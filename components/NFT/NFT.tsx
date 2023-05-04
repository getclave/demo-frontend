import NFTIMG from 'assets/nft.png';

import styles from './NFT.module.scss';

export function NFT(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <div className={styles.frame}>
                <img src={NFTIMG.src}></img>
            </div>
        </div>
    );
}
