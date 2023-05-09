import { useMutation } from '@tanstack/react-query';
import FINGERPRINT from 'assets/fingerprint.png';
import type { AxiosError, AxiosResponse } from 'axios';
import { ABIs } from 'constants/abi';
import { BYTECODES } from 'constants/bytecode';
import { Contract } from 'ethers';
import { useDebounce } from 'hooks';
import { useNotify } from 'hooks';
import { useDeployContract } from 'hooks/useDeployContract';
import { useRegister } from 'hooks/useRegister';
import { authenticate, register } from 'module/webauthn';
import { getPublicKey } from 'module/webauthnUtils';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateAccountV2 } from 'restapi';
import type { AccountV2, CreateAccountDto } from 'restapi/types';
import type { RootState } from 'store';
import {
    setAccount,
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
    const notify = useNotify();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const debounced = useDebounce(nickname, 500);
    const { data, isError, error, isLoading } = useGetAccountQueryV2(debounced);

    const { mutate: postAccount } = useMutation({
        mutationFn: async (
            params: CreateAccountDto,
        ): Promise<AxiosResponse<AccountV2>> => apiCreateAccountV2(params),
        onError: (err) => {
            setLoading(false);
            notify.error('Account could not be created!');
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
            const deployedContract: Contract = await useDeployContract(
                ABIs.sealAccountContract,
                BYTECODES.sealAccount,
                '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
                Buffer.from(publicKey, 'hex'),
            );
            console.log(deployedContract.address, 'deploylandi');
            dispatch(setDeployedContractAddress(deployedContract.address));
            postAccount({
                name: nickname,
                address: deployedContract.address,
                authName: 'desktop',
                authPublic: publicKey,
                authType: 1,
            } as CreateAccountDto);
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
