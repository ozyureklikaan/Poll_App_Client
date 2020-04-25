import { AxiosClient } from '@/services/axios-client';
import { deserialize } from "class-transformer";

const resource = '/';
const baseServiceURL = 'https://api.ipify.org?format=json';

export default class extends AxiosClient {
    constructor() {
        super(baseServiceURL);
    }

    async getIp(): Promise<String> {
        return await this.axiosClient.get(`${resource}`).then(response => {
            return response.data;
        });
    }
}