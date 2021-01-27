import { Intersection } from '../helpers';
import { CompanyResource } from './company';
import { FactionResource } from './faction';
import { MarketResource } from './market';
import { PropertyResource } from './property';
import { TornResource } from './torn';
import { UserResource } from './user';
declare type ResourceMap = {
    company: CompanyResource;
    faction: FactionResource;
    market: MarketResource;
    property: PropertyResource;
    torn: TornResource;
    user: UserResource;
};
declare type DefaultMap = {
    company: 'profile';
    faction: 'basic';
    market: 'bazaar';
    property: 'property';
    torn: 'stats';
    user: 'profile';
};
export declare type Resource = keyof ResourceMap;
export declare type Selections<T extends Resource> = keyof ResourceMap[T];
export declare type DefaultSelection<T extends Resource> = Extract<keyof ResourceMap[T], DefaultMap[T]>;
export declare type Data<T extends Resource, U extends Selections<T>> = Intersection<ResourceMap[T][U]> & {
    local_time_start: number;
    local_time_end: number;
};
export {};
