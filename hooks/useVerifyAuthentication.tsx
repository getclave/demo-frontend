import { ABIs } from 'constants/abi';
import { ADDRESSES } from 'constants/address';
import { Contract } from 'ethers';
import type { ModalController } from 'hooks/useModal';
import { authenticate, getChallange } from 'module/webauthn';
import { getSignatureVerifyParamEncoded } from 'module/webauthnHelper';
import { encodeChallenge, getDefaultUserOp } from 'module/webauthnUtils';
import type { UserOp } from 'module/webauthnUtils';
import { provider } from 'restapi/index';
import type { AccountV2 } from 'restapi/types';
import { getClientIds } from 'utils/getClientIds';

export const useVerifyAuthentication = async (
    _account: AccountV2,
    _clientId: string,
    _publicKey: string,
    infoModal: ModalController,
    setInfo: (value: string) => void,
): Promise<boolean> => {
    if (!_account) return false;
    try {
        const clientIds: Array<string> = getClientIds(_account);
        infoModal.open();
        setInfo('AUTH');
        const challenge: string = await getChallange(_account.address);
        const encodedChallenge: string = encodeChallenge(challenge);
        const authenticationResponse = await authenticate(
            clientIds,
            encodedChallenge,
        );
        if (!authenticationResponse) {
            infoModal.close();
            return false;
        }
        const signature: string = await getSignatureVerifyParamEncoded(
            authenticationResponse.authenticatorData,
            authenticationResponse.clientData,
            challenge,
            _publicKey,
            authenticationResponse.signature,
        );
        const contract: Contract = new Contract(
            ADDRESSES.verification,
            ABIs.verificationContract,
            provider,
        );
        const userOp: UserOp = await getDefaultUserOp(
            _account.address,
            signature,
        );

        const res = await contract.validateSignature(
            userOp,
            challenge,
            Buffer.from(_publicKey, 'hex'),
        );

        if (res.toString() === '0') {
            setInfo('LOGINED');
            setTimeout(() => {
                infoModal.close();
            }, 3000);
        } else {
        }

        return res.toString() === '0';
    } catch (e) {
        infoModal.close();
        console.log(e);
        return false;
    }
};
