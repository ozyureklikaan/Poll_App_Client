import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export const validation = {
    entity: {
        startDate: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(10)
        },
        endDate: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(10)
        }
    }
}