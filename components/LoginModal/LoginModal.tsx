import type { ModalController } from '@ethylene/ui-hooks/useModal';
import FINGERPRINT from 'assets/fingerprint.png';
import QRLOGO from 'assets/qr-seal.png';
import { ConnectModal } from 'components';
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
import { Button, Input, Modal } from 'ui';

import styles from './LoginModal.module.scss';

export function LoginModal({
    modalController,
}: {
    modalController: ModalController;
}): JSX.Element {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const debounced = useDebounce(nickname, 500);
    const { data, isError, isLoading } = useGetUserQuery(debounced);

    const account = useSelector((state: RootState) => state.account.account);
    useEffect(() => {
        if (typeof data === 'string') {
            if (!(nickname === '')) {
                setErrorMessage(data);
            } else {
                setErrorMessage('');
            }
        } else {
            setErrorMessage('');
        }
    }, [data]);

    useEffect(() => {
        setErrorMessage('');
        if (isLogin) return;
        setIsLogin(true);
    }, [modalController.isOpen]);
    return (
        <Modal className={styles.wrapper} modalController={modalController}>
            <div className={styles.header}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>Seal Kit</span>
            </div>
            {account ? (
                <ConnectModal />
            ) : (
                <>
                    <div className={styles.title}>
                        <div className={styles.fingerprint}>
                            <img src={FINGERPRINT.src}></img>
                        </div>
                        <span className={styles.text}>
                            {isLogin ? 'Connect' : 'Create'} Your Account
                        </span>
                    </div>
                    <div className={styles.nickname}>
                        <Input
                            placeholder="Username"
                            height="40px"
                            error={errorMessage}
                            value={nickname}
                            onChange={(e): void => setNickname(e.target.value)}
                        />
                    </div>
                    <div className={styles.button}>
                        <Button
                            onClick={(): void => {
                                if (!data) return;
                                if (errorMessage !== '') return;
                                if (data.account.length > 1) {
                                    console.log('bu direk islem yapar');
                                } else {
                                    dispatch(
                                        setAccount(data.account[0].account),
                                    );
                                }
                                console.log(data);
                                setNickname('');
                            }}
                            disabled={errorMessage !== '' || nickname === ''}
                            width="120px"
                            height="40px"
                            color="purple"
                        >
                            {isLogin ? 'Connect' : 'Create'}
                        </Button>
                    </div>
                    <div className={styles.create}>
                        {isLogin && (
                            <div className={styles.text}>Need a account?</div>
                        )}
                        <Button
                            onClick={(): void => setIsLogin(false)}
                            width="145px"
                            height="30px"
                            color="purple"
                            fontSize="fs12"
                            fontWeight="fw400"
                        >
                            {isLogin ? 'Create' : 'Connect'} Account
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
}
