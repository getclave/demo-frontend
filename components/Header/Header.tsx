import styles from './Header.module.scss';

export function Header(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Welcome to Clave</div>
            <div className={styles.title}>
                The Ultimate Blockchain Onboarding: Fast And Secure.
            </div>
            <div className={styles.description}>
                This app showcases the combination of WebAuthn and Account
                Abstraction. No more wallet setup or transaction fee barriers,
                get ready to experience the wallet of the future: CLAVE 🚀
            </div>
        </div>
    );
}
