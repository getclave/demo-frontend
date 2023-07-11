import { client } from '@passwordless-id/webauthn';
import type {
    AuthenticateOptions,
    AuthenticationEncoded,
    RegisterOptions,
    RegistrationEncoded,
} from '@passwordless-id/webauthn/dist/esm/types';
import { deviceType } from 'react-device-detect';

/**
 * Set WebAuthn options for the registration and authentication
 */

export const WebauthnOptions = (): {
    registerOptions: RegisterOptions;
    authOptions: AuthenticateOptions;
    algorithm: string;
} => {
    const userAgent: boolean =
        window.navigator.userAgent.toLowerCase().includes('mac') ||
        deviceType == 'mobile';
    return {
        registerOptions: {
            authenticatorType: userAgent ? 'auto' : 'both', // extern => remove browser
            userVerification: 'required',
            timeout: 60000,
            attestation: false,
            debug: false,
        } as RegisterOptions,
        authOptions: {
            authenticatorType: userAgent ? 'auto' : 'both', // extern => remove browser
            userVerification: 'required',
            timeout: 60000,
        } as AuthenticateOptions,
        algorithm: 'ES256',
    };
};

/**
 * Create a new passkey for the user
 * @param {string} user - Nickname for the registration
 * @param {string} challenge - Challenge for the registration, does not matter what it is for registration
 * @returns {RegistrationEncoded} - Registration return object
 */

export const register = async (
    user = 'clave',
    challenge = 'clave',
): Promise<RegistrationEncoded> => {
    const registration = await client.register(
        user,
        challenge,
        WebauthnOptions().registerOptions,
    );
    return registration;
};

/**
 * After the user has registered, authenticate the user with challenge
 * @param {Array<string>} credentialId - Credential ID from the registration
 * @param {string} challenge - Challenge for the authentication
 * @returns {AuthenticationEncoded} - Authentication return object
 */

export const authenticate = async (
    credentialId: Array<string>,
    challenge: string,
): Promise<AuthenticationEncoded> => {
    const login = await client.authenticate(
        credentialId,
        challenge,
        WebauthnOptions().authOptions,
    );

    return login;
};
