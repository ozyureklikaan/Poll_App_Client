import { Vue } from 'vue-property-decorator'
// import { inputRules } from '@/helper/validations'
// import dateFormat from '@/utils/date-formatter';
// import miniToastr from '@/plugins/mini-toastr-notification';
// import { getUser } from '@/helper';


export default class BaseView extends Vue {
  constructor() {
    super();
  }

//   user = getUser();
//   rules = inputRules;
//   dateFormatter = dateFormat;

  navigate(path: string, query?: any) {
    const url = path.startsWith('/', 0) ? path : '/'.concat(path);
    this.$router.push({ path: url, query: query });
  }

//   showLoding() {
//     this.$store.commit("SET_LOADING", true);
//   }

//   hideLoading() {
//     setTimeout(() => this.$store.commit("SET_LOADING", false), 1000);
//   }

//   success(message: string, title: string = '') {
//     miniToastr.success(message, title)
//   }

//   info(message: string, title: string = '') {
//     miniToastr.info(message, title)
//   }

//   warn(message: string, title: string = '') {
//     miniToastr.warn(message, title)
//   }

//   error(message: string, title: string = '') {
//     miniToastr.error(message, title, 5000)
//   }

//   handleError(error: any | Error, title: string = 'Hata') {
//     let msg = error['detail'] || error.message;
//     miniToastr.error(msg, '', 5000);
//   }
}