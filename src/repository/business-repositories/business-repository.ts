import { AxiosClient } from '@/services/axios-client';
import { PollViewModel } from './models/poll-view-model';
import { deserialize } from "class-transformer";
import { OptionViewModel } from './models/option-view-model';
import { VoteViewModel } from './models/vote-view-model';

const resource = '/poll';
const resourceVote = '/vote';
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
            return this.createPollViewModel(response.data[0]);
            // return deserialize(PollViewModel, JSON.stringify(response.data));
        });
    }

    async createPoll(poll: PollViewModel): Promise<PollViewModel> {
        return await this.axiosClient.post(`${resource}`, poll).then(response => {
            return deserialize(PollViewModel, JSON.stringify(response.data));
        });
    }

    async createVote(vote: VoteViewModel): Promise<VoteViewModel> {
        return await this.axiosClient.post(`${resourceVote}`, vote).then(response => {
            return deserialize(VoteViewModel, JSON.stringify(response.data));
        });
    }

    async updateVote(vote: VoteViewModel): Promise<VoteViewModel> {
        return await this.axiosClient.put(`${resourceVote}`, vote).then(response => {
            return deserialize(VoteViewModel, JSON.stringify(response.data));
        });
    }

    createPollViewModel(response): PollViewModel {
        let responsePoll = new PollViewModel();
        responsePoll.Id = response.id;
        responsePoll.Title = response.title;
        responsePoll.CreatorIpAddress = response.creatorIpAddress;
        response.options.forEach(option => {
            let responseOption = new OptionViewModel();
            responseOption.Id = option.id;
            responseOption.Content = option.content;
            responseOption.PollId = option.pollId;
            if (option.votes.length != 0) {
                option.votes.forEach(vote => {
                    let responseVote = new VoteViewModel();
                    responseVote.Id = vote.id;
                    responseVote.IpAddress = vote.ipAddress;
                    responseVote.OptionId = vote.optionId;
                    responseOption.Votes.push(responseVote);
                });
            }
            responsePoll.Options.push(responseOption);
        });

        return responsePoll;
    }
}