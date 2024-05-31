import { v4 } from 'uuid';

function getUuid() {
    return v4();
}

function uuidToBase64(uuid: string) {
    return Buffer.from(uuid).toString('base64');
}

function getBase64Uuid() {
    return uuidToBase64(getUuid());
}

export const uuidHelper = {
    getBase64Uuid,
};
