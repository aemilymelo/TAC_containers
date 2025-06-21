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

        const isLoginPage = window.location.pathname == '/auth/login';

        if (error && error.errorCode) {

            if (ErrorCodes.EXPTK01 == error.errorCode.code && !isLoginPage) {
                //Router.push("/auth/logout")
                httpUnauthorized(true);
                console.log("isTokenInvalid: {}")
            }

            if (ErrorCodes.ACDND01 == error.errorCode.code) {
                console.log('isPermissaoNegada: {}');
                //Router.push("/permissao-negada")
            }

        }

        if (err.error && err.status == 504) {

            console.log("erro 504 - conexao com servidor")

        }

        return Promise.reject(error); 
    });


    return httpClient;
}