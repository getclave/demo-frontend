export function clsnm(
    ...classes: Array<string | boolean | null | undefined>
): string {
    const mainClassArr: Array<string> = [];
    const clsArray = [...classes];

    for (const cls of clsArray) {
        if (typeof cls === 'string' && cls.trim() !== '') {
            mainClassArr.push(cls);
        }
    }

    return mainClassArr.join(' ');
}
