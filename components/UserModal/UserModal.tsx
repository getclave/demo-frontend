import type { ModalController } from '@ethylene/ui-hooks/useModal';
import FINGERPRINT from 'assets/fingerprint.png';
import { useEffect, useState } from 'react';
import { BsImages } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Modal } from 'ui';
import { parseAddress } from 'utils/parseAddress';

import { useResetAllStore } from '../../hooks/useResetStore';
import styles from './UserModal.module.scss';

export function UserModal({
    modalController,
}: {
    modalController: ModalController;
}): JSX.Element {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account.account);
    const [copy, setCopy] = useState<string>('Copy Address');
    const { resetAllStore } = useResetAllStore();

    useEffect(() => {
        if (copy === 'Copy Address') return;
        setTimeout(() => {
            setCopy('Copy Address');
        }, 1500);
    }, [copy]);

    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div className={styles.icon}>
                <img src={FINGERPRINT.src} alt="seal"></img>
            </div>
            <div className={styles.address}>
                {parseAddress(
                    account?.address ? account.address : '0xCla...ve',
                )}
            </div>
            <div className={styles.balance}>12 ETH</div>

            <div className={styles.nfts}></div>
            <div className={styles.buttons}>
                <div
                    className={styles.button}
                    onClick={(): void => {
                        if (!account) return;
                        navigator.clipboard.writeText(account?.address);
                        setCopy('Copied');
                    }}
                >
                    <FiCopy size={16} />
                    <div className={styles.text}>{copy}</div>
                </div>
                <a
                    className={styles.button}
                    href={`https://testnets.opensea.io/${account?.address}`}
                    target="_blank"
                >
                    <BsImages size={16} />
                    <div className={styles.text}>My NFTs</div>
                </a>

                <div
                    className={styles.button}
                    onClick={(): void => {
                        resetAllStore();
                        modalController.close();
                    }}
                >
                    <VscDebugDisconnect size={16} />
                    <div className={styles.text}>Disconnect</div>
                </div>
            </div>
        </Modal>
    );
}
