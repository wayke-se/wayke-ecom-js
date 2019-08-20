import {
    IInsuranceAddon,
    IInsuranceBrand,
    IInsuranceConditions,
    IInsuranceItem,
    IInsuranceOption,
    IInsuranceOptionsResponse,
    IInsuranceOptionsResponseData,
    IInsuranceTerms,
} from "./types";

const brandTermsFromResponse = (
    response: IInsuranceOptionsResponseData
): IInsuranceTerms => ({
    url: response.branding.termsUrl,
});

const insuranceBrandFromResponse = (
    response: IInsuranceOptionsResponseData
): IInsuranceBrand => ({
    name: response.branding.name,
    description: response.branding.description,
    logotype: response.branding.logo.file.url,
    terms: brandTermsFromResponse(response),
    url: response.branding.website,
});

const insuranceConditionsFromResponse = (
    response: IInsuranceOptionsResponseData
): IInsuranceConditions => ({
    description: response.details.legalDescription,
    url: response.details.legalUrl,
});

const insuranceAddonsFromResponse = (
    response: IInsuranceOptionsResponseData
): IInsuranceAddon[] =>
    response.details.addOns.map(addon => ({
        title: addon.title,
        name: addon.name,
        description: addon.description,
        monthlyPrice: addon.monthlyPrice,
        excludes: addon.exclude,
    }));

const insuranceItemsFromResponse = (
    response: IInsuranceOptionsResponseData
): IInsuranceItem[] =>
    response.details.insuranceItems.map(item => ({
        name: item.name,
        description: item.description,
    }));

const insuranceOptionFromResponse = (
    response: IInsuranceOptionsResponseData
): IInsuranceOption => ({
    brand: insuranceBrandFromResponse(response),
    name: response.details.name,
    description: response.details.description,
    price: response.details.price,
    unit: response.details.unit,
    conditions: insuranceConditionsFromResponse(response),
    addons: insuranceAddonsFromResponse(response),
    items: insuranceItemsFromResponse(response),
});

export class InsuranceOptionsResponse implements IInsuranceOptionsResponse {
    private response: IInsuranceOptionsResponseData;

    public constructor(response: IInsuranceOptionsResponseData) {
        if (!response) {
            throw new Error("Missing insurance options response data");
        }

        this.response = response;
    }

    public getInsuranceOption(): IInsuranceOption {
        return insuranceOptionFromResponse(this.response);
    }
}
