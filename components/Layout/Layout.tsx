import { CONFIG } from 'config';
import HeadComponent from 'next/head';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './Layout.module.scss';

interface LayoutProps extends ComponentPropsWithoutRef<'div'> {
    includeHead?: boolean;
}

const Layout = ({
    children,
    includeHead = true,
    ...props
}: LayoutProps): JSX.Element => {
    return (
        <>
            {includeHead && <Head />}
            <div className={styles.layout} {...props}>
                {children}
            </div>
        </>
    );
};

export { Layout };

const Head = (): JSX.Element => {
    return (
        <HeadComponent>
            <title>{CONFIG.APP}</title>
            <meta name="description" content={CONFIG.APP_DESCRIPTION} />
            <link rel="icon" href="/favicon.ico" />
        </HeadComponent>
    );
};
