import axios, { AxiosInstance } from "axios";

export type KeyValue = Record<string, string>;
export interface IDisredClient {

    /** Connection URL to the DiSred Database.
     * Connection URL must contain your database name.
     * 
     * @example "http://localhost:9090?dbname=your_database_name"
     */
    readonly connectionURL: string;

    /** To get all of your data based on your database name.
     * 
     * @returns KeyValue
     */
    get_all(): Promise<KeyValue>;

    /** To get one specific data based on the key.
     * 
     * @returns string | null
     */
    get(key: string): Promise<string | null>;

    /** To get all the keys. */
    keys(): Promise<Array<string>>;

    /** To insert or update a data. */
    set(key: string, value: string): Promise<"OK">;

    /** To delete one specific data. */
    del(key: string): Promise<"OK">;

    /** To flush your database */
    flush(): Promise<"OK">;
}

export class DisredClient implements IDisredClient {

    constructor(public readonly connectionURL: string) { }

    /** Get Axios instance */
    private getAxios(): AxiosInstance {
        return axios.create({
            baseURL: `${this.connectionURL}`,
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: () => true
        });
    }

    async get_all(): Promise<KeyValue> {
        const { data } = await this.getAxios().get("/");
        if (data.error) throw new Error(data.error);
        return data.data
    }

    async get(key: string): Promise<string | null> {
        const { data } = await this.getAxios().post(`/one`, { key });
        if (data.error) throw new Error(data.error);
        return data.data
    }

    async keys(): Promise<string[]> {
        const { data } = await this.getAxios().get("/keys");
        if (data.error) throw new Error(data.error);
        return data.data
    }

    async set(key: string, value: string): Promise<"OK"> {
        const { data } = await this.getAxios().post(`/`, { key, value });
        if (data.error) throw new Error(data.error);
        return data.data
    }

    async del(key: string): Promise<"OK"> {
        const { data } = await this.getAxios().delete(`/${key}`);
        if (data.error) throw new Error(data.error);
        return data.data;
    }

    async flush(): Promise<"OK"> {
        const { data } = await this.getAxios().delete("/flush");
        if (data.error) throw new Error(data.error);
        return data.data
    }

}