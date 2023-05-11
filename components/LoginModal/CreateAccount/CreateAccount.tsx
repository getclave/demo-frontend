import { useMutation } from '@tanstack/react-query';
import FINGERPRINT from 'assets/fingerprint.png';
import type { AxiosResponse } from 'axios';
import { useDebounce } from 'hooks';
import { useNotify } from 'hooks';
import { useGetCreate2Address } from 'hooks/useGetCreate2Address';
import { authenticate, register } from 'module/webauthn';
import { getInitChallange, sendInitUserOp } from 'module/webauthn';
import { encodeChallenge, getPublicKey } from 'module/webauthnUtils';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateAccountV2 } from 'restapi';
import type { AccountV2, CreateAccountDto } from 'restapi/types';
import type { RootState } from 'store';
import {
    setAccount,
    setDeployedContractAddress,
    setRegistrationResponse,
} from 'store/slicers/account';
import { setConnectionOption } from 'store/slicers/connection';
import { ConnectionOptions } from 'types/connection';
import { Button, Input } from 'ui';

import styles from './CreateAccount.module.scss';

export function CreateAccount(): JSX.Element {
    const notify = useNotify();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const connectionOption = useSelector(
        (state: RootState) => state.connection.connectionOption,
    );

    const debounced = useDebounce(nickname, 500);
    const { data, isLoading } = useGetAccountQueryV2(debounced);

    const { mutate: postAccount } = useMutation({
        mutationFn: async (
            params: CreateAccountDto,
        ): Promise<AxiosResponse<AccountV2>> => apiCreateAccountV2(params),
        onError: (e) => {
            setLoading(false);
            notify.error('Account could not be created!');
            console.log(e);
        },
        onSuccess: (data) => {
            setLoading(false);
            notify.success(`Account created successfully <3`);
            dispatch(setAccount(data.data));
        },
    });

    const handleRegister = async (): Promise<void> => {
        const registrationResponse = await register(nickname);
        if (registrationResponse) {
            setLoading(true);
            dispatch(setRegistrationResponse(registrationResponse));
            const publicKey: string = await getPublicKey(
                registrationResponse?.credential.publicKey,
            );

            const create2Address: string = await useGetCreate2Address(
                publicKey,
            );
            console.log('create2Address', create2Address);
            const challenge = await getInitChallange(create2Address, publicKey);
            const encodedChallenge = encodeChallenge(challenge);
            const authenticationResponse = await authenticate(
                registrationResponse.credential.id,
                encodedChallenge,
            );
            if (authenticationResponse) {
                const res = await sendInitUserOp(
                    challenge,
                    registrationResponse?.credential.publicKey,
                    encodedChallenge,
                    authenticationResponse.signature,
                    authenticationResponse.authenticatorData,
                    authenticationResponse.clientData,
                    create2Address,
                );

                if (res) {
                    setLoading(false);
                    dispatch(setDeployedContractAddress(create2Address));
                    postAccount({
                        name: nickname,
                        address: create2Address,
                        authName: 'desktop 1',
                        authPublic: registrationResponse.credential.publicKey,
                        authType: 1,
                        authHexPublic: publicKey,
                    } as CreateAccountDto);
                }
            }
        }
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

    useEffect(() => {
        setUsername(null);
        setLoading(false);
        setNickname('');
        setErrorMessage('');
    }, []);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.back}
                onClick={(): void => {
                    dispatch(setConnectionOption(ConnectionOptions.CONNECT));
                }}
            >
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
                    loading={!username === null ? isLoading : false || loading}
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
