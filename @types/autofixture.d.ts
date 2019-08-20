type PropertyDefinitions = any[];

declare module "autofixture" {
    function create(id: string): any;
    function define(id: string, properties: PropertyDefinitions): void;
}
