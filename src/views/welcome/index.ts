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

    poll: PollViewModel = new PollViewModel();
    findPoll: PollViewModel = null;

    searchPollId: string = '';

    tabs: number = null;

    created() {
        this.initializePoll();

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
           
        });
    }

    createPoll() {
        let that = this;
        let createdPoll = null
        let pollViewModel = new PollViewModel();

        pollViewModel.Id = newGuid();
        pollViewModel.Title = this.poll.Title;
        IpRepository.getIp().then(x => {
            pollViewModel.CreatorIpAddress = x;
        });
        this.poll.Options.forEach(option => {
            if (option.Content != undefined && option.Content != null && option.Content != '') {
                option.Id = newGuid();
                option.PollId = pollViewModel.Id;
                pollViewModel.Options.push(option);
            }
        });

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