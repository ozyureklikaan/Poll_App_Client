import { OptionViewModel } from './option-view-model';

export class PollViewModel {
    constructor() {
        this.Options = [];
    }

    Id: string;
    Title: string;
    CreatorIpAddress: string;
    Options: Array<OptionViewModel>;
}