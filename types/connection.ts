export enum ConnectionOptions {
    CONNECT = 'connect',
    CREATE = 'create',
}

export interface ConnectAccountProps {
    connectionOption: ConnectionOptions;
    setConnection: () => void;
}
