/* eslint-disable @typescript-eslint/no-namespace */

export namespace Auth {
    export namespace Login {
        export interface Request {
            type: 'google';
            idToken: string;
        }
    }
}
