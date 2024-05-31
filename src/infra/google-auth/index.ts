import config from 'config';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(config.googleAuth.clientId);

async function verify(idToken: string) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: config.googleAuth.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
        return null;
    }

    return {
        email: payload.email,
        clientId: payload.aud,
        domain: payload.hd,
        name: payload.name,
        avatarUrl: payload.picture,
        userId: ticket.getUserId(),
    };
}

function verifyClientId(clientId: string) {
    return clientId === config.googleAuth.clientId;
}

export default {
    verify,
    verifyClientId,
};
