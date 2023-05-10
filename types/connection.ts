import type { ModalController } from '@ethylene/ui-hooks/useModal';

export enum ConnectionOptions {
    CONNECT = 'connect',
    CREATE = 'create',
    SELECT = 'select',
}

export interface ConnectAccountProps {
    connectionOption: ConnectionOptions;
    setConnection: () => void;
    modalController?: ModalController;
}
