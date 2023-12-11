import type { ModalController } from 'hooks/useModal';
import { useResetAllStore } from 'hooks/useResetStore';
import { useEffect, useState } from 'react';
import { BiTransfer } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { MdManageAccounts } from 'react-icons/md';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setConnectionOption } from 'store/slicers/connection';
import { ConnectionOptions } from 'types/connection';

import styles from './Buttons.module.scss';

export function Buttons({
    modalController,
    setPage,
    loginModal,
}: {
    modalController: ModalController;
    setPage: (
        page: 'buttons' | 'transfer' | 'addRecovery' | 'startRecovery',
    ) => void;
    loginModal: ModalController;
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
        <div className={styles.wrapper}>
            <div
                className={styles.button}
                onClick={(): void => {
                    if (!account) return;
                    setPage('transfer');
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
                    localStorage.removeItem('ClaveAccount');
                    resetAllStore();
                    modalController.close();
                }}
            >
                <VscDebugDisconnect size={16} />
                <div className={styles.text}>Disconnect</div>
            </div>
            <div
                className={styles.button}
                onClick={(): void => {
                    loginModal.open();
                    dispatch(setConnectionOption(ConnectionOptions.SELECT));
                    modalController.close();
                }}
                style={{ width: '100%' }}
            >
                <MdManageAccounts size={16} />
                <div className={styles.text}>Authenticated Devices</div>
            </div>
            <div
                className={styles.button}
                onClick={(): void => {
                    if (!account) return;
                    setPage('addRecovery');
                }}
                style={{ width: '100%' }}
            >
                <MdManageAccounts size={16} />
                <div className={styles.text}>Add Email Backup</div>
            </div>
        </div>
    );
}
