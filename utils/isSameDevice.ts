import type { AccountV2 } from 'restapi/types';

export const isSameDevice = (_account: AccountV2, _device: string): boolean => {
    for (let i = 0; i < _account.options.length; i++) {
        if (
            _account.options[i].method_name
                .slice(_account.name.length + 1, -2)
                .toLocaleLowerCase() === _device.toLocaleLowerCase()
        )
            return true;
    }
    return false;
};
