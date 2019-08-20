export interface IInsuranceOptionsRequest {
    id: string;
    personalNumber: string;
    drivingDistance: DrivingDistance;
    includeFinance: boolean;
}

export interface IInsuranceOptionsResponse {
    getInsuranceOption(): IInsuranceOption;
}

export interface IInsuranceOptionsResponseData {
    branding: {
        id: string;
        createdAt: Date;
        description: string;
        documentId: string;
        identifier: string;
        institute: string;
        logo: {
            file: {
                url: string;
            };
        };
        name: string;
        termsUrl: string;
        updatedAt: Date;
        website: string;
    };
    details: {
        name: string;
        price: number;
        unit: string;
        includesFinancingInPrice: boolean;
        description: string;
        branding: string;
        legalUrl: string;
        legalDescription: string;
        addOns: Array<{
            title: string;
            name: string;
            description: string;
            monthlyPrice: number;
            exclude: string[];
        }>;
        insuranceItems: Array<{
            name: string;
            description: string;
        }>;
    };
}

export interface IInsuranceTerms {
    url: string;
}

export interface IInsuranceConditions {
    description: string;
    url: string;
}

export interface IInsuranceBrand {
    name: string;
    description: string;
    logotype: string;
    terms: IInsuranceTerms;
    url: string;
}

export interface IInsuranceAddon {
    title: string;
    name: string;
    description: string;
    monthlyPrice: number;
    excludes: string[];
}

export interface IInsuranceItem {
    name: string;
    description: string;
}

export interface IInsuranceOption {
    brand: IInsuranceBrand;
    name: string;
    description: string;
    price: number;
    unit: string;
    conditions: IInsuranceConditions;
    addons: IInsuranceAddon[];
    items: IInsuranceItem[];
}

export enum DrivingDistance {
    Between0And1000 = "Between0And1000",
    Between1000And1500 = "Between1000And1500",
    Between1500And2000 = "Between1500And2000",
    Between2000And2500 = "Between2000And2500",
    Over2500 = "Over2500",
}
