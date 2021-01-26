const fixtures = require("../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

import { ICreditAssessmentCustomer, ICreditAssessmentHouseholdEconomy, ICreditAssessmentInquiry, ICreditAssessmentLoan } from "./types";
import { validateCustomer, validateHouseholdEconomy, validateInquiry, validateLoan } from "./validator";

describe("Validate credit assessment inquiry", () => {
    describe("Given complete inquiry", () => {
        it("Should not throw", () => {
            const inquiry = fixture("ICreditAssessmentInquiry");
            expect(() => validateInquiry(inquiry)).not.toThrowError();
        });
    });

    describe("Given null inquiry", () => {
        it("Should throw", () => {
            expect(() => validateInquiry(null as any)).toThrowError();
        });
    });
});

describe("Validate customer for credit assessment", () => {
    describe("Given null customer", () => {
        it("Should throw", () => {
            expect(() => validateCustomer(null as any)).toThrowError();
        });
    });
});

describe("Validate loan for credit assessment", () => {
    describe("Given null loan", () => {
        it("Should throw", () => {
            expect(() => validateLoan(null as any)).toThrowError();
        });
    });
});


describe("Validate household economy for credit assessment", () => {
    describe("Given null household economy", () => {
        it("Should throw", () => {
            expect(() => validateHouseholdEconomy(null as any)).toThrowError();
        });
    });
});

