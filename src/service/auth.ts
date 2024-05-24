export class AuthService {
    async login() {
        const result = {
            hello: 'world',
        };
        return result;
    }
}

export default new AuthService()
