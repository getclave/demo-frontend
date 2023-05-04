import styles from './Header.module.scss';

export function Header(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Seal On Demo</div>
            <div className={styles.title}>
                The Ultimate Blockchain Onboarding: Fast And Secure.
            </div>
            <div className={styles.description}>
                This app showcases the combination of WebAuthn and Ethereum
                Account Abstraction. No more wallet installation or transaction
                fee hurdles, get ready for a paradigm shift 🚀
            </div>
        </div>
    );
}
