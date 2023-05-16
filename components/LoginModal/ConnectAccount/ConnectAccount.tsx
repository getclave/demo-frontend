import FINGERPRINT from 'assets/fingerprint.png';
import { useDebounce } from 'hooks';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAccount } from 'store/slicers/account';
import { setConnectionOption } from 'store/slicers/connection';
import { ConnectionOptions } from 'types/connection';
import { Button, Input } from 'ui';

import styles from './ConnectAccount.module.scss';

export function ConnectAccount({
    accountName,
    setAccountName,
}: {
    accountName: string;
    setAccountName: (accountName: string) => void;
}): JSX.Element {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const debounced = useDebounce(accountName, 500);
    const [disabled, setDisabled] = useState<boolean>(true);
    const { data, isError, error } = useGetAccountQueryV2(debounced);
    const connectionOption = useSelector(
        (state: RootState) => state.connection.connectionOption,
    );

    useEffect(() => {
        if (isError && accountName !== '') {
            setErrorMessage(error?.response?.data.message || '');
            setDisabled(true);
        } else if (accountName !== '' && !isError) {
            setDisabled(false);
        }
    }, [error]);

    useEffect(() => {
        setErrorMessage('');
        if (connectionOption === ConnectionOptions.SELECT) {
            setAccountName('');
        }
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
                    color="dark"
                    placeholder="Username"
                    height="40px"
                    regularMessage={errorMessage}
                    value={accountName}
                    onChange={(e): void => {
                        setAccountName(e.target.value);
                        setErrorMessage('');
                        setDisabled(true);
                    }}
                    onKeyPress={(e): void => {
                        if (accountName === '') return;
                        if (
                            e.key === 'enter' ||
                            e.key === 'Enter' ||
                            e.key === 'NumpadEnter'
                        ) {
                            if (data && !disabled) {
                                dispatch(setAccount(data?.data));
                                dispatch(
                                    setConnectionOption(
                                        ConnectionOptions.SELECT,
                                    ),
                                );
                            }
                        }
                    }}
                />
            </div>
            <div className={styles.button}>
                <Button
                    disabled={disabled}
                    width="120px"
                    height="40px"
                    color="purple"
                    // loading={isLoading}
                    onClick={(): void => {
                        if (data && accountName !== '') {
                            dispatch(setAccount(data?.data));
                            dispatch(
                                setConnectionOption(ConnectionOptions.SELECT),
                            );
                        }
                    }}
                >
                    Connect
                </Button>
            </div>
            <div className={styles.create}>
                <div
                    className={styles.text}
                    onClick={(): void => {
                        dispatch(setConnectionOption(ConnectionOptions.CREATE));
                    }}
                >
                    Need a account?
                </div>
            </div>
        </div>
    );
}
