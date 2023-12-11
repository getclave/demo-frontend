import type { ModalController } from 'hooks/useModal';

export enum ConnectionOptions {
    CONNECT = 'connect',
    CREATE = 'create',
    SELECT = 'select',
    STARTRECOVERY = 'startrecovery',
}

export interface ConnectAccountProps {
    connectionOption: ConnectionOptions;
    setConnection: () => void;
    modalController?: ModalController;
}
