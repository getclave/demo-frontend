import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useDebounce } from 'hooks';
import { useNotify } from 'hooks';
import { useGetCreate2Address } from 'hooks/useGetCreate2Address';
import type { ModalController } from 'hooks/useModal';
import { authenticate, register } from 'module/webauthn';
import { getInitChallenge, sendInitUserOp } from 'module/webauthn';
import { encodeChallenge, getPublicKey } from 'module/webauthnUtils';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateAccountV2 } from 'restapi';
import type { AccountV2, CreateAccountDto } from 'restapi/types';
import type { RootState } from 'store';
import {
    setZKAccount,
    setZKAuthenticationResponse,
    setZKDeployedContractAddress,
    setZKRegistrationResponse,
    setZKSelectedAccount,
} from 'store/slicers/zkaccount';
import { setZKConnectionOption } from 'store/slicers/zkconnection';
import { ConnectionOptions } from 'types/connection';
import { Button, Input } from 'ui';

import styles from './Create.module.scss';

export function Create({
    infoModal,
    setInfo,
    accountName,
    setAccountName,
}: {
    infoModal: ModalController;
    setInfo: (value: string) => void;
    accountName: string;
    setAccountName: (accountName: string) => void;
}): JSX.Element {
    const notify = useNotify();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const connectionOption = useSelector(
        (state: RootState) => state.zkconnection.connectionOption,
    );

    const debounced = useDebounce(accountName, 500);
    const { data, isLoading } = useGetAccountQueryV2(debounced);

    const { mutate: postAccount } = useMutation({
        mutationFn: async (
            params: CreateAccountDto,
        ): Promise<AxiosResponse<AccountV2>> => apiCreateAccountV2(params),
        onError: (e) => {
            setLoading(false);
            infoModal.close();
            notify.error('Account could not be created!');
            console.log(e);
        },
        onSuccess: (data) => {
            setLoading(false);
            notify.success(`Account created successfully <3`);
            dispatch(setZKAccount(data.data));
            setInfo('CREATEDWALLET');
            setAccountName('');
            setTimeout(() => {
                infoModal.close();
            }, 5000);
        },
    });

    const handleRegister = async (): Promise<void> => {
        if (accountName === '') return;
        if (errorMessage !== '') return;
        try {
            setInfo('CREATEREGISTER');
            infoModal.open();
            const registrationResponse = await register(`${accountName}`);
            if (registrationResponse) {
                setInfo('CREATEAUTH');
                setLoading(true);
                dispatch(setZKRegistrationResponse(registrationResponse));
                try {
                    const publicKey: string = await getPublicKey(
                        registrationResponse?.credential.publicKey,
                    );

                    const create2Address: string = await useGetCreate2Address(
                        publicKey,
                    );

                    const challenge = await getInitChallenge(
                        create2Address,
                        publicKey,
                    );
                    const encodedChallenge = encodeChallenge(challenge);

                    const authenticationResponse = await authenticate(
                        [registrationResponse.credential.id],
                        encodedChallenge,
                    );

                    dispatch(
                        setZKAuthenticationResponse(authenticationResponse),
                    );
                    if (authenticationResponse) {
                        setInfo('TXSENT');
                        const res = await sendInitUserOp(
                            challenge,
                            publicKey,
                            encodedChallenge,
                            authenticationResponse.signature,
                            authenticationResponse.authenticatorData,
                            authenticationResponse.clientData,
                            create2Address,
                        );

                        if (res) {
                            const lStorage =
                                localStorage.getItem('ClaveAccounts');
                            const accountsFromLS = lStorage
                                ? JSON.parse(lStorage)
                                : [];
                            console.log(lStorage, accountsFromLS);
                            accountsFromLS.push(accountName);
                            localStorage.setItem(
                                'ClaveAccounts',
                                JSON.stringify(accountsFromLS),
                            );
                            const ClaveAccount = {
                                account: {
                                    id: 0,
                                    name: accountName,
                                    address: create2Address,
                                    options: [
                                        {
                                            id: 0,
                                            method_name: `${accountName}`,
                                            public_key: publicKey,
                                            type: 1,
                                            client_id:
                                                registrationResponse.credential
                                                    .id,
                                        },
                                    ],
                                },
                                selectedAccount: 0,
                            };
                            localStorage.setItem(
                                'ClaveAccount',
                                JSON.stringify(ClaveAccount),
                            );
                            setLoading(false);
                            dispatch(
                                setZKDeployedContractAddress(create2Address),
                            );
                            dispatch(setZKSelectedAccount(0));
                            postAccount({
                                name: accountName,
                                address: create2Address,
                                authName: `${accountName}`,
                                authPublic: publicKey,
                                authType: 1,
                                clientId: registrationResponse.credential.id,
                            } as CreateAccountDto);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
            infoModal.close();
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data) {
            setErrorMessage('This username is already taken!');
        }
    }, [data]);

    useEffect(() => {
        setErrorMessage('');
    }, [connectionOption]);

    useEffect(() => {
        setLoading(false);
        setErrorMessage('');
    }, []);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.back}
                onClick={(): void => {
                    dispatch(setZKConnectionOption(ConnectionOptions.CONNECT));
                }}
            >
                <IoIosArrowBack size={20} />
            </div>
            <div className={styles.title}>
                <span className={styles.text}>Create New Account</span>
            </div>
            <div className={styles.nickname}>
                <Input
                    color="special"
                    placeholder="Username"
                    height="40px"
                    width={'100%'}
                    error={errorMessage}
                    value={accountName}
                    onChange={(e): void => {
                        setAccountName(e.target.value);
                        setErrorMessage('');
                    }}
                />
            </div>
            <div className={styles.button}>
                <Button
                    disabled={
                        accountName === '' || isLoading || errorMessage !== ''
                    }
                    width="120px"
                    height="40px"
                    color="special"
                    loading={
                        !accountName === null ? isLoading : false || loading
                    }
                    onClick={async (): Promise<void> => {
                        await handleRegister();
                    }}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}
