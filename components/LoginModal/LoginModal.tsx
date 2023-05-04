import type { ModalController } from '@ethylene/ui-hooks/useModal';
import FINGERPRINT from 'assets/fingerprint.png';
import { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'ui';

import styles from './LoginModal.module.scss';

export function LoginModal({
    modalController,
}: {
    modalController: ModalController;
}): JSX.Element {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
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
                />
            </div>
            <div className={styles.button}>
                <Button
                    onClick={modalController.close}
                    width="120px"
                    height="40px"
                    color="purple"
                >
                    {isLogin ? 'Connect' : 'Create'}
                </Button>
            </div>
            <div className={styles.create}>
                {isLogin && <div className={styles.text}>Need a account?</div>}
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
        </Modal>
    );
}
