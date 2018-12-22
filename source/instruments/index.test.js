import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments:', () => {
    test('sum function should be a Function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as string as second argument', () => {
        expect(() => sum(2, 'привет')).toThrow();
    });

    test('sum function should throw, when called with non-number type as string as first argument', () => {
        expect(() => sum('привет', 2)).toThrow();
    });

    test('sum function should return an addition of two arguments passed', () => {
        expect(sum(3, 2)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });

    test('sum function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a Function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called with non-number type as an argument', () => {
        expect(() => getUniqueID('привет')).toThrow();
    });

    test('getUniqueID function should return 15 characters by default', () => {
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    test('getFullApiUrl function should be a Function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw, when called with non-string type of first argument', () => {
        expect(() => getFullApiUrl(1, '123123')).toThrow();
    });

    test('getFullApiUrl function should throw, when called with non-string type of second argument', () => {
        expect(() => getFullApiUrl('123123', 1)).toThrow();
    });

    test('getFullApiUrl the function should combine both arguments into a string, separated by the symbol "/"', () => {
        expect(getFullApiUrl('test', '123123')).toBe('test/123123');
    });
});
