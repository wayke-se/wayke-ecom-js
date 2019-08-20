import HttpRequestBuilder from "./http-request-builder";

describe("HttpRequestBuilder", () => {
    it("adds the specified HTTP method to the RequestInit", () => {
        const method = "put";
        const builder = new HttpRequestBuilder();
        const options: any = builder.method(method).build();
        expect(options.method).toEqual(method);
    });
    it("adds the specified accept header to the RequestInit", () => {
        const header = "application/json";
        const builder = new HttpRequestBuilder();
        const options: any = builder.accept(header).build();
        expect(options.headers.Accept).toEqual(header);
    });
    it("adds an Authorization header to the RequestInit when a token is provided", () => {
        const token = "token";
        const builder = new HttpRequestBuilder();
        const options: any = builder.authorization(token).build();
        expect(options.headers.Authorization).toEqual(`Bearer ${token}`);
    });
    it("adds application/json as Content-Type header when a request body is provided", () => {
        const builder = new HttpRequestBuilder();
        const options: any = builder
            .method("put")
            .content({ prop: "value" })
            .build();
        const headers: any = options.headers;
        expect(headers["Content-Type"]).toEqual("application/json");
    });
    it("adds a custom Content-Type header when provided", () => {
        const header = "application/test-header-value";
        const builder = new HttpRequestBuilder();
        const options: any = builder
            .method("post")
            .content({ prop: "value" }, header)
            .build();
        const headers: any = options.headers;
        expect(headers["Content-Type"]).toEqual(header);
    });
    it("omits Content-Type header when forcing raw body", () => {
        const builder = new HttpRequestBuilder();
        const options: any = builder
            .method("post")
            .content("body", null)
            .build();
        const headers: any = options.headers;
        expect(headers["Content-Type"]).toBeUndefined();
    });
    it("doesn't add a request body, when a body object is omitted", () => {
        const builder = new HttpRequestBuilder();
        const options: any = builder.method("put").build();
        expect(options.body).toBeNull();
    });
    it("stringifies the request body, given a provided body object", () => {
        const builder = new HttpRequestBuilder();
        const options: any = builder
            .method("put")
            .content({ id: "1" })
            .build();
        expect(options.body).toEqual('{"id":"1"}');
    });
});
