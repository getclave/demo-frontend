import type { ModalController } from '@ethylene/ui-hooks/useModal';
import FINGERPRINT from 'assets/fingerprint.png';
import QRLOGO from 'assets/qr-seal.png';
import { ConnectModal, CreateAccount } from 'components';
import { ConnectAccount } from 'components';
import { useDebounce } from 'hooks/useDebounce';
import { QRCodeSVG } from 'qrcode.react';
// import { useGetAccountQuery } from 'queries/useGetAccountQuery';
import { useGetUserQuery } from 'queries/useGetUserQuery';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import type { QRCode } from 'react-qrcode-logo';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAccount } from 'store/slicers/account';
import { ConnectionOptions } from 'types/connection';
import { Button, Input, Modal } from 'ui';

import styles from './LoginModal.module.scss';

export function LoginModal({
    modalController,
}: {
    modalController: ModalController;
}): JSX.Element {
    const dispatch = useDispatch();
    const [connectionOption, setConnectionOption] = useState<ConnectionOptions>(
        ConnectionOptions.CONNECT,
    );

    useEffect(() => {
        if (modalController.isOpen === true) return;
        setConnectionOption(ConnectionOptions.CONNECT);
    }, [modalController.isOpen]);

    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div className={styles.header}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>Seal Kit</span>
            </div>
            {
                // account ? (
                //     <ConnectModal />
                // ) :
                connectionOption === ConnectionOptions.CONNECT ? (
                    <ConnectAccount
                        connectionOption={connectionOption}
                        setConnection={(): void =>
                            setConnectionOption(ConnectionOptions.CREATE)
                        }
                    />
                ) : (
                    <CreateAccount
                        modalController={modalController}
                        connectionOption={connectionOption}
                        setConnection={(): void =>
                            setConnectionOption(ConnectionOptions.CONNECT)
                        }
                    />
                )
            }
        </Modal>
    );
}
