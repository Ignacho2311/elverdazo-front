export interface TeamsBySeason {
    data:         Datum[];
    subscription: Subscription[];
    rate_limit:   RateLimit;
    timezone:     string;
}

export interface Datum {
    id:             number;
    sport_id:       number;
    country_id:     number;
    venue_id:       number;
    gender:         Gender;
    name:           string;
    short_code:     null | string;
    image_path:     string;
    founded:        number;
    type:           Type;
    placeholder:    boolean;
    last_played_at: Date;
}

export enum Gender {
    Male = "male",
}

export enum Type {
    Domestic = "domestic",
}

export interface RateLimit {
    resets_in_seconds: number;
    remaining:         number;
    requested_entity:  string;
}

export interface Subscription {
    meta:    any[];
    plans:   Plan[];
    add_ons: any[];
    widgets: any[];
}

export interface Plan {
    plan:     string;
    sport:    string;
    category: string;
}