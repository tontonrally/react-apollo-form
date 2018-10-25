#!/usr/bin/env node
"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var codegen = require("apollo-codegen");
var fs = require("fs");
var graphql_2_json_schema_1 = require("graphql-2-json-schema");
var path = require("path");
var yargs = require("yargs");
var utils_1 = require("./utils");
process.on("unhandledRejection", function (error) { throw error; });
process.on("uncaughtException", handleError);
function handleError(error) { console.error(error); process.exit(1); }
yargs
    .command("fetch-mutations <url> <outputPath>", "Generate typings, and JSON Schema from GraphQL endpoint", {
    outputPath: {
        alias: "o",
        demand: true,
        describe: "Output path for generated files",
        default: ".",
        normalize: true,
        coerce: path.resolve,
    },
    header: {
        alias: "H",
        describe: "Additional header to send to the server as part of the introspection query request",
        type: "array",
        coerce: function (arg) {
            var additionalHeaders = {};
            for (var _i = 0, arg_1 = arg; _i < arg_1.length; _i++) {
                var header = arg_1[_i];
                var separator = header.indexOf(":");
                var name_1 = header.substring(0, separator).trim();
                var value = header.substring(separator + 1).trim();
                if (!(name_1 && value)) {
                    throw new Error("Headers should be specified as \"Name: Value\"");
                }
                additionalHeaders[name_1] = value;
            }
            return additionalHeaders;
        }
    },
    insecure: {
        alias: "K",
        describe: "Allows \"insecure\" SSL connection to the server",
        type: "boolean"
    },
    method: {
        demand: false,
        describe: "The HTTP request method to use for the introspection query request",
        type: "string",
        default: "POST",
        choices: ["POST', 'GET', 'post', 'get"]
    }
}, function (argv) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var url, outputPath, header, insecure, method, mutationNames, jsonSchemaObj, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = argv.url, outputPath = argv.outputPath, header = argv.header, insecure = argv.insecure, method = argv.method;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log("[1/3] downloadSchema ...");
                return [4, codegen.downloadSchema(url, path.resolve(outputPath, "schema.json"), header, insecure, method)];
            case 2:
                _a.sent();
                console.log("[2/3] generate mutations enum type ...");
                mutationNames = utils_1.extractMutationsNamesFromFile(path.resolve(outputPath, "schema.json"));
                if (mutationNames) {
                    fs.writeFileSync(path.resolve(outputPath, "mutations.d.ts"), utils_1.generateMutationTypesDef(mutationNames));
                }
                else {
                    console.error("Failed to generate mutations typing");
                }
                console.log("[3/3] generate json schema file ...");
                jsonSchemaObj = graphql_2_json_schema_1.fromIntrospectionQuery(JSON.parse(fs.readFileSync(path.resolve(outputPath, "schema.json")).toString()).data);
                fs.writeFileSync(path.resolve(outputPath, "apollo-form-json-schema.json"), JSON.stringify(jsonSchemaObj));
                return [3, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3, 4];
            case 4:
                console.log("Done.");
                return [2];
        }
    });
}); })
    .fail(function (message, error) {
    handleError(message);
})
    .help()
    .version()
    .strict()
    .argv;
//# sourceMappingURL=cli.js.map