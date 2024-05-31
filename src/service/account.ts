import { InvalidRequestError } from 'src/error/index';
import { AccountModel } from 'src/model';
import { Dto } from 'src/types/dto';

function toDto(account: AccountModel): Dto.Account {
    const { id, email, name, enabled, created_at, last_login_at, avatars } =
        account;

    return {
        id,
        email,
        name,
        enabled,
        created_at: created_at.toISOString(),
        last_login_at: last_login_at.toISOString(),
        avatars,
    };
}

class AccountService {
    async getAccountById(id: number) {
        const result = await AccountModel.findById(id);

        if (!result) {
            throw new InvalidRequestError();
        }

        return toDto(result);
    }
}

export default new AccountService();
