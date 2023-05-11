import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { useMutation } from '@tanstack/react-query';
import FINGERPRINT from 'assets/fingerprint.png';
import type { AxiosResponse } from 'axios';
import { useNotify } from 'hooks';
import { register } from 'module/webauthn';
import { getPublicKey } from 'module/webauthnUtils';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateNewOption } from 'restapi';
import type { AccountV2, NewOptionDto, Option } from 'restapi/types';
import type { RootState } from 'store';
import {
    setAccount,
    setRegistrationResponse,
    setSelectedAccount,
} from 'store/slicers/account';
import { Button, Input } from 'ui';

import styles from './SelectAccount.module.scss';

export function SelectAccount({
    modalController,
}: {
    modalController: ModalController;
}): JSX.Element {
    const notify = useNotify();
    const dispatch = useDispatch();
    const [selectOrCreate, setSelectOrCreate] = useState<boolean>(false);
    const [nickname, setNickname] = useState<string>('');
    const account = useSelector((state: RootState) => state.account.account);
    const collectionOption = useSelector(
        (state: RootState) => state.account.account,
    );

    const { mutate: postAccount } = useMutation({
        mutationFn: async (
            params: NewOptionDto,
        ): Promise<AxiosResponse<AccountV2>> => apiCreateNewOption(params),
        onError: () => {
            notify.error('Account could not be created!');
        },
        onSuccess: (data) => {
            notify.success(`Account added successfully <3`);
            dispatch(setAccount(data.data));
        },
    });

    const handleRegister = async (): Promise<void> => {
        const registrationResponse = await register(nickname);
        if (registrationResponse) {
            dispatch(setRegistrationResponse(registrationResponse));
            const publicKey: string = await getPublicKey(
                registrationResponse?.credential.publicKey,
            );
            if (account) {
                dispatch(setSelectedAccount(account?.options.length + 1));
            }
            postAccount({
                name: account?.name,
                authName: nickname,
                authPublic: registrationResponse?.credential.publicKey,
                authType: 1,
                authHexPublic: publicKey,
            } as NewOptionDto);
        }
    };

    useEffect(() => {
        setNickname('');
    }, [collectionOption]);

    useEffect(() => {
        setNickname('');
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.back}>
                <IoIosArrowBack size={20} />
            </div>
            <div className={styles.title}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>Select Account</span>
            </div>
            {selectOrCreate ? (
                <div className={styles.create}>
                    <div className={styles.nickname}>
                        <Input
                            placeholder="Nickname"
                            height="40px"
                            value={nickname}
                            onChange={(e): void => {
                                setNickname(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.button}>
                        <Button
                            disabled={nickname === ''}
                            width="120px"
                            height="40px"
                            color="purple"
                            onClick={async (): Promise<void> => {
                                if (nickname === '') return;
                                await handleRegister();
                            }}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={styles.accounts}>
                    {account &&
                        account.options.map((option: Option, i: number) => {
                            return (
                                <div
                                    className={styles.account}
                                    key={i}
                                    onClick={(): void => {
                                        dispatch(setSelectedAccount(i));
                                        modalController.close();
                                    }}
                                >
                                    <div className={styles.icon}>
                                        <img src={FINGERPRINT.src}></img>
                                    </div>
                                    <div className={styles.name}>
                                        {option.method_name}
                                    </div>
                                </div>
                            );
                        })}

                    <div className={styles.newAccount}>
                        <Button
                            width="195px"
                            height="30px"
                            color="purple"
                            fontSize="fs14"
                            fontWeight="fw400"
                            onClick={(): void => setSelectOrCreate(true)}
                        >
                            Create New PublicKey
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
