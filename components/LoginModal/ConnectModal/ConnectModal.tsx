import type { ModalController } from '@ethylene/ui-hooks/useModal';
import type {
    AuthenticationEncoded,
    RegistrationEncoded,
} from '@passwordless-id/webauthn/dist/esm/types';
import FINGERPRINT from 'assets/fingerprint.png';
import QRLOGO from 'assets/qr-seal.png';
import { useDebounce } from 'hooks/useDebounce';
import { QRCodeSVG } from 'qrcode.react';
import { useGetAccountQueryV2 } from 'queries/useGetAccountQueryV2';
// import { useGetAccountQuery } from 'queries/useGetAccountQuery';
import { useGetUserQuery } from 'queries/useGetUserQuery';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import type { QRCode } from 'react-qrcode-logo';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setAccount } from 'store/slicers/account';
import { Button, Input, Modal } from 'ui';
import {
    authenticate,
    encodeChallenge,
    register,
    verifySignatureOnChain,
} from 'utils/webauthn';

import styles from './ConnectModal.module.scss';

enum ConnectionOptions {
    UNKNOWN = 'unknown',
    MOBILE = 'mobile',
    DESKTOP = 'desktop',
}

export function ConnectModal(): JSX.Element {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account.account);
    const [option, setOption] = useState<ConnectionOptions>(
        ConnectionOptions.UNKNOWN,
    );

    const [display, setDisplay] = useState<string | null>(null);
    const [challenge, setChallenge] = useState<string>(
        '0x94E9b636d0f3BDc08019B450F7f2F4Ef5b4eb2Ca',
    );

    const [registrationResponse, setRegistrationResponse] =
        useState<RegistrationEncoded | null>(null);
    const [authenticationResponse, setAuthenticationResponse] =
        useState<AuthenticationEncoded | null>(null);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.back}
                onClick={(): void => {
                    dispatch(setAccount(undefined));
                }}
            >
                <IoIosArrowBack size={20} />
            </div>
            {option === ConnectionOptions.UNKNOWN ? (
                <div className={styles.continueOptions}>
                    <div className={styles.fingerprint}>
                        <img src={FINGERPRINT.src}></img>
                        <div className={styles.text}>Connection options</div>
                    </div>

                    <div className={styles.options}>
                        <Button
                            width="150px"
                            height="50px"
                            color="purple"
                            onClick={(): void => {
                                setOption(ConnectionOptions.DESKTOP);
                            }}
                        >
                            By authorizing this device
                        </Button>

                        <Button
                            width="150px"
                            height="50px"
                            color="purple"
                            onClick={(): void => {
                                setOption(ConnectionOptions.MOBILE);
                            }}
                        >
                            Via Authenticator
                        </Button>
                    </div>
                </div>
            ) : option === ConnectionOptions.MOBILE ? (
                <div className={styles.qrCode}>
                    <div className={styles.fingerprint}>
                        <img src={FINGERPRINT.src}></img>
                        <div className={styles.description}>
                            Scan QR code with your authenticator app to connect
                        </div>
                    </div>
                    <QRCodeSVG
                        value={
                            '2b043ef7149d8f4865170defd32a8cd57ca1a434dc093866bc5f439014e059cf9bed6eacd6938ecfdeb3fa0d6a516a2fab612d3d335987ca0ba0fbab13e31864'
                        }
                        size={150}
                        imageSettings={{
                            src: QRLOGO.src,
                            x: undefined,
                            y: undefined,
                            height: 32,
                            width: 32,
                            excavate: true,
                        }}
                    />
                </div>
            ) : (
                <div className={styles.webauthn}>
                    <div className={styles.fingerprint}>
                        <img src={FINGERPRINT.src}></img>
                        <div className={styles.description}>
                            {!authenticationResponse
                                ? 'Register, and then authorize this device'
                                : 'Scan QR code with your authenticator app to authorize this device'}
                        </div>
                    </div>
                    {!display ? (
                        <Button
                            width="150px"
                            height="50px"
                            color="purple"
                            onClick={async (): Promise<void> => {
                                const registrationResponse = await register(
                                    encodeChallenge(challenge),
                                );
                                console.log(registrationResponse);
                                setRegistrationResponse(registrationResponse);
                                setDisplay(
                                    JSON.stringify(registrationResponse),
                                );
                            }}
                        >
                            Register
                        </Button>
                    ) : !authenticationResponse ? (
                        <Button
                            width="150px"
                            height="50px"
                            color="purple"
                            onClick={async () => {
                                if (registrationResponse == null) {
                                    alert('Invalid registration');
                                    return;
                                }
                                const res = await authenticate(
                                    registrationResponse.credential.id,
                                    encodeChallenge(challenge),
                                );

                                setAuthenticationResponse(res);
                                setDisplay(JSON.stringify(res));
                            }}
                        >
                            Authenticate
                        </Button>
                    ) : (
                        <QRCodeSVG
                            value={account?.address as string}
                            size={150}
                            imageSettings={{
                                src: QRLOGO.src,
                                x: undefined,
                                y: undefined,
                                height: 32,
                                width: 32,
                                excavate: true,
                            }}
                        />
                    )}

                    {!authenticationResponse && (
                        <div className={styles.display}>{display}</div>
                    )}
                </div>
            )}
        </div>
    );
}
