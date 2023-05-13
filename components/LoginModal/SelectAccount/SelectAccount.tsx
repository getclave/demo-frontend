import FINGERPRINT from 'assets/fingerprint.png';
import { useNotify } from 'hooks';
import type { ModalController } from 'hooks/useModal';
import { useResetAllStore } from 'hooks/useResetStore';
import { register } from 'module/webauthn';
import { getPublicKey } from 'module/webauthnUtils';
import { QRCodeSVG } from 'qrcode.react';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
import { useEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { AiOutlineLaptop } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { TbDeviceMobile } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import type { Option } from 'restapi/types';
import { Authenticator } from 'restapi/types';
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
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const account = useSelector((state: RootState) => state.account.account);
    const [previousOptions, setPreviousOptions] = useState<Array<Option>>([]);
    const { data } = useGetAccountQueryV2(
        account ? account?.name : '',
        !publicKey ? false : true,
    );
    useEffect(() => {
        console.log(data?.data.options, previousOptions);
        if (previousOptions.length === 0) {
            if (data) {
                setPreviousOptions(data.data.options);
            }
        } else {
            if (data) {
                if (data.data.options.length > previousOptions.length) {
                    setPreviousOptions(data.data.options);
                    for (let i = 0; i < data.data.options.length; i++) {
                        if (data.data.options[i]?.method_name === nickname) {
                            dispatch(setAccount(data.data));
                            dispatch(setSelectedAccount(i));
                            modalController.close();
                        }
                    }
                }
            }
        }
    }, [data]);

    const { resetAllStore } = useResetAllStore();
    const collectionOption = useSelector(
        (state: RootState) => state.account.account,
    );

    const handleRegister = async (): Promise<void> => {
        try {
            const registrationResponse = await register(nickname);
            if (registrationResponse) {
                dispatch(setRegistrationResponse(registrationResponse));
                const publicKey: string = await getPublicKey(
                    registrationResponse?.credential.publicKey,
                );
                setPublicKey(publicKey);
                if (account) {
                    dispatch(setSelectedAccount(account?.options.length + 1));
                }
            }
        } catch (e) {
            console.log(e);
            notify.error(e as string);
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
            <div
                className={styles.back}
                onClick={(): void => {
                    if (publicKey && selectOrCreate) {
                        setPublicKey(null);
                        setSelectOrCreate(false);
                    } else if (selectOrCreate) {
                        setSelectOrCreate(false);
                    } else {
                        resetAllStore();
                    }
                }}
            >
                <IoIosArrowBack size={20} />
            </div>
            <div className={styles.title}>
                <div className={styles.fingerprint}>
                    <img src={FINGERPRINT.src}></img>
                </div>
                <span className={styles.text}>
                    {!selectOrCreate
                        ? 'Select Account'
                        : publicKey
                        ? 'Scan QR Code'
                        : 'Set Account Name'}
                </span>
            </div>
            {!selectOrCreate ? (
                <div className={styles.accounts}>
                    {account &&
                        account.options.map((option: Option, i: number) => {
                            return (
                                <div
                                    className={styles.account}
                                    key={i}
                                    onClick={(): void => {
                                        if (
                                            option.type ===
                                            Authenticator.DESKTOP
                                        ) {
                                            dispatch(setSelectedAccount(i));
                                            modalController.close();
                                        }
                                    }}
                                >
                                    <div className={styles.icon}>
                                        <img src={FINGERPRINT.src}></img>
                                    </div>
                                    <div className={styles.name}>
                                        {option.method_name}
                                    </div>
                                    <div className={styles.device}>
                                        {option.type ===
                                        Authenticator.DESKTOP ? (
                                            <AiOutlineLaptop />
                                        ) : (
                                            <TbDeviceMobile />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    {account &&
                        account.options[0].type === Authenticator.MOBILE && (
                            <div className={styles.newAccount}>
                                <Button
                                    width="195px"
                                    height="30px"
                                    color="purple"
                                    fontSize="fs14"
                                    fontWeight="fw400"
                                    onClick={(): void => {
                                        setSelectOrCreate(true);
                                    }}
                                >
                                    Create New PublicKey
                                </Button>
                            </div>
                        )}
                </div>
            ) : !publicKey ? (
                <div className={styles.create}>
                    <div className={styles.nickname}>
                        <Input
                            placeholder="Authenticator Name"
                            height="40px"
                            color="dark"
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
                <div className={styles.qrCode}>
                    <QRCodeSVG
                        value={JSON.stringify({
                            name: account?.name,
                            publicKey: publicKey,
                            authName: `${account?.name}-${browserName}-${
                                account?.options
                                    ? account?.options.length + 1
                                    : publicKey.slice(2, 4)
                            }`,
                        })}
                        size={250}
                    />
                </div>
            )}
        </div>
    );
}
