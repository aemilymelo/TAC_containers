import Axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ErrorCodes } from "./error-codes";
import { useClientConfig } from "../seguranca/client.config.service";


export function getAPIClient(ctx?: any) {

    const { httpUnauthorized } = useContext(AuthContext)

    const serviceClientConfig = useClientConfig()


    let config = serviceClientConfig.getCurrentConfig();

    const proxyPrefix = config?.proxyPrefix;

    const httpClient: AxiosInstance = Axios.create({
        baseURL: (proxyPrefix?""+proxyPrefix:""),
        headers:{
            'Content-type': 'application/json',
            'Accept-language' : config?.locale ? config?.locale : 'pt_BR'
        }
    });

    httpClient.interceptors.response.use(function (response) {
        return response;

    }, function (err) {

        const error = err.response ? err.response.data : err;

        const isLoginPage = window.location.pathname == '/login';
        if(!error.valid){
            console.log("isTokenInvalid: {}")
        }


        return Promise.reject(error); 
    });


    return httpClient;
}