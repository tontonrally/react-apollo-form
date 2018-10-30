import { JSONSchema6 } from "json-schema";
declare module "react-jsonschema-form/lib/utils" {
    function retrieveSchema(schema: JSONSchema6, declarations?: any, formData?: any): any;
}
