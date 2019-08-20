import HttpRequestBuilder from "./http-request-builder";

export interface IApiResponse<T> {
    successful: boolean;
    response: T;
}

const httpStatusCheck = (
    response: Response,
    request: RequestInit
): Response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    // tslint:disable
    if (process.env.NODE_ENV === "development") {
        console.group(`Asynchronous request failed!`);
        console.log(`URL was ${response.url}`);
        console.log(`Status code: ${response.status}`);
        console.log(`Request:`, request);
        console.groupEnd();
    }
    // tslint:enable
    throw new Error(String(response.status));
};

export const raw = (url: string, options: RequestInit): Promise<Response> =>
    fetch(url, options).then((response: Response) =>
        httpStatusCheck(response, options)
    );

const noContentCodes: string[] = ["202", "204"];
export const json = <T>(
    url: string,
    options: RequestInit
): Promise<IApiResponse<T>> =>
    raw(url, options).then((response: Response) => {
        if (noContentCodes.includes(String(response.status))) return null;

        return response.json();
    });

export const builder = (): HttpRequestBuilder => new HttpRequestBuilder();
