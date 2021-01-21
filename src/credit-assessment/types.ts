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

interface ICustomer {
    socialId: string;
    email: string;
    phone: string;
    signerIp?: string;
}

interface ILoan {
    financialProductId: string;
    price: number;
    downPayment: number;
    credit: number;
    interestRate: number;
    monthlyCost: number;
    term?: string;
}

interface IHouseholdEconomy {
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
    customer: ICustomer;
    loan: ILoan;
    householdEconomy: IHouseholdEconomy;
}

export interface ICreditAssessmentCase {
    caseId: string;
}
