import { AxiosRequestConfig } from "axios";
import { API_2 } from "../../config/api";
import useCrud from "../../crud/crud";
import { getAPIClient } from "../../http/index.axios";
import { Paginator } from "../../models/Paginator";


type User = {
    id: number;
    name: string;
    email: string;
};


export const useServiceV2 =()=>{
    const baseUrl = API_2+'/user';
    const httpClient = getAPIClient();
    const crud = useCrud<any, any>(httpClient, baseUrl);

    const execute = async (query: string, variables?: any): Promise<any> => {
        const response = await httpClient.post(baseUrl, {
            query,
            variables,
        });
        return response.data;
    }
    const findAll2 = async (filter?: any, configRequest?: AxiosRequestConfig<any>): Promise<Paginator<any>> => {
         const query = `
{
  users {
    id
    nome
    email
  }
}
    `;
    const response = await httpClient.post(baseUrl, {
        query,
    });
    return response.data;
    }
    return {
        ...crud,
        findAll2,
        execute
    }
}