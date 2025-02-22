
import { format, parse, parseISO, getDay } from 'date-fns';


declare module '#app' {
    interface NuxtApp {
        $joi: typeof Joi;
        $toast: toast;
        $datefns: {
            format: typeof format;
            parse: typeof parse;
            parseISO: typeof parseISO;
            getDay: typeof getDay;
        };
    }
}

