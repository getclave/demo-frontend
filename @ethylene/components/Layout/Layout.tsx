import { Head } from '@ethylene/components';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Layout.module.scss';

interface LayoutProps extends ComponentPropsWithoutRef<'div'> {
  includeHead?: boolean;
}

const Layout = ({ children, includeHead = true, ...props }: LayoutProps) => {
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
