import { IOrderCreateResponse, IOrderCreateResponseData } from "./types";

export class OrderCreateResponse implements IOrderCreateResponse {
    private response: IOrderCreateResponseData;

    public constructor(response: IOrderCreateResponseData) {
        if (!response) {
            throw new Error("Missing order create response data");
        }

        this.response = response;
    }

    public getId(): string {
        return this.response.id;
    }
}
