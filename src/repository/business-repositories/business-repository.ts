import { AxiosClient } from '@/services/axios-client';
import { PollViewModel } from './models/poll-view-model';
import { deserialize } from "class-transformer";

const resource = '/poll';
const baseServiceURL = `${process.env.SERVICE_URL}`;

export default class extends AxiosClient {
    constructor() {
        super(baseServiceURL);
    }

    async getPoll(pollId: string): Promise<PollViewModel> {
        const params = {
            pollId: pollId
        };

        return await this.axiosClient.get(`${resource}`, { params }).then(response => {
            return deserialize(PollViewModel, JSON.stringify(response.data));
        });
    }

    async createPoll(poll: PollViewModel): Promise<PollViewModel> {
        return await this.axiosClient.post(`${resource}`, poll).then(response => {
            console.log(response);
            return deserialize(PollViewModel, JSON.stringify(response.data));
        });
    }
}