import { CONFIG } from 'config';
import { useEffect } from 'react';

export const useTitle = (title: string): void => {
    useEffect(() => {
        document.title = `${CONFIG.APP} | ${title}`;

        return (): void => {
            document.title = `${CONFIG.APP}`;
        };
    }, [title]);
};
