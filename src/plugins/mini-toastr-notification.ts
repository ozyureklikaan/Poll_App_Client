import miniToastr from 'mini-toastr';

miniToastr.init();

export default {
    success(message: string, title: string, timeout: number = 5000) {
        miniToastr.success(message, title, timeout, null)
    },

    info(message: string, title: string, timeout: number = 5000) {
        miniToastr.info(message, title, timeout, null)
    },

    warn(message: string, title: string, timeout: number = 5000) {
        miniToastr.warn(message, title, timeout, null)
    },

    error(message: string, title: string, timeout: number = 5000) {
        miniToastr.error(message, title, timeout, null)
    },
}