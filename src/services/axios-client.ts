import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

export class AxiosClient {
    private baseUrl: string | undefined;
    private config: AxiosRequestConfig | {};
    axiosClient: AxiosInstance | undefined;

    constructor(_baseUrl: string) {
        this.baseUrl = _baseUrl;

        this.setConfiguration();
        this.create();
    }

    getConfig(): AxiosRequestConfig {
        return this.config;
    }

    private setConfiguration() {
        this.config = <AxiosRequestConfig>{
            baseURL: this.baseUrl,
            headers: {
            //   'Access-Control-Allow-Origin': '*'
            }
        }
    }

    private create() {
        this.axiosClient = Axios.create(this.config);
    }
}