import { unimplemented } from '../helpers';
export declare type CompanyResource = {
    profile: Profile;
    detailed: Detailed;
    stock: Stock;
    employees: Employees;
    news: News;
    newsfull: NewsFull;
    timestamp: Timestamp;
};
export declare type Profile = unimplemented;
export declare type Detailed = unimplemented;
export declare type Stock = unimplemented;
export declare type Employees = unimplemented;
export declare type News = unimplemented;
export declare type NewsFull = unimplemented;
export declare type Timestamp = {
    timestamp: number;
};
