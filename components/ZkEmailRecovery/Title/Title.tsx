import styles from './Title.module.scss';

export function Title(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <div className={styles.poc}>PoC</div>
            <div className={styles.title}>ZK Email Recovery</div>
            <div className={styles.madeBy}>By Clave</div>
        </div>
    );
}
