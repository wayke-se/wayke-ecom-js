import { AuthMethod } from "../bankid/types";

export enum MaritalStatus {
    Married = "married",
    Single = "single",
}

export enum Employment {
    Other = "other",
    Retired = "retired",
    FullTimeEmployed = "fullTimeEmployed",
    Student = "student",
    TemporarilyEmployed = "temporarilyEmployed",
    SelfEmployed = "selfEmployed",
}

export interface ICreditAssessmentCustomer {
    socialId: string;
    email: string;
    phone: string;
    signerIp?: string;
}

export interface ICreditAssessmentLoan {
    financialProductId: string;
    price: number;
    downPayment: number;
    credit: number;
    interestRate: number;
    monthlyCost: number;
    term?: string;
}

export interface ICreditAssessmentHouseholdEconomy {
    maritalStatus: MaritalStatus;
    income: number;
    employment: Employment;
    householdChildren: number;
    householdIncome: number;
    householdHousingCost: number;
    householdDebt: number;
}

export interface ICreditAssessmentInquiry {
    externalId: string;
    customer: ICreditAssessmentCustomer;
    loan: ICreditAssessmentLoan;
    householdEconomy: ICreditAssessmentHouseholdEconomy;
}

export interface ICreditAssessmentCase {
    caseId: string;
}

export interface ICreditAssessmentStatus {
    status: string;
    bankIdHintCode?: string;
    vfsScoreCaseId?: string;
    recommendation?: string;
    decision?: string;
}

export interface ICreditAssessmentSignRequest {
    caseId: string;
    method: AuthMethod;
}

export interface ICreditAssessmentSignApiResponse {
    qrCodeAsBase64?: string;
    autoLaunchUrl?: string;
}

export interface ICreditAssessmentSignResponse {
    isQrCode: () => boolean;
    isSameDevice: () => boolean;
    getQrCode: () => string | undefined;
    getAutoLaunchUrl: () => string | undefined;
    getMethod: () => AuthMethod;
}
