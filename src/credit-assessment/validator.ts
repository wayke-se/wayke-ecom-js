import {
    ICreditAssessmentCustomer,
    ICreditAssessmentInquiry,
    ICreditAssessmentLoan,
    ICreditAssessmentHouseholdEconomy,
} from "./types";

export const validateHouseholdEconomy = (
    householdEconomy: ICreditAssessmentHouseholdEconomy
) => {
    if (!householdEconomy) {
        throw new TypeError("Household economy can not be falsy");
    }
};

export const validateLoan = (loan: ICreditAssessmentLoan) => {
    if (!loan) {
        throw new TypeError("Loan can not be falsy");
    }
};

export const validateCustomer = (customer: ICreditAssessmentCustomer) => {
    if (!customer) {
        throw new TypeError("Customer can not be falsy");
    }
};

export const validateInquiry = (inquiry: ICreditAssessmentInquiry) => {
    if (!inquiry) {
        throw new TypeError("Inquiry can not be falsy");
    }

    validateHouseholdEconomy(inquiry.householdEconomy);
    validateLoan(inquiry.loan);
    validateCustomer(inquiry.customer);
};
