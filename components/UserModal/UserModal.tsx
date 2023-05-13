import face from 'assets/lottie/face.json';
import { ethers } from 'ethers';
import type { ModalController } from 'hooks/useModal';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { CgArrowsExchange } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setConnectionOption } from 'store/slicers/connection';
import { ConnectionOptions } from 'types/connection';
import { Modal } from 'ui';
import { parseAddress } from 'utils/parseAddress';

import { Buttons } from './Buttons/Buttons';
import { Transfer } from './Transfer/Transfer';
import styles from './UserModal.module.scss';

export function UserModal({
    modalController,
    setInfoMessage,
    infoModal,
    loginModal,
}: {
    modalController: ModalController;
    setInfoMessage: (message: string) => void;
    infoModal: ModalController;
    loginModal: ModalController;
}): JSX.Element {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account.account);
    const balance = useSelector((state: RootState) => state.account.balance);
    const selectedAccount = useSelector(
        (state: RootState) => state.account.selectedAccount,
    );
    const [copy, setCopy] = useState<string>('Copy Address');
    const [page, setPage] = useState<'buttons' | 'transfer'>('buttons');

    useEffect(() => {
        if (copy === 'Copy Address') return;
        setTimeout(() => {
            setCopy('Copy Address');
        }, 1500);
    }, [copy]);

    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div
                className={styles.header}
                onClick={(): void => {
                    loginModal.open();
                    dispatch(setConnectionOption(ConnectionOptions.SELECT));
                    modalController.close();
                }}
            >
                <div>{account?.options[selectedAccount]?.method_name}</div>
                <CgArrowsExchange size={20} />
            </div>
            <div className={styles.icon}>
                {/* <img src={FINGERPRINT.src} alt="seal"></img> */}
                <Lottie
                    animationData={face}
                    loop={true}
                    style={{
                        width: '150px',
                        // backgroundColor: 'red',
                        margin: '-50px',
                    }}
                />
            </div>
            <div className={styles.address}>
                {parseAddress(
                    account?.address ? account.address : '0xCla...ve',
                )}
            </div>
            <div className={styles.balance}>
                {ethers.utils.formatEther(balance.toString())} ETH
            </div>
            {page === 'buttons' ? (
                <Buttons modalController={modalController} setPage={setPage} />
            ) : (
                <Transfer
                    modalController={modalController}
                    setPage={setPage}
                    setInfoMessage={setInfoMessage}
                    infoModal={infoModal}
                />
            )}
        </Modal>
    );
}
