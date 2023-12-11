import GRADIENT from 'assets/gradient.png';
import { Onboarding, Wallet } from 'components';
import { Title } from 'components';
import { useModal } from 'hooks/useModal';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAccount, setSelectedAccount } from 'store/slicers/account';

import { InfoModal } from '../InfoModal/InfoModal';
import styles from './Landing.module.scss';

export function Landing(): JSX.Element {
    const dispatch = useDispatch();
    const infoModal = useModal();
    const [infoMessage, setInfoMessage] = useState<string>('CREATEREGISTER');
    const [accountName, setAccountName] = useState<string>('');

    const account = useSelector((state: RootState) => state.zkaccount.account);
    const selectedAccount = useSelector(
        (state: RootState) => state.zkaccount.selectedAccount,
    );

    const isOnboarding = useMemo(() => {
        return !(account && (selectedAccount || selectedAccount === 0));
    }, [account, selectedAccount]);

    useEffect(() => {
        const lStorage = localStorage.getItem('ClaveAccount');
        if (!lStorage) return;
        const accountData = JSON.parse(lStorage);

        if (
            accountData &&
            accountData.account &&
            (accountData.selectedAccount || accountData.selectedAccount === 0)
        ) {
            dispatch(setAccount(accountData.account));
            dispatch(setSelectedAccount(accountData.selectedAccount));
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <InfoModal modalController={infoModal} info={infoMessage} />

            <div className={styles.mobile}>
                {!isOnboarding ? (
                    <Wallet
                        infoModal={infoModal}
                        setInfoMessage={setInfoMessage}
                    />
                ) : (
                    <>
                        <Title />
                        <Onboarding
                            accountName={accountName}
                            setAccountName={setAccountName}
                            infoModal={infoModal}
                            setInfo={setInfoMessage}
                        />
                    </>
                )}
            </div>
            <div className={styles.background}>
                <div className={styles.gradient}>
                    <img src={GRADIENT.src}></img>
                </div>
            </div>
        </div>
    );
}
