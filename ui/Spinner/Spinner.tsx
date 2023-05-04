import { clsnm } from '@ethylene/utils';

import styles from './Spinner.module.scss';

const Spinner = ({
    className,
    size = 20,
}: {
    className?: string;
    size?: number;
}): JSX.Element => {
    return (
        <div
            style={{ width: `${size}px`, height: `${size}px` }}
            className={clsnm(styles.loader, className)}
        ></div>
    );
};

export { Spinner };
