import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useDebounce, useNotify } from 'hooks';
import type { ModalController } from 'hooks/useModal';
import { register } from 'module/webauthn';
import { getPublicKey } from 'module/webauthnUtils';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useMemo, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { apiRecovery } from 'restapi';
import type { AccountV2, NewOptionDto } from 'restapi/types';
import type { RootState } from 'store';
import { setZKAccount } from 'store/slicers/zkaccount';
import { setZKConnectionOption } from 'store/slicers/zkconnection';
import { ConnectionOptions } from 'types/connection';
import { Button, Input } from 'ui';

import styles from './Recover.module.scss';
import { getCreateEmailLink } from './createLink';

export function Recover({
    accountName,
    setAccountName,
    infoModal,
    setInfo,
}: {
    accountName: string;
    setAccountName: (accountName: string) => void;
    infoModal: ModalController;
    setInfo: (value: string) => void;
}): JSX.Element {
    const notify = useNotify();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const debounced = useDebounce(accountName, 500);
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { data, isError, error } = useGetAccountQueryV2(debounced);
    const connectionOption = useSelector(
        (state: RootState) => state.zkconnection.connectionOption,
    );

    const { mutate: recoverAccount, isLoading } = useMutation({
        mutationFn: async (
            params: NewOptionDto,
        ): Promise<AxiosResponse<AccountV2>> => apiRecovery(params),
        onError: (e) => {
            setLoading(false);
            infoModal.close();
            notify.error('Account could not be recovered!');
            console.log(e);
        },
        onSuccess: (data) => {
            setLoading(false);
            notify.success(`Account recovered successfully`);
            dispatch(setZKAccount(data.data));
            setInfo('CREATEDWALLET');
            setTimeout(() => {
                infoModal.close();
            }, 5000);
        },
    });

    const handleStartRecovery = async (): Promise<void> => {
        const address = data?.data.address;
        if (!address) return;

        try {
            const registrationName = `${accountName}-recovery`;
            const registrationResponse = await register(registrationName);
            if (registrationResponse) {
                const publicKey: string = await getPublicKey(
                    registrationResponse?.credential.publicKey,
                );
                const [, sendLink] = getCreateEmailLink(
                    email,
                    address,
                    publicKey,
                );
                recoverAccount({
                    name: accountName,
                    authName: registrationName,
                    authPublic: publicKey,
                    authType: 1,
                    clientId: registrationResponse.credential.id,
                } as NewOptionDto);
                window.open(sendLink, '_blank');
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setErrorMessage('');
        if (connectionOption === ConnectionOptions.SELECT) {
            setAccountName('');
        }
    }, [connectionOption]);

    const isButtonDisabled = useMemo(() => {
        if (isError && accountName !== '') {
            try {
                setErrorMessage(error?.response?.data.message || '');
            } catch (e) {
                console.log(e);
            }
            return true;
        } else if (accountName === '' || isError) {
            return true;
        }
        const isEmailValid = email.includes('@') && email.includes('.');
        if (!isEmailValid) {
            return true;
        }
        return false;
    }, [email, error]);

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
                <span className={styles.text}>Start Recovery</span>
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
                    }}
                />
            </div>
            <div className={styles.nickname}>
                <Input
                    color="special"
                    placeholder="Email"
                    height="40px"
                    width={'100%'}
                    value={email}
                    onChange={(e): void => {
                        setEmail(e.target.value);
                        setErrorMessage('');
                    }}
                    onKeyPress={(e): void => {
                        if (accountName === '') return;
                        if (
                            e.key === 'enter' ||
                            e.key === 'Enter' ||
                            e.key === 'NumpadEnter'
                        ) {
                            if (data && !isButtonDisabled) {
                                dispatch(setZKAccount(data?.data));
                                dispatch(
                                    setZKConnectionOption(
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
                    disabled={isButtonDisabled}
                    width="160px"
                    height="40px"
                    color="special"
                    loading={loading || isLoading}
                    onClick={handleStartRecovery}
                >
                    Start Recovery
                </Button>
            </div>
        </div>
    );
}
