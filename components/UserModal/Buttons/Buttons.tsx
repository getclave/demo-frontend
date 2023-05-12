import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { useResetAllStore } from 'hooks/useResetStore';
import { useEffect, useState } from 'react';
import { BiTransfer } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';

import styles from './Buttons.module.scss';

export function Buttons({
    modalController,
    setPage,
}: {
    modalController: ModalController;
    setPage: (page: 'buttons' | 'transfer') => void;
}): JSX.Element {
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
        <div className={styles.wrapper}>
            <div
                className={styles.button}
                onClick={(): void => {
                    if (!account) return;
                    navigator.clipboard.writeText(account?.address);
                    setCopy('Copied');
                }}
            >
                <BiTransfer size={16} />
                <div className={styles.text}>Transfer</div>
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
                    if (!account) return;
                    navigator.clipboard.writeText(account?.address);
                    setCopy('Copied');
                }}
            >
                <FiCopy size={16} />
                <div className={styles.text}>{copy}</div>
            </div>
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
    );
}
