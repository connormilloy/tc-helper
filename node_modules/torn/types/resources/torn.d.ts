import { unimplemented, incomplete } from '../helpers';
export declare type TornResource = {
    items: Items;
    medals: Medals;
    honors: Honors;
    organisedcrimes: OrganisedCrimes;
    gyms: Gyms;
    companies: Companies;
    properties: Properties;
    education: Education;
    stats: Stats;
    stocks: Stocks;
    factiontree: FactionTree;
    territory: Territory;
    rackets: Rackets;
    bank: Bank;
    timestamp: Timestamp;
};
export declare type Items = {
    [id: number]: {
        name: string;
        description: string;
        effect: string | '';
        requirement: string | '';
        type: incomplete<string>;
        weapon_type: incomplete<string | null>;
        buy_price: number;
        sell_price: number;
        market_value: number;
        circulation: number;
        image: string;
    };
};
export declare type Medals = {
    [id: number]: {
        name: string;
        description: string;
        type: incomplete<string>;
        circulation: number;
        rarity: incomplete<string>;
    };
};
export declare type Honors = {
    [id: number]: {
        name: string;
        description: string;
        type: incomplete<number>;
        circulation: number;
        rarity: incomplete<string>;
    };
};
export declare type OrganisedCrimes = {
    [id: number]: {
        name: string;
        members: number;
        time: number;
        min_cash: number;
        max_cash: number;
        min_respect: number;
        max_respect: number;
    };
};
export declare type Gyms = {
    [id: number]: {
        name: string;
        stage: number;
        cost: number;
        energy: number;
        strength: number;
        speed: number;
        defense: number;
        dexterity: number;
        note: string | '';
    };
};
export declare type Companies = unimplemented;
export declare type Properties = unimplemented;
export declare type Education = unimplemented;
export declare type Stats = unimplemented;
export declare type Stocks = unimplemented;
export declare type FactionTree = unimplemented;
export declare type Territory = unimplemented;
export declare type Rackets = unimplemented;
export declare type Bank = unimplemented;
export declare type Timestamp = {
    timestamp: number;
};
