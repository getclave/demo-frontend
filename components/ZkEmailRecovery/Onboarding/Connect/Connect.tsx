import { useDebounce } from 'hooks';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setZKAccount } from 'store/slicers/zkaccount';
import { setZKConnectionOption } from 'store/slicers/zkconnection';
import { ConnectionOptions } from 'types/connection';
import { Button, Input } from 'ui';

import styles from './Connect.module.scss';

export function Connect({
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
        (state: RootState) => state.zkconnection.connectionOption,
    );

    useEffect(() => {
        if (isError && accountName !== '') {
            try {
                setErrorMessage(error?.response?.data.message || '');
                setDisabled(true);
            } catch (e) {
                console.log(e);
            }
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
                <span className={styles.text}>Connect Your Account</span>
            </div>
            <div className={styles.nickname}>
                <Input
                    color="special"
                    placeholder="Username"
                    height="40px"
                    width={'100%'}
                    regularMessage={errorMessage}
                    value={accountName}
                    onChange={(e): void => {
                        setAccountName(e.target.value);
                        setErrorMessage('');
                        setDisabled(true);
                    }}
                />
            </div>
            <div className={styles.button}>
                <Button
                    disabled={disabled}
                    width="120px"
                    height="40px"
                    color="special"
                    // loading={isLoading}
                    onClick={(): void => {
                        if (data && accountName !== '') {
                            dispatch(setZKAccount(data?.data));
                            dispatch(
                                setZKConnectionOption(ConnectionOptions.SELECT),
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
                        dispatch(
                            setZKConnectionOption(ConnectionOptions.CREATE),
                        );
                    }}
                >
                    Create new account
                </div>
                <div>or</div>
                <div
                    className={styles.text}
                    onClick={(): void => {
                        dispatch(
                            setZKConnectionOption(
                                ConnectionOptions.STARTRECOVERY,
                            ),
                        );
                    }}
                >
                    Recover Account with Email
                </div>
            </div>
        </div>
    );
}
