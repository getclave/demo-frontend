import FINGERPRINT from 'assets/fingerprint.png';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAccount } from 'store/slicers/account';
import type { ConnectAccountProps } from 'types/connection';
import { Button, Input } from 'ui';

import styles from './ConnectAccount.module.scss';

export function ConnectAccount({
    connectionOption,
    setConnection,
}: ConnectAccountProps): JSX.Element {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);
    const { data, isError, error, isLoading } = useGetAccountQueryV2(username);

    useEffect(() => {
        if (isError) {
            setErrorMessage(error?.response?.data.message || '');
        }
    }, [isError]);

    useEffect(() => {
        if (data) {
            dispatch(setAccount(data?.data));
        }
    }, [data]);

    useEffect(() => {
        setErrorMessage('');
        setNickname('');
        setUsername(null);
    }, [connectionOption]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>Connect Your Account</span>
            </div>
            <div className={styles.nickname}>
                <Input
                    placeholder="Username"
                    height="40px"
                    regularMessage={errorMessage}
                    value={nickname}
                    onChange={(e): void => {
                        setNickname(e.target.value);
                        setErrorMessage('');
                    }}
                />
            </div>
            <div className={styles.button}>
                <Button
                    disabled={errorMessage !== ''}
                    width="120px"
                    height="40px"
                    color="purple"
                    loading={!username === null ? isLoading : false}
                    onClick={(): void => {
                        if (nickname === '') return;
                        setUsername(nickname);
                    }}
                >
                    Connect
                </Button>
            </div>
            <div className={styles.create}>
                <div className={styles.text}>Need a account?</div>
                <Button
                    width="145px"
                    height="30px"
                    color="purple"
                    fontSize="fs12"
                    fontWeight="fw400"
                    onClick={(): void => setConnection()}
                >
                    Create Account
                </Button>
            </div>
        </div>
    );
}
