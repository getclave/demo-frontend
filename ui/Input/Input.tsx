import { clsnm } from '@ethylene/utils';
import type { ComponentPropsWithoutRef } from 'react';
import { Alert } from 'ui';

import styles from './Input.module.scss';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    containerClassName?: string;
    rightEl?: JSX.Element;
    leftEl?: JSX.Element;
    containerProps?: ComponentPropsWithoutRef<'div'>;
    height?: string;
    extendRight?: boolean;
    extendLeft?: boolean;
    hideLeftBorder?: boolean;
    hideRightBorder?: boolean;
    hideBorder?: boolean;
    rightElClassName?: string;
    leftElClassName?: string;
    error?: string;
    success?: string;
    regularMessage?: string;
    absoluteError?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    color: 'dark' | 'light';
}

const Input = ({
    value,
    onChange,
    containerClassName,
    rightElClassName,
    leftElClassName,
    containerProps,
    rightEl,
    leftEl,
    height = '58px',
    extendRight = false,
    extendLeft = false,
    hideLeftBorder,
    hideRightBorder,
    hideBorder,
    className,
    style,
    error,
    success,
    regularMessage,
    absoluteError,
    inputRef,
    color = 'dark',
    ...props
}: InputProps): JSX.Element => {
    return (
        <div
            className={clsnm(styles.wrapper, containerClassName)}
            {...containerProps}
        >
            <input
                ref={inputRef}
                style={{ height, ...style }}
                value={value}
                onChange={onChange}
                className={clsnm(
                    styles.input,
                    hideLeftBorder && styles.hideLeftBorder,
                    hideRightBorder && styles.hideRightBorder,
                    hideBorder && styles.hideBorder,
                    extendLeft && styles.extendLeft,
                    extendRight && styles.extendRight,
                    rightEl && styles.rightEl,
                    leftEl && styles.leftEl,
                    color === 'dark' ? styles.dark : styles.light,
                    className,
                )}
                {...props}
            />
            {error && (
                <Alert
                    style={{
                        marginBottom: '16px',
                        marginTop: '8px',
                        position: absoluteError ? 'absolute' : 'relative',
                        bottom: absoluteError ? '-48px' : undefined,
                    }}
                    label={'error'}
                    message={error}
                />
            )}
            {success && (
                <Alert
                    style={{
                        marginBottom: '16px',
                        marginTop: '8px',
                        position: absoluteError ? 'absolute' : 'relative',
                        bottom: absoluteError ? '-48px' : undefined,
                    }}
                    label={'success'}
                    message={success}
                />
            )}
            {regularMessage && (
                <Alert
                    style={{
                        marginBottom: '16px',
                        marginTop: '8px',
                        position: absoluteError ? 'absolute' : 'relative',
                        bottom: absoluteError ? '-48px' : undefined,
                        fontSize: '14px',
                        opacity: 0.8,
                    }}
                    label={'regular'}
                    message={regularMessage}
                />
            )}
            {rightEl && (
                <div className={clsnm(styles.right, rightElClassName)}>
                    {rightEl}
                </div>
            )}
            {leftEl && (
                <div className={clsnm(styles.left, leftElClassName)}>
                    {leftEl}
                </div>
            )}
        </div>
    );
};

export { Input };
