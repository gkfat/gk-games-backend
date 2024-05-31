/* eslint-disable @typescript-eslint/no-namespace */

export namespace Dto {
    export interface Avatar {
        id: number;
        title: string;
        description: string;
        image_url: string;
    }

    export interface Account {
        id: number;
        email: string;
        name: string;
        enabled: boolean;
        created_at: string;
        last_login_at: string;
        avatars: Avatar[];
    }
}
