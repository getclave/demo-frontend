import { Connect, Create, Select } from 'components';
import type { ModalController } from 'hooks/useModal';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { ConnectionOptions } from 'types/connection';

import styles from './Onboarding.module.scss';
import { Recover } from './Recover/Recover';

export function Onboarding({
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
    const connectionOption = useSelector(
        (state: RootState) => state.zkconnection.connectionOption,
    );
    return (
        <div className={styles.wrapper}>
            {connectionOption === ConnectionOptions.STARTRECOVERY ? (
                <Recover
                    accountName={accountName}
                    setAccountName={setAccountName}
                    infoModal={infoModal}
                    setInfo={setInfo}
                />
            ) : connectionOption === ConnectionOptions.SELECT ? (
                <Select infoModal={infoModal} setInfo={setInfo} />
            ) : connectionOption === ConnectionOptions.CONNECT ? (
                <Connect
                    accountName={accountName}
                    setAccountName={setAccountName}
                />
            ) : (
                <Create
                    accountName={accountName}
                    setAccountName={setAccountName}
                    infoModal={infoModal}
                    setInfo={setInfo}
                />
            )}
        </div>
    );
}
