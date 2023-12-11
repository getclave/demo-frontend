import { TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { Button } from 'ui';

import styles from './CreateZkEmail.module.scss';
import { getCreateEmailLink } from './createLink';

export function CreateZkEmail({
    setStep,
}: {
    setStep: (step: 'create' | 'add') => void;
}): JSX.Element {
    const [email, setEmail] = useState<string>('');

    const handleCreate = async (): Promise<void> => {
        const [, sendLink] = getCreateEmailLink(email);
        window.open(sendLink, '_blank');
        setTimeout(() => {
            setStep('add');
        }, 2500);
    };

    const isValidEmail = useMemo(() => {
        return email.includes('@') && email.includes('.');
    }, [email]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.subtitle}>
                Have you created Email-Wallet before?
            </div>
            <div className={styles.createZkEmail}>
                <div className={styles.subtitle}>If yes, pass this step.</div>
                <Button
                    width="160px"
                    height="40px"
                    color="special"
                    onClick={(): void => {
                        setStep('add');
                    }}
                >
                    Already Created
                </Button>
                <div className={styles.line}></div>
                <div className={styles.subtitle}>
                    If no, enter your email and create it.
                </div>
                <div className={styles.flex}>
                    <div className={styles.input}>
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                            className={styles.inputField}
                            size="small"
                            value={email}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ): void => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <Button
                        width="160px"
                        height="40px"
                        color="special"
                        onClick={handleCreate}
                        disabled={!isValidEmail}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
}
