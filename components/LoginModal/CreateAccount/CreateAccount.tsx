import type {
    AuthenticationEncoded,
    RegistrationEncoded,
} from '@passwordless-id/webauthn/dist/esm/types';
import FINGERPRINT from 'assets/fingerprint.png';
import { useDebounce } from 'hooks';
import { authenticate, register } from 'module/webauthn';
import { getPublicKey } from 'module/webauthnUtils';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import {
    setAuthenticationResponse,
    setDeployedContractAddress,
    setRegistrationResponse,
} from 'store/slicers/account';
import type { ConnectAccountProps } from 'types/connection';
import { Button, Input } from 'ui';

import styles from './CreateAccount.module.scss';

export function CreateAccount({
    connectionOption,
    setConnection,
}: ConnectAccountProps): JSX.Element {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);
    const registration = useSelector(
        (state: RootState) => state.account.registrationResponse,
    );
    const debounced = useDebounce(nickname, 500);
    const { data, isError, error, isLoading } = useGetAccountQueryV2(debounced);

    const handleRegister = async (): Promise<void> => {
        const registrationResponse = await register(nickname);
        if (registrationResponse) {
            dispatch(setRegistrationResponse(registrationResponse));
            const publicKey: string = await getPublicKey(
                registrationResponse?.credential.publicKey,
            );
        }
    };

    const handleAuthenticate = async (): Promise<void> => {
        if (!registration) return;
        const authenticattionResponse = await authenticate(
            registration.credential.id,
            '',
        );
        // if (registrationResponse) {
        //     dispatch(setRegistrationResponse(registrationResponse));
        // }
    };

    useEffect(() => {
        if (data) {
            setErrorMessage('This username is already taken!');
        }
    }, [data]);

    useEffect(() => {
        setErrorMessage('');
        setNickname('');
        setUsername(null);
    }, [connectionOption]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.back} onClick={(): void => setConnection()}>
                <IoIosArrowBack size={20} />
            </div>
            <div className={styles.title}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>Create New Account</span>
            </div>
            <div className={styles.nickname}>
                <Input
                    placeholder="Username"
                    height="40px"
                    error={errorMessage}
                    value={nickname}
                    onChange={(e): void => {
                        setNickname(e.target.value);
                        setErrorMessage('');
                    }}
                />
            </div>
            <div className={styles.button}>
                <Button
                    disabled={
                        // errorMessage !== ''
                        nickname === '' || isLoading || errorMessage !== ''
                    }
                    width="120px"
                    height="40px"
                    color="purple"
                    loading={!username === null ? isLoading : false}
                    onClick={async (): Promise<void> => {
                        if (nickname === '') return;
                        if (errorMessage !== '') return;
                        await handleRegister();
                    }}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}
