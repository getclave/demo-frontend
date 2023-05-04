import { useOnClickOutside } from '@ethylene/ui-hooks';
import type { ModalController } from '@ethylene/ui-hooks/useModal';
import { clsnm } from '@ethylene/utils';
import { useEffect } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

import styles from './Modal.module.scss';

type ModalProps = {
    children: ReactNode;
    modalController: ModalController;
    closeOnClickOutside?: boolean;
    className?: string;
    bodyProps?: ComponentPropsWithoutRef<'div'>;
    width?: string;
    showCloseIcon?: boolean;
};

const Modal = ({
    children,
    modalController,
    closeOnClickOutside = true,
    showCloseIcon = true,
    className,
    bodyProps = {},
    width,
}: ModalProps): ReactNode => {
    const { isOpen, close } = modalController;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [isOpen]);

    const outsideRef = useOnClickOutside<HTMLDivElement>(() => {
        if (closeOnClickOutside) {
            close();
        }
    });

    return isOpen ? (
        <div
            style={{ animationTimingFunction: 'linear' }}
            className={styles.layout}
        >
            <div
                {...bodyProps}
                ref={outsideRef}
                className={clsnm(
                    styles.body,
                    'bg-white dark:bg-neutral-800',
                    className,
                )}
                style={{
                    width: width,
                    ...(bodyProps.style || {}),
                }}
            >
                {showCloseIcon && (
                    <div
                        onClick={close}
                        className={clsnm(
                            styles.close,
                            'flex items-center align-center bg-neutral-100 hover:bg-gray-20 dark:bg-neutral-900 hover:dark:bg-black text-black dark:text-white rounded-full',
                        )}
                    >
                        <IoMdClose />
                    </div>
                )}
                {children}
            </div>
        </div>
    ) : null;
};

export { Modal };
