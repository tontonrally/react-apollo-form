"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("@storybook/react");
var graphql_1 = require("graphql");
var graphql_2_json_schema_1 = require("graphql-2-json-schema");
var graphql_tag_1 = require("graphql-tag");
var React = require("react");
var react_apollo_1 = require("react-apollo");
var graphql_mock_1 = require("../graphql-mock");
var component_1 = require("../lib/forms/component");
var _a = require("semantic-ui-react"), Button = _a.Button, Input = _a.Input, Checkbox = _a.Checkbox, Header = _a.Header, Form = _a.Form, Message = _a.Message;
var _b = require("@storybook/addon-knobs/react"), withKnobs = _b.withKnobs, select = _b.select, bool = _b.boolean;
var introspection = graphql_1.graphqlSync(graphql_mock_1.schema, graphql_1.introspectionQuery).data;
var jsonSchema = graphql_2_json_schema_1.fromIntrospectionQuery(introspection);
var document = graphql_tag_1.default(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    mutation createTodo($todo: TodoInputType!) {\n        create_todo(todo: $todo) {\n            id\n        }\n    }\n"], ["\n    mutation createTodo($todo: TodoInputType!) {\n        create_todo(todo: $todo) {\n            id\n        }\n    }\n"])));
var ErrorList = function (p) { return (React.createElement(Message, { error: true, visible: true, header: "There was some errors", list: p.errors.map(function (e) { return e.message; }) })); };
var transformErrors = function (prefix) { return function (errors) {
    return errors.map(function (error) { return (tslib_1.__assign({}, error, { message: "FormError." + prefix + error.property + "." + error.name })); });
}; };
var theme = {
    templates: {
        FieldTemplate: function (props) {
            var description = props.description, children = props.children, label = props.label;
            return (React.createElement(Form.Field, null,
                React.createElement("label", null,
                    label,
                    props.required && "*"),
                children,
                React.createElement("span", null, description)));
        },
        ObjectFieldTemplate: function (props) {
            return (React.createElement("div", null, props.properties.map(function (p) { return p.content; })));
        }
    },
    fields: {
        StringField: function (p) { return (React.createElement(Input, { value: p.formData, onChange: function (e) { return p.onChange(e.currentTarget.value); } })); },
        BooleanField: function (p) { return (React.createElement(Checkbox, { label: p.title, checked: p.formData, onChange: function (e, data) {
                p.onChange(data.checked);
            } })); }
    },
    renderers: {
        saveButton: function (p) { return (React.createElement(Button, { onClick: p.save, primary: true }, "Save")); },
        cancelButton: function (p) { return (React.createElement(Button, { onClick: p.cancel }, "Cancel")); },
        header: function (p) { return (React.createElement(Header, { as: "h1" }, p.title)); }
    }
};
react_1.storiesOf("ApolloForm", module)
    .addDecorator(withKnobs)
    .add("default forms", function () {
    return (React.createElement(react_apollo_1.ApolloConsumer, null, function (client) {
        var withTheme = bool("withTheme", true);
        var liveValidate = bool("liveValidate", false);
        var showErrorsList = bool("showErrorsList", true);
        var ApplicationForm = component_1.configure({
            client: client,
            jsonSchema: jsonSchema,
            theme: withTheme ? theme : undefined
        });
        var mutationName = select("Mutation', mutations, 'create_todo");
        return (React.createElement(ApplicationForm, { title: "Todo Form", liveValidate: liveValidate, config: {
                mutation: {
                    name: mutationName,
                    document: document
                }
            }, data: {}, ui: {
                showErrorsList: showErrorsList,
                errorListComponent: ErrorList,
                todo: {
                    name: {
                        "ui:label": "Task name"
                    },
                    completed: {
                        "ui:label": "is task completed?"
                    }
                }
            }, transformErrors: transformErrors }, function (form) { return (React.createElement(Form, null,
            React.createElement("div", { style: { padding: "20px" } },
                form.header(),
                form.form(),
                form.buttons(),
                JSON.stringify(form.data)))); }));
    }));
}).add("with conditionals", function () {
    return (React.createElement(react_apollo_1.ApolloConsumer, null, function (client) {
        var withTheme = bool("withTheme", true);
        var liveValidate = bool("liveValidate", false);
        var showErrorsList = bool("showErrorsList", true);
        var ApplicationForm = component_1.configure({
            client: client,
            jsonSchema: jsonSchema,
            theme: withTheme ? theme : undefined
        });
        return (React.createElement(ApplicationForm, { title: "Todo Form", liveValidate: liveValidate, config: {
                name: "todo",
                schema: {
                    type: "object",
                    properties: {
                        shipping: {
                            type: "object",
                            properties: {
                                billingSameAsDelivery: { type: "boolean" },
                                billing: {
                                    type: "object",
                                    properties: {
                                        address: { type: "string" }
                                    }
                                }
                            }
                        }
                    }
                },
                saveData: function (data) {
                    console.log("save !", data);
                }
            }, data: {}, ui: {
                showErrorsList: showErrorsList,
                errorListComponent: ErrorList,
                shipping: {
                    billing: {
                        "ui:if": {
                            "shipping.billingSameAsDelivery": true
                        },
                    }
                }
            }, transformErrors: transformErrors }, function (form) { return (React.createElement(Form, null,
            React.createElement("div", { style: { padding: "20px" } },
                form.header(),
                form.form(),
                form.buttons(),
                JSON.stringify(form.data)))); }));
    }));
});
var templateObject_1;
//# sourceMappingURL=index.js.map