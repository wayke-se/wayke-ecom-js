import { AuthMethod } from "../bankid/types";
import {
    ICreditAssessmentSignApiResponse,
    ICreditAssessmentSignResponse,
} from "./types";

export class CreditAssessmentSignResponse
    implements ICreditAssessmentSignResponse {
    private qrCodeAsBase64: string | undefined;
    private autoLaunchUrl: string | undefined;
    private method: AuthMethod;

    public constructor(
        response: ICreditAssessmentSignApiResponse,
        method: AuthMethod
    ) {
        if (!response) {
            throw new Error("Response can not be falsy");
        }

        if (!method) {
            throw new Error("Method can not be falsy");
        }

        this.qrCodeAsBase64 = response.qrCodeAsBase64;
        this.autoLaunchUrl = response.autoLaunchUrl;
        this.method = method;
    }

    public getMethod() {
        return this.method;
    }

    public isQrCode() {
        return this.method === AuthMethod.QrCode;
    }

    public isSameDevice() {
        return this.method === AuthMethod.SameDevice;
    }

    public getQrCode() {
        if (!this.isQrCode()) {
            throw new Error("Not qr code response");
        }

        return this.qrCodeAsBase64;
    }

    public getAutoLaunchUrl() {
        if (!this.isSameDevice()) {
            throw new Error("Not same device response");
        }

        return this.autoLaunchUrl;
    }
}
