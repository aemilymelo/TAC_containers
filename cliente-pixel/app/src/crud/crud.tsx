import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { DefaultFilter } from "../models/DefaultFilter";
import { Paginator } from "../models/Paginator";


export const useCrud = <F extends DefaultFilter, T> (httpClient: AxiosInstance, baseUrl: string) => {
    
    const findById = async (id: any): Promise<T> =>{
        const response = await httpClient.get(baseUrl + "/" +id, {
            withCredentials: true,
            params: {}
        });
        return response.data
    }
    const findAll = async (filter?: F, configRequest?: AxiosRequestConfig<any>): Promise<Paginator<T>> => {
        const response = await httpClient.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            withCredentials: true,
            params: filter,
            ...configRequest
        });
        return response.data;
    }

    const insert = async (registro: T): Promise<T> => {
        const response: AxiosResponse<T> = await httpClient.post<T>(baseUrl, registro, { withCredentials: true });
        return response.data
    }

    const update = async (registro: T, id: number): Promise<void> => {
        return await httpClient.put(baseUrl+"/"+id, registro, { withCredentials: true });
    }

    const remove = async (id: number): Promise<void> => {
        return await httpClient.delete(baseUrl+'/'+id, { withCredentials: true });
    }

    const exportarExcel = async (filter?: F): Promise<any> => {

        const response = await httpClient.get(baseUrl+'/exportar-excel', {
            withCredentials: true, 
            params: filter,
            responseType: 'arraybuffer',
            headers:
            {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });

        return response.data;
    }
    
    return {
        baseUrl,
        findById,
        findAll,
        insert,
        update,
        remove,
        exportarExcel,
    }
}

export default useCrud;