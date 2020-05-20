import {Field} from './fields';
import {SubmitButton} from './button';
import { Table } from './table';

class Form {
    fields: Field[];
    formElement: HTMLFormElement;
    button: SubmitButton;
    results: Table
    editinRowId: string

    constructor(id: string) {
        this.fields = new Array();
        this.formElement = <HTMLFormElement>document.getElementById(id);
        this.results = new Table("wyniki")
    }

    render(): void {
        this.fields.forEach(field => this.formElement.appendChild(field.render()))
        this.formElement.appendChild(this.button.render());
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!this.editinRowId) {
                this.results.add(this.getValue(), { setForm: this.setValue() })
            } else {
                this.results.edit(this.editinRowId, this.getValue())
            }
           
            this.clean()
        });
    }

    getValue(): object {
        let value: any = {};
        this.fields.forEach(field => {
            value[field.label] = field.getValue()
        })
        return value;
    }

    setValue() {
        const fields = this.fields
        const setEditingRowId = (rowId) => this.setEditingRowId(rowId)
        return (rowId: string, data: any) => {
            console.log(setEditingRowId, rowId)
            setEditingRowId(rowId)
            fields.forEach(field => {
                field.setValue(data[field.label])
            })
        }
    }

    edit(rowId) {
        this.results.edit(rowId, this.getValue())
        this.setEditingRowId("")
    }

    setEditingRowId(rowId) {
        this.editinRowId = rowId
    }

    clean() {
        this.fields.forEach(field => {
            field.setValue("")
        }) 
    }
}

export {Form};