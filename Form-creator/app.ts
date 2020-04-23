enum FieldType {
    textInput = 'text',
    dateInput = 'date',
    emailInput = 'email',
    radioInput = 'radio',
    checkboxInput = 'checkbox',
    textAreaInput = 'textarea',
    submitInput = 'submit'
}
interface Field {
    name: string;
    label: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
}
class App{
    form: any;
    constructor(){
        this.form = new Form('formtest');
    }
    createPresetForm(): void{
        let imie = new InputField('text','imie');
        let nazwisko = new InputField('text','nazwisko');
        // let radio = new RadioField('radiofield','radio');
        let eLearning = new CheckboxField('elearn','e-learning?');
        // let date = new DateField('datedield','date');
        let uwagi = new TextAreaField('area','uwagi');
        let email = new EmailField('email','email');

        this.form.button = new SubmitButton('submitButton', 'submit')
        this.form.fields.push(imie);
        this.form.fields.push(nazwisko);
        // this.form.fields.push(radio);
        this.form.fields.push(eLearning);
        // this.form.fields.push(date);
        this.form.fields.push(uwagi);
        this.form.fields.push(email);
        this.form.render();
    }
    
}
class InputField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.textInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.value
    }
}
class RadioField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.radioInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.value
    }
}
class CheckboxField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.checkboxInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.checked
    }
}
class DateField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.dateInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.value
    }
}
class TextAreaField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.textAreaInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.value
    }
}
class EmailField implements Field {
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.type = FieldType.emailInput;
    }
    render(): HTMLElement {
        const div = document.createElement('div');
        const label = <HTMLLabelElement> document.createElement('label');
        label.htmlFor = this.element.id;
        label.innerText = this.label;

        div.appendChild(label);
        div.appendChild(this.element);

        return div;
    }
    getValue(): any {
        return this.element.value
    }
}

class SubmitButton {
    name: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(name: string, label: string) {
        this.element =
    <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.element.name = this.name;
        this.element.type = FieldType.submitInput;
    }

    render(): HTMLElement {
        const div = document.createElement('div');
        div.appendChild(this.element);

        return div;
    }
}

class Form {
    fields: Field[];
    formElement: HTMLFormElement;
    button: SubmitButton;

    constructor(id: string) {
        this.fields = new Array();
        this.formElement = <HTMLFormElement>document.getElementById(id);
    }

    render(): void {
        this.fields.forEach(field => this.formElement.appendChild(field.render()))
        this.formElement.appendChild(this.button.render());
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            alert(this.getValue())
        });
    }

    getValue(): string {
        let value = '';
        this.fields.forEach(field => {
            value += `${field.label}: ${field.getValue()}\n`
        })
        return value;
    }
}
   

new App().createPresetForm();