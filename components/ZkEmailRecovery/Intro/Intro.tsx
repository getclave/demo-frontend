import styles from './Intro.module.scss';

export function Intro(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Demo for zkemail recovery</div>
            <div className={styles.madeBy}>By Clave</div>
        </div>
    );
}
