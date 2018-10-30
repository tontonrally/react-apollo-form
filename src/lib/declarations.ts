import { JSONSchema6 } from "json-schema";

// declare module "*.json" {
//     const value: {};
//     export = value;
// }

declare module "react-jsonschema-form/lib/utils" {
    export function retrieveSchema(schema: JSONSchema6, declarations?: any, formData?: any): any;
}