import { getChallange } from 'module/webauthn';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';

import styles from './MintButton.module.scss';

export function MintButton({ open }: { open: () => void }): JSX.Element {
    const account = useSelector((state: RootState) => state.account.account);

    const handleAuthentication = async (): Promise<void> => {
        const challange = await getChallange();
    };
    return (
        <div
            className={styles.wrapper}
            onClick={() => {
                if (!account) {
                    open();
                } else {
                    handleAuthentication();
                }
            }}
        >
            {account ? 'Mint' : 'Connect'}
        </div>
    );
}
