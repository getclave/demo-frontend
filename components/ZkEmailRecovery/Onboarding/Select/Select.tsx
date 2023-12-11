import type { ModalController } from 'hooks/useModal';
import { useResetAllStore } from 'hooks/useResetStore';
import { useVerifyAuthentication } from 'hooks/useVerifyAuthentication';
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
import { setZKAccount, setZKSelectedAccount } from 'store/slicers/zkaccount';
import { clsnm } from 'utils/clsnm';

import styles from './Select.module.scss';

export function Select({
    infoModal,
    setInfo,
}: {
    infoModal: ModalController;
    setInfo: (value: string) => void;
}): JSX.Element {
    const dispatch = useDispatch();
    const [selectOrCreate, setSelectOrCreate] = useState<boolean>(false);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const account = useSelector((state: RootState) => state.zkaccount.account);
    const selectedAccount = useSelector(
        (state: RootState) => state.zkaccount.selectedAccount,
    );
    const [lStorage, setLStorage] = useState<Array<string>>([]);
    const registrationResponse = useSelector(
        (state: RootState) => state.zkaccount.registrationResponse,
    );
    const [previousOptions, setPreviousOptions] = useState<Array<Option>>([]);
    const { zkResetAllStore } = useResetAllStore();
    const { data } = useGetAccountQueryV2(
        account ? account?.name : '',
        !publicKey ? false : true,
    );

    const handleVerifyAuthentication = async (
        option: Option,
        _index: number,
    ): Promise<void> => {
        if (!account) return;
        if (option.type !== Authenticator.DESKTOP) return;
        try {
            const clientId = account.options[_index]
                ? account.options[_index]?.client_id
                : '';
            if (!clientId) return;
            const result = await useVerifyAuthentication(
                account,
                clientId,
                account.options[_index].public_key,
                infoModal,
                setInfo,
            );
            if (result) {
                dispatch(setZKSelectedAccount(_index));
                const ClaveAccount = {
                    account: account,
                    selectedAccount: _index,
                };
                localStorage.setItem(
                    'ClaveAccount',
                    JSON.stringify(ClaveAccount),
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (previousOptions.length === 0) {
            if (data) {
                setPreviousOptions(data.data.options);
            }
        } else {
            if (data) {
                if (data.data.options.length > previousOptions.length) {
                    setPreviousOptions(data.data.options);
                    setInfo('AUTHED');
                    infoModal.open();
                    setTimeout(() => {
                        infoModal.close();
                    }, 3000);
                    dispatch(setZKAccount(data.data));
                    dispatch(
                        setZKSelectedAccount(data.data.options.length - 1),
                    );

                    const lStorage = localStorage.getItem('ClaveAccounts');
                    const accountsFromLS = lStorage ? JSON.parse(lStorage) : [];
                    accountsFromLS.push(account?.name);
                    localStorage.setItem(
                        'ClaveAccounts',
                        JSON.stringify(accountsFromLS),
                    );
                    const ClaveAccount = {
                        account: data.data,
                        selectedAccount: data.data.options.length - 1,
                    };
                    localStorage.setItem(
                        'ClaveAccount',
                        JSON.stringify(ClaveAccount),
                    );
                }
            }
        }
    }, [data]);

    useEffect(() => {
        const localS = localStorage.getItem('ClaveAccounts');
        setLStorage(localS ? JSON.parse(localS) : lStorage);
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
                        console.log(selectedAccount);
                        zkResetAllStore();
                    }
                }}
            >
                <IoIosArrowBack size={20} color="white" />
            </div>
            <div className={styles.title}>
                <span className={styles.text}>
                    {!selectOrCreate
                        ? 'Select Account'
                        : publicKey
                        ? 'Scan QR Code on Clave Mobile'
                        : 'Register to create new PublicKey'}
                </span>
            </div>
            {!selectOrCreate ? (
                <div className={styles.accounts}>
                    {account &&
                        account.options.map((option: Option, i: number) => {
                            return (
                                <div
                                    className={
                                        option.type === Authenticator.DESKTOP
                                            ? styles.account
                                            : clsnm(styles.account, styles.off)
                                    }
                                    key={i}
                                    onClick={async (): Promise<void> => {
                                        await handleVerifyAuthentication(
                                            option,
                                            i,
                                        );
                                    }}
                                >
                                    <div className={styles.name}>
                                        {option?.method_name}
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
                </div>
            ) : !publicKey ? null : (
                <div className={styles.qrCode}>
                    {publicKey && (
                        <QRCodeSVG
                            value={JSON.stringify({
                                name: account?.name,
                                publicKey: publicKey,
                                authName: `${account?.name}-${browserName}-${
                                    account?.options
                                        ? account?.options.length + 1
                                        : publicKey.slice(2, 4)
                                }`,
                                clientId: registrationResponse?.credential.id,
                            })}
                            size={250}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
