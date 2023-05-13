import { clsnm } from 'utils/clsnm';

describe('sum module', () => {
    it('Correcly concat classes', () => {
        expect(clsnm('class1', 'class2')).to.equal('class1 class2');
        expect(clsnm('class1', false)).to.equal('class1');
        expect(clsnm('class1', true)).to.equal('class1');
        expect(clsnm('class1', '')).to.equal('class1');
    });
});
