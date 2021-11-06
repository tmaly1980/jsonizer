import { Reviver } from "../src";

describe('Errors', () => {
    describe('reviving', () => {
        test('Error', async () => {
            const msg = 'Oops !';
            const err = new Error(msg);
            const jsonErr = JSON.stringify(err);
            expect(jsonErr).toBe(`"Error: ${msg}"`);
            const jsonReviver = '{".":"Error"}';
            const reviver = JSON.parse(jsonReviver, Reviver.get<Reviver<Error>>());
            const errFromJson = JSON.parse(jsonErr, reviver);
            expect(errFromJson).toBeInstanceOf(Error);
            expect(errFromJson.name).toBe('Error');
            expect(errFromJson.message).toBe(msg);
        });
        test('TypeError', async () => {
            const msg = 'Oops !';
            const err = new TypeError(msg);
            const jsonErr = JSON.stringify(err);
            expect(jsonErr).toBe(`"TypeError: ${msg}"`);
            const jsonReviver = '{".":"TypeError"}';
            const reviver = JSON.parse(jsonReviver, Reviver.get<Reviver<TypeError>>());
            const errFromJson = JSON.parse(jsonErr, reviver);
            expect(errFromJson).toBeInstanceOf(TypeError);
            expect(errFromJson.name).toBe('TypeError');
            expect(errFromJson.message).toBe(msg);
        });
        test('MyError', async () => {
            // it is an unregistered error !
            class MyError extends Error {
                constructor(msg: string) {
                    super(msg);
                    this.name = 'MyError';
                }
            }
            const msg = 'Oops !';
            const err = new MyError(msg);
            const jsonErr = JSON.stringify(err);
            expect(jsonErr).toBe(`"MyError: ${msg}"`);
            const jsonReviver = '{".":"MyError"}';
            const reviver = JSON.parse(jsonReviver, Reviver.get<Reviver<MyError>>());
            const errFromJson = JSON.parse(jsonErr, reviver);
            expect(errFromJson).toBeInstanceOf(Error);
            expect(errFromJson.name).toBe('MyError');
            expect(errFromJson.message).toBe(msg);
        });

    });
});
