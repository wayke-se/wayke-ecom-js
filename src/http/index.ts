import HttpRequestBuilder from "./http-request-builder";

export interface IApiResponse<T> {
    successful: boolean;
    response: T;
    requestForgeryToken: string | undefined;
}

const httpStatusCheck = (
    response: Response,
    request: RequestInit
): Response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    /* eslint-disable */
    if (process.env.NODE_ENV === "development") {
        console.group(`Asynchronous request failed!`);
        console.log(`URL was ${response.url}`);
        console.log(`Status code: ${response.status}`);
        console.log(`Request:`, request);
        console.groupEnd();
    }
    /* eslint-enable */
    throw new Error(String(response.status));
};

export interface IHttpStateContext {
    requestForgeryToken: string | undefined;
}

const httpStateContext: IHttpStateContext = {
    requestForgeryToken: undefined,
};

export const context = () => ({ ...httpStateContext });

export const contextualize = (response: IApiResponse<any>) => {
    httpStateContext.requestForgeryToken =
        response.requestForgeryToken || httpStateContext.requestForgeryToken;
    return response;
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

export const captureStateContext = <T>(
    promise: Promise<IApiResponse<T>>
): Promise<IApiResponse<T>> => promise.then(contextualize);

export const builder = (): HttpRequestBuilder => new HttpRequestBuilder();
