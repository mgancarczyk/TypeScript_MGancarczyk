import {Field, FieldType} from './fields';

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
    setValue(value): void {
        this.element.value = value
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
    setValue(value): void {
        this.element.value = value
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
    setValue(checked): void {
        this.element.checked = checked
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
    setValue(value): void {
        this.element.value = value
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
    setValue(value): void {
        this.element.value = value
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
    setValue(value): void {
        this.element.value = value
    }
}

export {CheckboxField, RadioField, EmailField, DateField, TextAreaField, InputField};