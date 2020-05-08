import BaseView from '../baseView';
import Component from 'vue-class-component';
import { mask } from "vue-the-mask";
import errorMessageMixin from './mixins/error-message';
import { validation } from './validations/validation';
import { validationMixin } from 'vuelidate';
import { RepositoryFactory } from '@/repository-factory';
import { PollViewModel } from '@/repository/business-repositories/models/poll-view-model';
import { OptionViewModel } from '@/repository/business-repositories/models/option-view-model';
import { newGuid, isGuid } from '@/helper/guid';
import { Watch } from 'vue-property-decorator';
import { VoteViewModel } from '@/repository/business-repositories/models/vote-view-model';

const BusinessRepository = RepositoryFactory.get("business");
const IpRepository = RepositoryFactory.get("ip");

@Component({
    directives: { mask },
    validations: validation,
    mixins: [validationMixin, errorMessageMixin]
})
export default class Welcome extends BaseView {
    constructor() {
        super();
    }

    clientIpAddress: string = "";

    poll: PollViewModel = new PollViewModel();

    findPoll: PollViewModel = null;
    isPollCreator: boolean = false;

    searchPollId: string = '';

    tabs: number = null;

    created() {
        this.initializePoll();
        this.getClientIpAddress();

        if (this.$route.query.searchPollId != undefined) {
            this.tabs = 1;
            this.searchPollId = this.$route.query.searchPollId.toString();
            this.getPoll();
        }
    }

    initializePoll() {
        for (let index = 0; index < 3; index++) {
            this.poll.Options.push(new OptionViewModel());
        }
    }

    getClientIpAddress() {
        IpRepository.getIp().then(x => {
            this.clientIpAddress = x;
            console.log("Client Ip Address => " + this.clientIpAddress);
        });
    }

    addNewOption() {
        if (this.poll.Options.length < 15) {
            this.poll.Options.push(new OptionViewModel());
        }
    }

    changeSearch() {
        if (this.searchPollId.length == 36) {
            if (isGuid(this.searchPollId)) {
                this.getPoll();
            }
        }
    }

    getPoll() {
        BusinessRepository.getPoll(this.searchPollId).then(x => {
            this.findPoll = x;
        }).finally(x => {
            console.log(this.findPoll);
        });
    }

    @Watch("findPoll")
    changeSearchPoll() {
        if (this.findPoll.CreatorIpAddress == this.clientIpAddress) {
            this.isPollCreator = true;
        }
    }

    isVoted(option: OptionViewModel) {
        if(option.Votes.find(x => x.IpAddress == this.clientIpAddress)) {
            return true;
        }
        return false;
    }

    useVote(selectedOptionId: string) {
        let findVote: VoteViewModel = null;
        this.findPoll.Options.forEach(option => {
            let matchedVote = option.Votes.find(x => x.IpAddress == this.clientIpAddress)
            if (matchedVote) {
                findVote = matchedVote;
            }
        });

        if(!findVote) {
            findVote = new VoteViewModel();
            findVote.Id = newGuid();
            findVote.IpAddress = this.clientIpAddress;
            findVote.OptionId = selectedOptionId;
            this.createVote(findVote);
        }
        else {
            let oldOptionId = findVote.OptionId;
            findVote.OptionId = selectedOptionId;
            this.updateVote(findVote, oldOptionId);
        }
    }

    createVote(vote: VoteViewModel) {
        BusinessRepository.createVote(vote).then(x => {
            if (x.Id) {
                this.findPoll.Options.find(x => x.Id == vote.OptionId).Votes.push(vote);
            }
        });
    }

    updateVote(vote: VoteViewModel, oldOptionId: string) {
        BusinessRepository.updateVote(vote).then(x => {
            
        }).then(x => {
            setTimeout(() => {
                BusinessRepository.getPoll(this.findPoll.Id).then(x => {
                    this.findPoll = x;
                });
            }, 1000);
        });
    }

    createPoll() {
        let that = this;
        let createdPoll = null
        let pollViewModel = new PollViewModel();

        pollViewModel.Id = newGuid();
        pollViewModel.Title = this.poll.Title;
        // IpRepository.getIp().then(x => {
        //     pollViewModel.CreatorIpAddress = x;
        // });
        pollViewModel.CreatorIpAddress = this.clientIpAddress;
        this.poll.Options.forEach(option => {
            if (option.Content != undefined && option.Content != null && option.Content != '') {
                option.Id = newGuid();
                option.PollId = pollViewModel.Id;
                pollViewModel.Options.push(option);
            }
        });

        // setTimeout(() => {
            BusinessRepository.createPoll(pollViewModel).then(x => {
                createdPoll = x;
            }).finally(function () {
                if (createdPoll) {
                    that.navigate("/", { searchPollId: createdPoll.Id });
                    location.reload();
                    that.success("Poll Created");
                }
                else {
                    that.error("An error was encountered. Please try again.");
                }
            });
        // }, 1000);
    }
    
    @Watch("poll")
    checkPollForCreate() {
        let validOption = 0;

        if (this.poll.Title != undefined && this.poll.Title != null && this.poll.Title != '') {
            this.poll.Options.forEach(option => {
                if (option.Content != undefined && option.Content != null && option.Content != '') {
                    validOption++;
                }
            });
        }

        return (validOption >= 2) ? false : true;
    }
}