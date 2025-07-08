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

type Cultura = {
    id: string;
    nome: string;
    variedade?: string;
    dataPlantio: string;
    dataColheitaPrevista?: string;
    dataColheitaReal?: string;
    area: number;
    status: 'plantado' | 'germinando' | 'crescimento' | 'floração' | 'colhido' | 'perdido';
    latitude?: number;
    longitude?: number;
    propriedade: {
        id: string;
        nome?: string;
    };
    observacoes?: string;
};


export const useCUlturaService =()=>{
    const baseUrl = API_2+'/cultura';
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
  culturas {
    id
    nome
    variedade
    dataPlantio
    dataColheitaPrevista
    dataColheitaReal
    area
    status
    latitude
    longitude
    propriedade {
      id
      nome
    }
    observacoes
  }
}
    `;
    const response = await httpClient.post(baseUrl, {
        query,
    });
    return response.data;
    }



    const createCultura = async (culturaInput: Omit<Cultura, 'id'>): Promise<Cultura> => {
        const query = `
            {
            cultura {
                id
                nome
                variedade
                dataPlantio
                dataColheitaPrevista
                dataColheitaReal
                area
                status
                latitude
                longitude
                propriedade {
                id
                nome
                }
                observacoes
            }
            }
        `;
        const response = await httpClient.post(baseUrl, {
            query
        });
        return response.data.data.createCultura;
    };

       return {
        ...crud,
        findAll2,
        createCultura,
        execute
    } 
 
}