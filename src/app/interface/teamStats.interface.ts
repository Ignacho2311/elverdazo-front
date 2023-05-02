export interface TeamStats {
    data:         Data;
    subscription: Subscription[];
    rate_limit:   RateLimit;
    timezone:     string;
}

export interface Data {
    id:             number;
    sport_id:       number;
    country_id:     number;
    venue_id:       number;
    gender:         string;
    name:           string;
    short_code:     null;
    image_path:     string;
    founded:        number;
    type:           string;
    placeholder:    boolean;
    last_played_at: Date;
    statistics:     Statistic[];
}

export interface Statistic {
    id:         number;
    team_id:    number;
    season_id:  number;
    has_values: boolean;
    details:    Detail[];
}

export interface Detail {
    id:                number;
    team_statistic_id: number;
    type_id:           number;
    value:             Value;
    type:              Type;
}

export interface Type {
    id:             number;
    name:           string;
    code:           string;
    developer_name: string;
    model_type:     ModelType;
    stat_group:     null | string;
}

export enum ModelType {
    Statistic = "statistic",
}

export interface Value {
    "0-15"?:      The015;
    "15-30"?:     The015;
    "30-45"?:     The015;
    "45-60"?:     The015;
    "60-75"?:     The015;
    "75-90"?:     The015;
    all?:         All;
    home?:        All;
    away?:        All;
    count?:       number;
    average?:     number;
    player_id?:   number | null;
    player_name?: null | string;
}

export interface The015 {
    count:      number;
    percentage: number;
}

export interface All {
    count:               number;
    average?:            number;
    first?:              number;
    percentage?:         number;
    overall_percentage?: number;
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
