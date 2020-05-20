import {Field, FieldType} from './fields';

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

export {SubmitButton};