import googleAuth from 'src/infra/google-auth/index';
import { logger } from 'src/util/logger';

class OAuthService {
    async verifyGoogleLogin(data: { idToken: string }) {
        const { idToken } = data;

        try {
            const userInfo = await googleAuth.verify(idToken);

            if (!userInfo) {
                return null;
            }

            if (googleAuth.verifyClientId(userInfo.clientId)) {
                return {
                    email: userInfo.email,
                    name: userInfo.name,
                    identifier: userInfo.userId,
                    credential: null,
                };
            }
        } catch (err) {
            logger.app.error(
                'google auth login failed: ',
                JSON.stringify(data)
            );
        }

        return null;
    }
}

export default new OAuthService();
