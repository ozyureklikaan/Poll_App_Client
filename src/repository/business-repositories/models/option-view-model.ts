import { VoteViewModel } from './vote-view-model';

export class OptionViewModel {
    constructor() {
        this.Votes = [];
    }

    Id: string;
    Content: string;
    PollId: string;
    Votes: Array<VoteViewModel>;
}