var FieldType;
(function (FieldType) {
    FieldType["textInput"] = "text";
    FieldType["dateInput"] = "date";
    FieldType["emailInput"] = "email";
    FieldType["radioInput"] = "radio";
    FieldType["checkboxInput"] = "checkbox";
    FieldType["textAreaInput"] = "textarea";
    FieldType["submitInput"] = "submit";
})(FieldType || (FieldType = {}));
var App = /** @class */ (function () {
    function App() {
        this.form = new Form('formtest');
    }
    App.prototype.createPresetForm = function () {
        var imie = new InputField('text', 'imie');
        var nazwisko = new InputField('text', 'nazwisko');
        // let radio = new RadioField('radiofield','radio');
        var eLearning = new CheckboxField('elearn', 'e-learning?');
        // let date = new DateField('datedield','date');
        var uwagi = new TextAreaField('area', 'uwagi');
        var email = new EmailField('email', 'email');
        this.form.button = new SubmitButton('submitButton', 'submit');
        this.form.fields.push(imie);
        this.form.fields.push(nazwisko);
        // this.form.fields.push(radio);
        this.form.fields.push(eLearning);
        // this.form.fields.push(date);
        this.form.fields.push(uwagi);
        this.form.fields.push(email);
        this.form.render();
    };
    return App;
}());
var InputField = /** @class */ (function () {
    function InputField(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.textInput;
    }
    InputField.prototype.render = function () {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    };
    InputField.prototype.getValue = function () {
        return this.element.value;
    };
    return InputField;
}());
var RadioField = /** @class */ (function () {
    function RadioField(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.radioInput;
    }
    RadioField.prototype.render = function () {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    };
    RadioField.prototype.getValue = function () {
        return this.element.value;
    };
    return RadioField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.checkboxInput;
    }
    CheckboxField.prototype.render = function () {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    };
    CheckboxField.prototype.getValue = function () {
        return this.element.checked;
    };
    return CheckboxField;
}());
var DateField = /** @class */ (function () {
    function DateField(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.dateInput;
    }
    DateField.prototype.render = function () {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    };
    DateField.prototype.getValue = function () {
        return this.element.value;
    };
    return DateField;
}());
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.textAreaInput;
    }
    TextAreaField.prototype.render = function () {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    };
    TextAreaField.prototype.getValue = function () {
        return this.element.value;
    };
    return TextAreaField;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.emailInput;
    }
    EmailField.prototype.render = function () {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;
        div.appendChild(label);
        div.appendChild(this.element);
        return div;
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    return EmailField;
}());
var SubmitButton = /** @class */ (function () {
    function SubmitButton(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.element.name = this.name;
        this.element.type = FieldType.submitInput;
    }
    SubmitButton.prototype.render = function () {
        var div = document.createElement('div');
        div.appendChild(this.element);
        return div;
    };
    return SubmitButton;
}());
var Form = /** @class */ (function () {
    function Form(id) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
    }
    Form.prototype.render = function () {
        var _this = this;
        this.fields.forEach(function (field) { return _this.formElement.appendChild(field.render()); });
        this.formElement.appendChild(this.button.render());
        this.formElement.addEventListener('submit', function (event) {
            event.preventDefault();
            alert(_this.getValue());
        });
    };
    Form.prototype.getValue = function () {
        var value = '';
        this.fields.forEach(function (field) {
            value += field.label + ": " + field.getValue() + "\n";
        });
        return value;
    };
    return Form;
}());
new App().createPresetForm();
