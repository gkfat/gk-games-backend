import AvatarModel from 'src/model/avatar';

class AvatarsService {
    async list() {
        return await AvatarModel.list();
    }
}

export default new AvatarsService();
