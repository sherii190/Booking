import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = `http://localhost:3000/api`;

interface HttpInputRequest {
    uri?: string,
    method?: 'get' | 'post' | 'put' | 'delete',
    data?: any,
    headers?: {
        apikey: ''
    },
    successMessage?: string
}

export const api = async <T>(
    input: HttpInputRequest,
    errorHandler?: (error: any) => void
): Promise<T> => {
    try {
        let config = {
            ...input,
            url: `${BASE_URL}${input.uri}`,
            method: input.method || "get",
            headers: {
                apikey: localStorage.getItem("token")
            }
        }
        delete config.uri;
        console.log("config", config);
        const response: AxiosResponse<T> = await axios(config);
        if (input.successMessage) {
            Swal.fire({
                title: input.successMessage,
                icon: 'success'
            })
        }
        return response.data;
    } catch (error: any) {
        console.log(error);
        if (errorHandler) {
            errorHandler(error);
        }
        if (error.response?.data) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data
            })

        }
        throw error;
    }
};
