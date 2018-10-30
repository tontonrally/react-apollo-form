"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var renderers_1 = require("./renderers");
var renderers_2 = require("./renderers");
var utils_1 = require("./utils");
function configure(opts) {
    var _a;
    var jsonSchema = opts.jsonSchema;
    var theme = renderers_1.getTheme(opts.theme);
    return _a = (function (_super) {
            tslib_1.__extends(ApolloForm, _super);
            function ApolloForm() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.submitBtn = null;
                _this.state = {
                    isDirty: false,
                    isSaved: false,
                    hasError: false,
                    schema: {},
                    schemaWithConditionals: {},
                    data: {}
                };
                _this.save = function (_a) {
                    var formData = _a.formData;
                    var _b = _this.props, config = _b.config, onSave = _b.onSave;
                    if (utils_1.isMutationConfig(config)) {
                        var _c = config.mutation, document_1 = _c.document, variables = _c.variables, context = _c.context, refetchQueries = _c.refetchQueries;
                        var data = utils_1.cleanData(formData, _this.state.schema.properties || {});
                        opts.client.mutate({
                            mutation: document_1,
                            refetchQueries: refetchQueries,
                            variables: tslib_1.__assign({}, data, (variables || {})),
                            context: context
                        }).then(function (fetchResult) {
                            _this.setState(function () { return ({ isDirty: false, isSaved: true, hasError: false }); });
                            if (onSave) {
                                onSave(fetchResult);
                            }
                        });
                    }
                    else {
                        config.saveData(formData);
                    }
                };
                _this.cancel = function () {
                    var props = _this.props;
                    if (props.onCancel) {
                        props.onCancel();
                    }
                };
                _this.onChange = function (data) {
                    console.log("on change");
                    console.log(data);
                    var newSchema = utils_1.applyConditionsToSchema(_this.state.schema, _this.props.ui ? _this.props.ui : {}, data.formData);
                    _this.setState(function () { return ({
                        isDirty: true,
                        data: utils_1.cleanData(data.formData, newSchema.properties ? newSchema.properties : {}),
                        schemaWithConditionals: newSchema,
                        hasError: data.errors.length > 0,
                        isSaved: false
                    }); }, function () {
                        if (_this.props.onChange) {
                            _this.props.onChange(_this.state.data);
                        }
                    });
                };
                _this.simulateSubmit = function () {
                    if (_this.submitBtn) {
                        _this.submitBtn.click();
                    }
                };
                _this.childrenProps = function () { return ({
                    header: function () { return theme.renderers.header({
                        title: _this.props.title || "Form", uiSchema: _this.props.ui,
                    }); },
                    form: _this.renderForm,
                    buttons: function () { return theme.renderers.buttons({
                        cancelButtonRenderer: theme.renderers.cancelButton,
                        saveButtonRenderer: theme.renderers.saveButton,
                        cancel: _this.cancel,
                        save: _this.simulateSubmit,
                        hasError: _this.state.hasError,
                        isSaved: _this.state.isSaved,
                        isDirty: _this.state.isDirty,
                    }); },
                    saveButton: function () { return theme.renderers.saveButton({
                        save: _this.simulateSubmit,
                        hasError: _this.state.hasError,
                        isDirty: _this.state.isDirty,
                        isSaved: _this.state.isSaved,
                    }); },
                    cancelButton: function () { return theme.renderers.cancelButton({
                        cancel: _this.cancel,
                    }); },
                    cancel: _this.cancel,
                    save: _this.simulateSubmit,
                    data: _this.state.data,
                    isDirty: _this.state.isDirty,
                    isSaved: _this.state.isSaved,
                    hasError: _this.state.hasError
                }); };
                _this.renderLayout = function () {
                    var _a = _this.childrenProps(), buttons = _a.buttons, header = _a.header, form = _a.form;
                    return (React.createElement(React.Fragment, null,
                        header(),
                        form(),
                        buttons()));
                };
                _this.renderForm = function () {
                    return (React.createElement(renderers_2.FormRenderer, { className: _this.props.className, theme: theme, onChange: _this.onChange, save: _this.save, transformErrors: _this.props.transformErrors ?
                            _this.props.transformErrors :
                            undefined, config: _this.props.config, ui: _this.props.ui, liveValidate: _this.props.liveValidate, validate: _this.props.validate, schema: _this.state.schemaWithConditionals, data: _this.state.data, subTitle: _this.props.subTitle, isDirty: _this.state.isDirty },
                        React.createElement("input", { type: "submit", style: { display: "none" }, ref: function (el) { return _this.submitBtn = el; } })));
                };
                return _this;
            }
            ApolloForm.prototype.componentDidMount = function () {
                var _this = this;
                var schema = utils_1.getSchemaFromConfig(jsonSchema, this.props.config, this.props.title);
                this.setState(function () { return ({
                    schema: schema,
                    data: _this.props.data,
                    schemaWithConditionals: utils_1.applyConditionsToSchema(schema, _this.props.ui ? _this.props.ui : {}, _this.state.data)
                }); });
            };
            ApolloForm.prototype.componentDidUpdate = function (prevProps) {
                var _this = this;
                var config = this.props.config;
                var prevConfig = prevProps.config;
                if (config && utils_1.isMutationConfig(config) && !!config.mutation) {
                    if (utils_1.isMutationConfig(prevConfig) && !!prevConfig.mutation) {
                        var currentMutationName = config.mutation.name;
                        var previousMutationName = prevConfig.mutation.name;
                        if (currentMutationName !== previousMutationName) {
                            this.setState({
                                schema: utils_1.getSchemaFromConfig(jsonSchema, config, this.props.title)
                            }, function () { return _this.setState({
                                schemaWithConditionals: utils_1.applyConditionsToSchema(_this.state.schema, _this.props.ui ? _this.props.ui : {}, _this.state.data)
                            }); });
                        }
                    }
                    else {
                        this.setState({
                            schema: utils_1.getSchemaFromConfig(jsonSchema, config, this.props.title)
                        }, function () { return _this.setState({
                            schemaWithConditionals: utils_1.applyConditionsToSchema(_this.state.schema, _this.props.ui ? _this.props.ui : {}, _this.state.data)
                        }); });
                    }
                }
            };
            ApolloForm.prototype.render = function () {
                var props = this.props;
                var children = props.children;
                return (children ?
                    children(this.childrenProps()) :
                    this.renderLayout());
            };
            return ApolloForm;
        }(React.Component)),
        _a.registerWidget = function (name, comp) {
            theme.widgets[name] = comp;
        },
        _a;
}
exports.configure = configure;
//# sourceMappingURL=component.js.map