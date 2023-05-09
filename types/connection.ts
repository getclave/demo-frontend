import type { ModalController } from '@ethylene/ui-hooks/useModal';

export enum ConnectionOptions {
    CONNECT = 'connect',
    CREATE = 'create',
}

export interface ConnectAccountProps {
    connectionOption: ConnectionOptions;
    setConnection: () => void;
    modalController?: ModalController;
}
