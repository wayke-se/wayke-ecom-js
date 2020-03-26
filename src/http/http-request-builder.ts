type ValidHttpMethod = "get" | "post" | "put" | "delete" | "patch";

class HttpRequestBuilder {
    private _method: ValidHttpMethod = "get";
    private _headers: { [key: string]: string } = {};
    private _body: any = null;

    public accept(acceptHeader: string) {
        this._headers.Accept = acceptHeader;
        return this;
    }

    public method(method: ValidHttpMethod) {
        this._method = method;
        return this;
    }

    public authorization(token: string) {
        this._headers.Authorization = `Bearer ${token}`;
        return this;
    }

    public content(body: any, contentType: string | null = "application/json") {
        switch (contentType) {
            case "application/json":
                this._body = JSON.stringify(body);
                break;
            default:
                this._body = body;
                break;
        }

        if (contentType) this._headers["Content-Type"] = contentType;

        return this;
    }

    public build(): RequestInit {
        return {
            body: this._body,
            headers: this._headers,
            method: this._method,
        };
    }
}

export default HttpRequestBuilder;
