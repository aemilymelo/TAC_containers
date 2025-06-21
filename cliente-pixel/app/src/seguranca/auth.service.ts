
import { AxiosResponse } from "axios";
import { getAPIClient } from "../http/index.axios";
import { UserInfo } from "../models/UserInfo";
import { AccountCredentials } from "../models/AccountCredentials";



export const useAuthService = (baseUrl: any) => {

    const httpClient = getAPIClient()

    const signin = async (account: AccountCredentials): Promise<UserInfo> => {

        const response: AxiosResponse<UserInfo> = await httpClient.post<UserInfo>(baseUrl+'/login', account);
        return response.data;

    }

    const signinWithToken = async (token: string): Promise<UserInfo> => {

        const response: AxiosResponse<UserInfo> = await httpClient.post<UserInfo>(`${baseUrl}/token?token=${token}`, "",
            {
                withCredentials: true
            });
        return response.data;

    }

    const logout = async ()  => {

        const response: AxiosResponse<UserInfo> = await httpClient.post<UserInfo>(baseUrl+'/logout', {},
            {
                withCredentials: true
            });
        return response.data;

    }

    const getUserInfo = async (): Promise<UserInfo> => {

        const response: AxiosResponse<UserInfo> = await httpClient.post<UserInfo>(baseUrl+"/user-info", {},
            {
                withCredentials: true
            });

        return response.data;

    }


    return {
        signin,
        signinWithToken,
        logout,
        getUserInfo
    }
}
