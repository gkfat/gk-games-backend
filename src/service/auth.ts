import { UnauthorizedError } from 'src/error/index';
import { AccountAuthModel, AccountModel } from 'src/model';
import { Auth } from 'src/types/auth';

import oauthService from './oauth';

class AuthService {
    async loginOrCreate(data: Auth.Login.Request) {
        let id = null;

        // 第三方驗證
        const oauthResult = await oauthService.verifyGoogleLogin(data);

        if (
            !oauthResult ||
            !oauthResult.name ||
            !oauthResult.email ||
            !oauthResult.credential ||
            !oauthResult.identifier
        ) {
            throw new UnauthorizedError('oauth login failed.');
        }

        const authModel = await AccountAuthModel.findByIdentifier({
            type: data.type,
            identifier: oauthResult.identifier,
        });

        // 建立帳號
        if (!authModel) {
            id = await AccountModel.createAccount({
                accountData: {
                    email: oauthResult.email,
                    name: oauthResult.name,
                },
                authData: {
                    type: data.type,
                    identifier: oauthResult.identifier,
                    credential: oauthResult.credential,
                },
            });
        } else {
            id = authModel.account_id;
        }

        await AccountModel.updateLastLoginTime(id);

        return {
            id,
        };
    }
}

export default new AuthService();
