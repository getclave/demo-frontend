import type { ComponentPropsWithoutRef } from 'react';
import { Spinner } from 'ui/Spinner/Spinner';
import { clsnm } from 'utils/clsnm';

import styles from './Button.module.scss';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    color?:
        | 'blue'
        | 'neutral'
        | 'pink'
        | 'ghost'
        | 'red'
        | 'gray'
        | 'black'
        | 'white'
        | 'purple'
        | 'transparentWhite'
        | 'transparentBlack';
    textPosition?: 'center' | 'left' | 'right';
    height?: string;
    width?: string;
    fullwidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    fontSize?: 'fs12' | 'fs14' | 'fs16' | 'fs18';
    fontWeight?: 'fw400' | 'fw500' | 'fw600' | 'fw700';
    lineHeight?: 'lhNormal' | 'lh22';
}

const Button = ({
    className,
    children,
    color = 'blue',
    textPosition = 'center',
    height,
    width,
    fullwidth,
    disabled,
    style = {},
    loading,
    fontSize = 'fs14',
    fontWeight = 'fw500',
    lineHeight = 'lh22',
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <button
            style={{
                height: height,
                width: width ? width : undefined,
                ...style,
            }}
            className={clsnm(
                styles.wrapper,
                styles[color],
                styles[textPosition],
                disabled && styles.disabled,
                loading && styles.loading,
                className,
            )}
            {...props}
        >
            {' '}
            {loading && (
                <div className={styles.loader}>
                    {' '}
                    <Spinner />{' '}
                </div>
            )}
            <span
                className={clsnm(
                    styles.text,
                    styles[color],
                    styles[textPosition],
                    styles[fontSize],
                    styles[fontWeight],
                    styles[lineHeight],
                    fullwidth && styles['fullwidth'],
                    loading && styles.loading,
                )}
            >
                {' '}
                {children}
            </span>{' '}
        </button>
    );
};

export { Button };
