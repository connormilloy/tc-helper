declare type ErrorType = 'network-error' | 'response-error' | 'server-error' | 'api-error';
export declare class RequestError extends Error {
    type: ErrorType;
    title: string;
    original?: Error;
    constructor(type: ErrorType, title: string, message: string, original?: Error);
    toJSON(): {
        name: string;
        type: ErrorType;
        title: string;
        message: string;
        stack: string | undefined;
        original: {
            name: string;
            message: string;
            stack?: string | undefined;
        } | undefined;
    };
}
export declare const TornAPIErrors: Map<number, {
    title: string;
    message: string;
}>;
export {};
