"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_jsonschema_form_1 = require("react-jsonschema-form");
var utils_1 = require("./utils");
exports.getTheme = function (theme) { return ({
    templates: theme && theme.templates ? theme.templates : {},
    fields: theme && theme.fields ? theme.fields : {},
    widgets: theme && theme.widgets ? theme.widgets : {},
    renderers: {
        buttons: theme && theme.renderers && theme.renderers.buttons ? theme.renderers.buttons : exports.buttonsRenderer,
        cancelButton: theme && theme.renderers && theme.renderers.cancelButton ?
            theme.renderers.cancelButton : exports.cancelButtonRenderer,
        saveButton: theme && theme.renderers && theme.renderers.saveButton ?
            theme.renderers.saveButton : exports.saveButtonRenderer,
        header: theme && theme.renderers && theme.renderers.header ? theme.renderers.header : exports.titleRenderer,
    }
}); };
exports.titleRenderer = function (_a) {
    var title = _a.title;
    return (React.createElement("h2", null, title));
};
exports.saveButtonRenderer = function (props) { return (React.createElement("button", { disabled: !!props.hasError || !props.isDirty, onClick: props.save }, props.isSaved ?
    'Saved' :
    'Save')); };
exports.cancelButtonRenderer = function (props) { return (React.createElement("button", { type: "button", onClick: props.cancel }, "Close")); };
exports.buttonsRenderer = function (props) { return (React.createElement("div", null,
    props.cancelButtonRenderer({ cancel: props.cancel }),
    props.saveButtonRenderer({
        save: props.save,
        isSaved: props.isSaved,
        isDirty: props.isDirty,
        hasError: props.hasError
    }))); };
var FormRenderer = (function (_super) {
    tslib_1.__extends(FormRenderer, _super);
    function FormRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormRenderer.prototype.render = function () {
        var props = this.props;
        var formContext = {
            subTitle: props.subTitle,
            isDirty: props.isDirty,
            showErrorsInline: utils_1.isTruthyWithDefault(props.ui ? props.ui.showErrorsInline : true, true),
            formPrefix: props.config.name ?
                props.config.name :
                utils_1.isMutationConfig(props.config) ?
                    props.config.mutation.name :
                    props.config.name
        };
        return (React.createElement(react_jsonschema_form_1.default, tslib_1.__assign({ liveValidate: utils_1.isTruthyWithDefault(props.liveValidate, false), schema: props.schema, uiSchema: props.ui || {}, widgets: props.theme.widgets, formContext: formContext, fields: props.theme.fields, formData: props.data, onSubmit: props.save, onChange: props.onChange, ArrayFieldTemplate: props.theme.templates.ArrayFieldTemplate, FieldTemplate: props.theme.templates.FieldTemplate, ObjectFieldTemplate: props.theme.templates.ObjectFieldTemplate, showErrorList: utils_1.isTruthyWithDefault(props.ui ? props.ui.showErrorsList : false, false) }, { ErrorList: props.ui ? props.ui.errorListComponent : undefined }, { transformErrors: props.transformErrors ?
                props.transformErrors(formContext.formPrefix) :
                undefined }), this.props.children));
    };
    return FormRenderer;
}(React.Component));
exports.FormRenderer = FormRenderer;
//# sourceMappingURL=renderers.js.map