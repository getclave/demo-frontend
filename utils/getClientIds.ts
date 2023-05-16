import type { AccountV2 } from 'restapi/types';

export const getClientIds = (_account: AccountV2): Array<string> => {
    const creadentialIds: Array<string> = [];
    for (let i = 0; i < _account.options.length; i++) {
        const clientId = _account.options[i].client_id;
        if (_account.options[i].type === 'webauthn' && clientId) {
            creadentialIds.push(clientId);
        }
    }
    console.log('creadentials: ', creadentialIds);
    return creadentialIds;
};
