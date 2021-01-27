import { Resource, Selections, Data, DefaultSelection } from './resources';
export declare const API_URL = "https://api.torn.com";
declare type RequestOptions<T extends Resource, U extends Selections<T>> = {
    key: string;
    resource: T;
    selections?: U[];
    ids?: string[] | number[];
    from?: number;
    to?: number;
    fetch?: typeof self.fetch;
};
export declare function request<T extends Resource, U extends Selections<T> = DefaultSelection<T>>(options: RequestOptions<T, U>): Promise<Data<T, U>>;
declare type ClientOptions<T extends Resource, U extends Selections<T>> = Omit<RequestOptions<T, U>, 'key' | 'fetch'>;
export declare class Client {
    key: string;
    fetch_impl: typeof self.fetch;
    constructor(key: string, fetch?: typeof self.fetch);
    request<T extends Resource, U extends Selections<T> = DefaultSelection<T>>(options: ClientOptions<T, U>): Promise<Data<T, U>>;
}
export {};
