
import getConfig from 'next/config'
import { parseCookies, setCookie,  } from 'nookies';
export const useClientConfig = () => {

    const cookieName = "x-config-client"


    const getCurrentConfig = (): any => {

        if (typeof window == "undefined") {
            return null;
        }

        const config: any = {
    
        }

        return config;
    }

    const persistCookie = (config: any) => {

        if (!config) {
            return
        }

        const strConfig: string = Buffer.from(JSON.stringify(config)).toString('base64');

        const expirationDate: Date = addMinutes(15)

        // Set
        setCookie(null, cookieName, strConfig, {
            //maxAge: 60, //1 min
            path: '/',
            expires: expirationDate
        })

    }

    const parseCookie = (): any => {

        const cookies = parseCookies();

        let cookieValue = null;

        if (cookies) {

            const filteredCookie = Object.entries(cookies).map(([name, value]) => name === cookieName ? value : null).filter(value => value)

            if (filteredCookie.length > 0) {
                cookieValue = filteredCookie[0]
            }

        }

        if (cookieValue) {
            cookieValue = Buffer.from(cookieValue, 'base64').toString()

            let parse = JSON.parse(cookieValue);

            const config: any = parse;

            return config;
        }

        return null;

    }

    return {
        getCurrentConfig
    }
}
function addMinutes(arg0: number): Date {
    const date = new Date();
    date.setMinutes(date.getMinutes() + arg0);
    return date;
}

