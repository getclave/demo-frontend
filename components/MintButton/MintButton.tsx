import styles from './MintButton.module.scss';

export function MintButton({ open }: { open: () => void }): JSX.Element {
    return (
        <div className={styles.wrapper} onClick={open}>
            Mint
        </div>
    );
}
