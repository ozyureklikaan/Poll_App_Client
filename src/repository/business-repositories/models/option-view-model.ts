import { VoteViewModel } from './vote-view-model';

export class OptionViewModel {
    constructor() {
        this.Votes = [];
    }

    Id: string;
    Context: string;
    // PollId: string;
    Votes: Array<VoteViewModel>;
}