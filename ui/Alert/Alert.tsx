import type { ComponentPropsWithoutRef } from 'react';
import { MdWarning } from 'react-icons/md';
import { Icon } from 'ui';
import { clsnm } from 'utils/clsnm';

import styles from './Alert.module.scss';

interface AlertProps extends ComponentPropsWithoutRef<'div'> {
    label?: string;
    message?: string;
}

const Alert = ({
    children,
    label,
    message,
    ...props
}: AlertProps): JSX.Element => {
    return (
        <div className={clsnm(styles.wrapper, props.className)} {...props}>
            {label !== 'regular' && (
                <Icon
                    className={
                        label ? clsnm(styles.icon, styles[label]) : styles.icon
                    }
                >
                    <MdWarning />
                </Icon>
            )}
            <span
                className={
                    label ? clsnm(styles.text, styles[label]) : styles.text
                }
            >
                {message ?? children}
            </span>
        </div>
    );
};

export { Alert };
